import asyncio
from .const import DOMAIN, LOGGER
from .helpers import format_mqtt_message
from homeassistant.core import HomeAssistant, Context, callback
from homeassistant.helpers.script import Script
from homeassistant.components.mqtt.client import async_subscribe as mqtt_subscribe
from homeassistant.components.mqtt.models import ReceiveMessage
from homeassistant.exceptions import HomeAssistantError
import homeassistant.helpers.config_validation as cv

class Blueprint:
    
    def __init__(self, _id: str, config: dict, has_image: bool):
      """Initialize Blueprint."""
      self.id = str(_id)
      self.name = config.get('name')
      self.has_image = has_image
      self.service = config.get('service')
      self.event_type = config.get('event_type')
      self.mqtt_topic_format = config.get('mqtt_topic_format', None)
      self.identifier_key = config.get('identifier_key')
      self.buttons = config.get('buttons')
      self.conditions = config.get('conditions', [])

    def from_dict(cls, data):
        return cls(**data)

    def as_dict(self):
        return self.__dict__

    def asdict(self):
        return self.as_dict()

class ManagedSwitchConfigButtonAction:

    def __init__( self, hass: HomeAssistant, switch_id, button_index, index, blueprint_action, config ):
        """Initialize ManagedSwitchConfigButtonAction."""
        self._hass: HomeAssistant = hass
        
        self.switch_id = switch_id
        self.button_index = button_index
        self.index = index
        self.sequence = config.get('sequence')
        self.mode = config.get('mode')
        self.blueprint = blueprint_action
        self.script: Script = None
        self.active = bool(self.sequence)
        if self.active:
            self.script = Script(
                    hass=self._hass, 
                    sequence=cv.SCRIPT_SCHEMA(self.sequence),
                    name=f"{DOMAIN}_{switch_id}_{button_index}_{index}",
                    domain=DOMAIN,
                    logger=LOGGER,
                    script_mode=self.mode
                )

    def _check_conditions( self, data ) -> bool:
        if not self.active:
            return False

        for condition in self.blueprint.get('conditions', []):
            if condition.get('key') not in data or str(data.get(condition.get('key'))) != str(condition.get('value')):
                return False
        return True

    async def run( self, data, context ):
        if not self.script:
            LOGGER.debug(f'No sequence assigned for switch:{self.switch_id} button:{self.button_index} action:{self.index}')
            return
        
        LOGGER.debug(f"Running sequence for switch:{self.switch_id} button:{self.button_index} action:{self.index} ")
        self._hass.async_create_task( self.script.async_run( run_variables=data, context=context) )

    # home assistant json
    def as_dict(self):
        return {k: v for k, v in self.__dict__.items() if k in ['sequence', 'mode']}

    # attr dict
    def asdict(self):
        return self.as_dict()


class ManagedSwitchConfigButton:

    def __init__( self, hass: HomeAssistant, switch_id, index, blueprint_button, config ):
        """Initialize ManagedSwitchConfigButton."""
        self._hass: HomeAssistant = hass

        self.switch_id = switch_id
        self.index = index
        self.actions: list[ManagedSwitchConfigButtonAction] = []
        self.blueprint = blueprint_button
        self.active: bool = False
        for i in range(len(config.get('actions'))):
            action = ManagedSwitchConfigButtonAction( 
                        hass,
                        switch_id,
                        index,
                        i,
                        self.blueprint.get('actions')[i], 
                        config.get('actions')[i] 
                    )
            self.actions.append(action)
            if action.active:
                self.active = True

    def _check_conditions( self, data ):
        if not self.active:
            return False

        for condition in self.blueprint.get('conditions', []):
            if condition.get('key') not in data or str(data.get(condition.get('key'))) != str(condition.get('value')):
                return False

        return True

    # home assistant json
    def as_dict(self):
        return {k: v for k, v in self.__dict__.items() if k in ['actions']}

    # attr dict
    def asdict(self):
        return self.as_dict()

class ManagedSwitchConfig:

    # Allow the switch to be created so it can be deleted via gui
    # Otherwise there will be zombie stored data
    def __init__( self, hass: HomeAssistant, blueprint: Blueprint, _id, config ):
        """Initialize ManagedSwitch."""
        self._hass = hass
        self._event_listener = None
        self._error = None
        self.id = str( _id ) # Ensute id is a string for future proofing
        self.name = config.get('name')        
        self.identifier = config.get('identifier')
        self.blueprint: Blueprint
        self.valid_blueprint: bool
        self.buttons: list[ManagedSwitchConfigButton] = []
        self.enabled: bool = config.get('enabled', True)
        
        self.setBlueprint( blueprint, config.get('buttons') )
        self.buildButtons( config.get('buttons') )

    def update( self, config ):
        self.name = config.get('name')
        self.identifier = config.get('identifier')
        self.buttons = []
        
        self.buildButtons( config.get('buttons') )
        
    def setBlueprint( self, blueprint: Blueprint, buttons_config = None ):
        self.blueprint = blueprint
        self.valid_blueprint = type(blueprint) is Blueprint
        if not self.valid_blueprint:
            self._setError(f"Blueprint {self.blueprint} for {self.name} not loaded, check logs")
            return

        if buttons_config:
            if len(buttons_config) != len(self.blueprint.buttons):
                self._setError(f"Blueprint {self.blueprint.id} mismatch for buttons on {self.name}")
                self.valid_blueprint = False
                return
            for i in range(len(buttons_config)):
                if len(buttons_config[i].get('actions')) != len(self.blueprint.buttons[i].get('actions')):
                    self._setError(f"Blueprint {self.blueprint.id} mismatch for actions on {self.name}")
                    self.valid_blueprint = False
                    return

    def buildButtons( self, buttons_config ):
        self.stop_running_scripts()
        if not self.valid_blueprint:
            return

        for i in range(len(buttons_config)):
            self.buttons.append(
                    ManagedSwitchConfigButton( self._hass, self.id, i, self.blueprint.buttons[i], buttons_config[i] )
                )
    
    async def start(self): 
        # Reset state for new instances as this should also be called as a restart
        self.stop()
        if self._event_listener or not self.valid_blueprint or not self.enabled:
            return

        @callback
        def _handleMQTT( message: ReceiveMessage ):
            data = format_mqtt_message(message)
            __processIncoming( data, Context() )
        
        @callback
        def _handleEvent( event ):
            __processIncoming( event.data, event.context )

        def __processIncoming( data, context ):
            if not self.enabled or not self._check_conditons( data ):
                return

            for button in self.buttons:
                if not button._check_conditions( data ):
                    continue
                for action in button.actions:
                    if not action._check_conditions( data ):
                        continue
                    self._hass.async_create_task( action.run( data=data, context=context ) )

        if self.blueprint.event_type == 'mqtt':
            try:
                self._event_listener = await mqtt_subscribe(self._hass, self.identifier, _handleMQTT)
            except HomeAssistantError:
                LOGGER.error(f"Unable to handle switch: {self.name} as MQTT is not loaded")
        else:
            self._event_listener = self._hass.bus.async_listen(self.blueprint.event_type, _handleEvent)

    def stop(self):
        self.stop_running_scripts()
        if self._event_listener:
            self._event_listener()
            self._event_listener = None

    def stop_running_scripts( self ):
        for button in self.buttons:
            for action in button.actions:
                if action.script:
                    self._hass.async_create_task( action.script.async_stop() )
                    
    def setEnabled( self, value: bool ):
        self.enabled = value

    def _check_conditons( self, data ) -> bool:
        if self.blueprint.event_type != 'mqtt':
            if str(data.get(self.blueprint.identifier_key)) != str(self.identifier):
                return False

        for condition in self.blueprint.conditions:
            if condition.get('key') not in data or str(data.get(condition.get('key'))) != str(condition.get('value')):
                return False
        return True

    def _setError( self, error_message ):
        self._error = error_message
        if self._error:
            LOGGER.error(self._error)

    
    # home assistant json
    def as_dict(self):
        res = self.__dict__.copy()
        res.pop('_hass')
        res.pop('_event_listener')
        return res

    # attr dict
    def asdict(self):
        return self.as_dict()
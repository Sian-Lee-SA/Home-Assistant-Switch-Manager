import time, asyncio
from .const import DOMAIN, LOGGER
from .helpers import format_mqtt_message, get_val_from_str
from homeassistant.core import HomeAssistant, Context, callback
from homeassistant.helpers.script import Script, async_validate_actions_config
from homeassistant.helpers.condition import async_template as template_condition
from homeassistant.helpers.template import Template
from homeassistant.components.mqtt.client import async_subscribe as mqtt_subscribe
from homeassistant.components.mqtt.models import ReceiveMessage
from homeassistant.exceptions import HomeAssistantError
import homeassistant.helpers.config_validation as cv

def check_conditions( hass: HomeAssistant, conditions, data ) -> bool:
    if not conditions:
        return True

    if isinstance(conditions, Template):
        return template_condition(hass, conditions, { "data": data }, False)
    for condition in conditions:
        value = get_val_from_str(condition.get('key'), data)
        if value is None or str(value) != str(condition.get('value')):
            return False
    return True

def convert_conditions( hass: HomeAssistant, conditions ):
    if isinstance(conditions, str):
        return Template(conditions, hass)
    return conditions

async def create_event_listeners( hass: HomeAssistant, blueprint, mqtt_topic, _callback ):
    @callback
    def _handleMQTT( message: ReceiveMessage ):
        data = format_mqtt_message(message)
        _callback( data.copy(), Context() )
    
    @callback
    def _handleEvent( event ):
        _callback( event.data.copy(), event.context )

    listeners = []
    if blueprint.is_mqtt:
        try:
            listeners.append( await mqtt_subscribe(hass, mqtt_topic, _handleMQTT) )
            if blueprint.mqtt_sub_topics:
                listeners.append( await mqtt_subscribe(hass, f"{mqtt_topic}/#", _handleMQTT) )
        except HomeAssistantError:
            LOGGER.error(f"Unable to handle switch as MQTT is not loaded")
    else:
        listeners.append( hass.bus.async_listen(blueprint.event_type, _handleEvent) )
    return listeners

class Blueprint:
    
    def __init__(self, hass, _id: str, config: dict, has_image: bool):
        """Initialize Blueprint."""
        self._hass = hass
        self.id = str(_id)
        self.name = config.get('name')
        self.has_image = has_image
        self.service = config.get('service')
        self.event_type = config.get('event_type')
        self.is_mqtt = self.event_type == 'mqtt'
        self.mqtt_topic_format = config.get('mqtt_topic_format', None)
        self.mqtt_sub_topics = config.get('mqtt_sub_topics', False)
        self.identifier_key = config.get('identifier_key')
        self.info = config.get('info')
        self.conditions = convert_conditions( hass, config.get('conditions', []) )

        self.buttons = [] # config.get('buttons')
        for i in range(len(config.get('buttons'))):
            self.buttons.append( BlueprintButton( hass, config.get('buttons')[i], i ) )

    def check_conditions( self, data ):
        if self.identifier_key and self.identifier_key not in data:
            return False
        return check_conditions( self._hass, self.conditions, data )

    async def start_discovery( self, _callback ):
        listeners = []
        @callback
        def remove_listener():
            for listener in listeners:
                listener()

        if self.is_mqtt and not self.mqtt_topic_format:
            return None

        @callback
        def _processIncoming( data, context ):
            if not self.check_conditions(data):
                return

            for button in self.buttons:
                if not button.check_conditions( data ):
                    continue
                for action in button.actions:
                    if not action.check_conditions( data ):
                        continue
                    _callback( { "identifier": data.get('topic') if self.is_mqtt else data.get(self.identifier_key) } )
                    return
 
        listeners = await create_event_listeners( self._hass, self, self.mqtt_topic_format, _processIncoming )
        return remove_listener

    def from_dict(cls, data):
        return cls(**data)

    def as_dict(self):
        res = self.__dict__.copy()
        res.pop('_hass')
        if isinstance(self.conditions, Template):
            res['conditions'] = self.conditions.template
        return res

    def asdict(self):
        return self.as_dict()

class BlueprintButton:

    def __init__(self, hass, config: dict, index):
        """Initialize BlueprintButton."""
        self._hass = hass
        self.x = config.get('x')
        self.y = config.get('y')
        self.d = config.get('d')
        self.width = config.get('width')
        self.height = config.get('height')
        self.conditions = convert_conditions( hass, config.get('conditions', []) )
        self.index = index;

        self.actions = []
        for i in range(len(config.get('actions'))):
            self.actions.append( BlueprintButtonAction( hass, config.get('actions')[i], i ) )        

    def check_conditions( self, data ):
        return check_conditions( self._hass, self.conditions, data )

    def from_dict(cls, data):
        return cls(**data)

    def as_dict(self):
        res = self.__dict__.copy()
        res.pop('_hass')
        res.pop('index')
        if isinstance(self.conditions, Template):
            res['conditions'] = self.conditions.template
        return res

    def asdict(self):
        return self.as_dict()

class BlueprintButtonAction:

    def __init__(self, hass, config: dict, index):
        self._hass = hass
        self.title = config.get('title')
        self.conditions = convert_conditions( hass, config.get('conditions', []) )
        self.index = index

    def check_conditions( self, data ):
        return check_conditions( self._hass, self.conditions, data )

    def from_dict(cls, data):
        return cls(**data)

    def as_dict(self):
        res = self.__dict__.copy()
        res.pop('_hass')
        res.pop('index')
        if isinstance(self.conditions, Template):
            res['conditions'] = self.conditions.template
        return res

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
        self.blueprint: BlueprintButtonAction = blueprint_action

        self.script: Script = None
        self.active = bool(self.sequence)
        asyncio.create_task( self.init_script() )

    def _check_conditions( self, data ) -> bool:
        return self.blueprint.check_conditions( data )

    async def init_script( self ):
        if self.active:
            sequence = await async_validate_actions_config(
                self._hass, cv.SCRIPT_SCHEMA(self.sequence)
            )
            self.script = Script(
                    hass=self._hass, 
                    sequence=sequence,
                    name=f"{DOMAIN}_{self.switch_id}_{self.button_index}_{self.index}",
                    domain=DOMAIN,
                    logger=LOGGER,
                    script_mode=self.mode
                )
            
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
        self.blueprint: BlueprintButton = blueprint_button

        self.active = False
        for i in range(len(config.get('actions'))):
            # Way to handle blueprint mismatch
            try:
                blueprint_action = self.blueprint.actions[i]
            except IndexError:
                blueprint_action = BlueprintButtonAction(hass, { 'mode': 'single', 'sequence': [] }, i)

            action = ManagedSwitchConfigButtonAction( 
                        hass,
                        switch_id,
                        index,
                        i,
                        blueprint_action, 
                        config.get('actions')[i] 
                    )
            self.actions.append(action)
            if action.active:
                self.active = True

    def setInactive( self ):
        self.active = False
        for action in self.actions:
            action.active = False
            action.script = None

    def _check_conditions( self, data ):
        return self.blueprint.check_conditions( data )

    # home assistant json
    def as_dict(self):
        return {k: v for k, v in self.__dict__.items() if k in ['actions']}

    # attr dict
    def asdict(self):
        return self.as_dict()

class ManagedSwitchConfig:

    # Allow the switch to be created so it can be deleted or fixed via GUI
    def __init__( self, hass: HomeAssistant, blueprint: Blueprint, _id, config ):
        """Initialize ManagedSwitch."""
        self._hass = hass
        self._event_listeners = []
        self._error = None
        self.id = str( _id ) # Ensute id is a string for future proofing
        self.name = config.get('name')        
        self.identifier = config.get('identifier')
        self.blueprint: Blueprint
        self.valid_blueprint: bool
        self.is_mismatch: bool
        self.variables: dict = config.get('variables')
        self.rotate: int = config.get('rotate', 0)
        self.buttons: list[ManagedSwitchConfigButton] = []
        self.enabled: bool = config.get('enabled', True)
        self.button_last_state: list = []
        self.setBlueprint( blueprint, config.get('buttons') )
        self.buildButtons( config.get('buttons') )

        self.listeners = []

    def update( self, config ):
        self.name = config.get('name')
        self.identifier = config.get('identifier')
        self.variables: dict = config.get('variables')
        self.rotate: int = config.get('rotate', 0)
        self.button_last_state = []
        self.buildButtons( config.get('buttons') )
        
    def setBlueprint( self, blueprint: Blueprint, buttons_config = None ):
        self.blueprint = blueprint
        self.valid_blueprint = type(blueprint) is Blueprint
        self.is_mismatch = False
        self._error = None

        if not self.valid_blueprint:
            self._setError(f"Blueprint {self.blueprint} for {self.name} not loaded, check logs")
            return

        if buttons_config:
            if len(buttons_config) != len(self.blueprint.buttons):
                self._setError(f"Blueprint {self.blueprint.id} mismatch for buttons on {self.name}")
                self.is_mismatch = True
                return
            for i in range(len(buttons_config)):
                if len(buttons_config[i].get('actions')) != len(self.blueprint.buttons[i].actions):
                    self._setError(f"Blueprint {self.blueprint.id} mismatch for actions on {self.name}")
                    self.is_mismatch = True
                    return

    def mergeVariables( self, data ):
        if not self.variables:
            self.variables = data
        else:
            self.variables.update(data)

    def buildButtons( self, buttons_config ):
        self.stop_running_scripts()
        self.buttons = []
        # No blueprint was loaded and is a string
        if not self.valid_blueprint:
            return

        for i in range(len(buttons_config)):
            # Way to handle blueprint mismatch
            try:
                blueprint_button = self.blueprint.buttons[i]
            except IndexError:
                blueprint_button = BlueprintButton(self._hass, { 'actions': [] }, i)

            self.buttons.append(
                    ManagedSwitchConfigButton( self._hass, self.id, i, blueprint_button, buttons_config[i] )
                )
            if self.is_mismatch:
                self.buttons[i].setInactive()
            self.button_last_state.append(None)
    
    def add_listener(self, callback):
        self.listeners.append(callback)

        def remove_listener():
            self.listeners.remove(callback)

        return remove_listener
        
    def notify(self, event: str, data):
        for listener in self.listeners:
            listener( {**data, **{"event": event}} )

    def monitored( self ) -> bool:
        return bool(self.listeners)

    async def start(self): 
        # Reset state for new instances as this should also be called as a restart
        self.stop()
        if self._event_listeners or self._error or not self.enabled:
            return

        def _processIncoming( data, context ):

            data.update({'variables': self.variables, 'switch_id': self.id, 'button_last_state': self.button_last_state.copy(), 'timestamp': time.time() })
            if not self.enabled or not self._check_conditons( data ):
                return

            button_index = -1
            for button in self.buttons:
                button_index += 1
                if not button._check_conditions( data ):
                    continue
                action_index = -1
                for action in button.actions:
                    action_index += 1
                    if not action._check_conditions( data ):
                        continue
                    self._hass.async_create_task( action.run( data={ "data": data }, context=context ) )
                    self.button_last_state[button_index] = {
                        "action": action_index,
                        "title": action.blueprint.title,
                        "timestamp": data['timestamp']
                    }
                    self.notify('action_triggered', { 'button': button_index, 'action': action_index, 'data': data })

        self._event_listeners = await create_event_listeners( self._hass, self.blueprint, self.identifier, _processIncoming )

    def stop(self):
        self.stop_running_scripts()
        if self._event_listeners:
            for listener in self._event_listeners:
                listener()
            self._event_listeners = []

    def stop_running_scripts( self ):
        for button in self.buttons:
            for action in button.actions:
                if action.script:
                    self._hass.async_create_task( action.script.async_stop() )
                    
    def setEnabled( self, value: bool ):
        self.enabled = value

    def _check_conditons( self, data ) -> bool:
        if not self.blueprint.is_mqtt:
            if str(data.get(self.blueprint.identifier_key)) != str(self.identifier):
                return False
        
        self.notify('incoming', { 'data': data })
        return self.blueprint.check_conditions( data )

    def _setError( self, error_message ):
        self._error = error_message
        if self._error:
            LOGGER.error(self._error)

    # home assistant json
    def as_dict(self):
        res = self.__dict__.copy()
        res.pop('_hass')
        res.pop('_event_listeners')
        res.pop('listeners')
        return res

    # attr dict
    def asdict(self):
        return self.as_dict()
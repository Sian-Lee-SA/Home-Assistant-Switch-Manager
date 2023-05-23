from __future__ import annotations

from typing import Any
import voluptuous as vol
from homeassistant.helpers import config_validation as cv

from homeassistant.core import HomeAssistant, callback
from homeassistant.components import websocket_api
from homeassistant.components.websocket_api import event_message
from homeassistant.helpers import issue_registry as ir

from .schema import SWITCH_MANAGER_CONFIG_SCHEMA
from .helpers import _get_blueprint, _get_switch_config, _remove_switch_config, _set_switch_config
from .const import DOMAIN, CONF_BLUEPRINTS, CONF_MANAGED_SWITCHES, CONF_STORE
from .models import ManagedSwitchConfig

async def async_setup_connections( hass ):
  
    @websocket_api.websocket_command({
        vol.Required("type"): "switch_manager/blueprints", 
        vol.Optional("blueprint_id"): cv.string
    })
    @websocket_api.async_response
    async def websocket_blueprints(
        hass: HomeAssistant,
        connection: websocket_api.ActiveConnection,
        msg: dict[str, Any],
    ) -> None:
        data = { "blueprint": _get_blueprint(hass, msg['blueprint_id'] ) } if msg.get('blueprint_id') \
            else { "blueprints": hass.data[DOMAIN].get(CONF_BLUEPRINTS) }

        connection.send_result( msg["id"], data )

    @websocket_api.websocket_command({
        vol.Required("type"): "switch_manager/blueprints/auto_discovery", 
        vol.Optional("blueprint_id"): cv.string
    })
    @websocket_api.async_response
    async def websocket_blueprint_auto_discovery(
        hass: HomeAssistant,
        connection: websocket_api.ActiveConnection,
        msg: dict[str, Any],
    ) -> None:
        blueprint = _get_blueprint(hass, msg['blueprint_id'])
        @callback
        def send( data ):
            connection.send_message(event_message(msg["id"], data))

        discovery_listener = await blueprint.start_discovery(send)
        if not discovery_listener:
            return

        @callback
        def close_connection():
            discovery_listener()
        
        connection.subscriptions[msg["id"]] = close_connection
        connection.send_result(msg["id"])

    @websocket_api.websocket_command({
        vol.Required("type"): "switch_manager/configs", 
        vol.Optional("config_id"): cv.string
    })
    @websocket_api.async_response
    async def websocket_configs(
        hass: HomeAssistant,
        connection: websocket_api.ActiveConnection,
        msg: dict[str, Any],
    ) -> None:
        data = { "config":_get_switch_config(hass, msg['config_id'] ) } if msg.get('config_id') \
            else { "configs": hass.data[DOMAIN].get(CONF_MANAGED_SWITCHES) }

        connection.send_result( msg["id"], data )

    @websocket_api.websocket_command({
        vol.Required("type"): "switch_manager/config/monitor", 
        vol.Optional("config_id"): cv.string
    })
    @websocket_api.async_response
    async def websocket_monitor_config(
        hass: HomeAssistant,
        connection: websocket_api.ActiveConnection,
        msg: dict[str, Any],
    ) -> None:
        config = _get_switch_config( hass, msg['config_id'] )

        @callback
        def send( data ):
            connection.send_message(event_message(msg["id"], data))

        config_listener = config.add_listener(send)

        @callback
        def close_connection():
            config_listener()
        
        connection.subscriptions[msg["id"]] = close_connection
        connection.send_result(msg["id"])

    @websocket_api.websocket_command({
        vol.Required("type"): "switch_manager/config/save", 
        vol.Required('config'): SWITCH_MANAGER_CONFIG_SCHEMA,
        vol.Optional('fix_mismatch', default=False): bool
    })
    @websocket_api.async_response
    async def websocket_save_config(
        hass: HomeAssistant,
        connection: websocket_api.ActiveConnection,
        msg: dict[str, Any],
    ) -> None:
        config: ManagedSwitchConfig
        store = hass.data[DOMAIN][CONF_STORE]

        if msg['config'].get('id'):
            config = _get_switch_config( hass, msg['config'].get('id') )
            if msg['fix_mismatch']:
                config.setBlueprint( config.blueprint, msg['config'].get('buttons') )
                ir.async_delete_issue(hass, DOMAIN, f"switch_{config.id}_mismatch")
            config.update( msg['config'] )
            await config.start()
        else:
            config = ManagedSwitchConfig( 
                hass, 
                _get_blueprint( hass, msg['config']['blueprint'] ), 
                store.get_available_id(), 
                msg['config'] 
            )
            await _set_switch_config( hass, config )

        await store.set_managed_switch( config )    
        
        connection.send_result( msg['id'], {
            "config_id": config.id,
            "config": config
        })

    @websocket_api.websocket_command({
        vol.Required("type"): "switch_manager/config/enabled", 
        vol.Required("config_id"): cv.string,
        vol.Required("enabled"): bool
    })
    @websocket_api.async_response
    async def websocket_toggle_config_enabled(
        hass: HomeAssistant,
        connection: websocket_api.ActiveConnection,
        msg: dict[str, Any],
    ) -> None:
        store = hass.data[DOMAIN][CONF_STORE]

        config = _get_switch_config( hass, msg['config_id'] )
        config.setEnabled( msg['enabled'] )
        await config.start()

        await store.set_managed_switch( config )

        connection.send_result(msg['id'], {
            "switch_id": config.id,
            "enabled": msg['enabled']
        })

    @websocket_api.websocket_command({
        vol.Required("type"): "switch_manager/config/delete", 
        vol.Optional("config_id"): cv.string
    })
    @websocket_api.async_response
    async def websocket_delete_config(
        hass: HomeAssistant,
        connection: websocket_api.ActiveConnection,
        msg: dict[str, Any],
    ) -> None:
        store = hass.data[DOMAIN][CONF_STORE]

        await _remove_switch_config( hass, msg['config_id'] )    
        await store.delete_managed_switch( msg['config_id'] )

        ir.async_delete_issue(hass, DOMAIN, f"switch_{msg['config_id']}_mismatch")

        connection.send_result( msg['id'], {
            "deleted": msg['config_id']
        })

    @websocket_api.websocket_command({
        vol.Required("type"): "switch_manager/copy_from_list", 
        vol.Required("blueprint_id"): cv.string,
        vol.Optional("skip_config_id"): cv.string
    })
    @websocket_api.async_response
    async def websocket_copy_from_list(
        hass: HomeAssistant,
        connection: websocket_api.ActiveConnection,
        msg: dict[str, Any],
    ) -> None:
        if 'skip_config_id' not in msg:
            msg['skip_config_id'] = '';
        data = [s for s in hass.data[DOMAIN][CONF_MANAGED_SWITCHES].values() if s.blueprint.id == msg['blueprint_id'] and s.id != msg['skip_config_id']];

        connection.send_result( msg['id'], {
            "switches": data
        })

    websocket_api.async_register_command(hass, websocket_configs)
    websocket_api.async_register_command(hass, websocket_blueprints)
    websocket_api.async_register_command(hass, websocket_blueprint_auto_discovery)
    websocket_api.async_register_command(hass, websocket_monitor_config)
    websocket_api.async_register_command(hass, websocket_save_config)
    websocket_api.async_register_command(hass, websocket_toggle_config_enabled)
    websocket_api.async_register_command(hass, websocket_delete_config)
    websocket_api.async_register_command(hass, websocket_copy_from_list)
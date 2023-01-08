from __future__ import annotations

import voluptuous as vol
from .const import (
    DOMAIN, 
    CONF_BLUEPRINTS,
    CONF_SWITCH_CONFIGS,
    CONF_MANAGED_SWITCHES,
    CONF_STORE,
    LOGGER    
)
from .store import SwitchManagerStore
from .helpers import load_blueprints, VERSION, deploy_blueprints, check_blueprints_folder_exists, _get_blueprint, _set_switch_config
from .view import async_setup_view
from . import models
from .schema import BLUEPRINT_MQTT_SCHEMA, BLUEPRINT_EVENT_SCHEMA
from .connections import async_setup_connections

from homeassistant.core import Config, HomeAssistant, callback
from homeassistant.config import _format_config_error

async def async_setup( hass: HomeAssistant, config: Config ):
    """Set up is called when Home Assistant is loading our component."""
    
    hass.data.setdefault(DOMAIN, {})

    hass.data[DOMAIN] = {
        CONF_BLUEPRINTS: {},
        CONF_SWITCH_CONFIGS: {},
        CONF_MANAGED_SWITCHES: {},
        CONF_STORE: SwitchManagerStore(hass)
    }
    # Init hass storage
    await hass.data[DOMAIN][CONF_STORE].load()

    is_dev = config.get(DOMAIN, {}).get('dev', False)
    if is_dev:
        LOGGER.warning('In Developer Mode')

    await async_migrate( hass, is_dev )
    
    @callback
    async def reload_all( call ):
        for switch_id in hass.data[DOMAIN][CONF_MANAGED_SWITCHES]:
            hass.data[DOMAIN][CONF_MANAGED_SWITCHES][switch_id].stop()
        hass.data[DOMAIN][CONF_BLUEPRINTS] = {}
        hass.data[DOMAIN][CONF_MANAGED_SWITCHES] = {}

        await hass.data[DOMAIN][CONF_STORE].load()
        await _init_blueprints(hass)
        await _init_switch_configs(hass)


    await _init_blueprints(hass)
    await _init_switch_configs(hass)

    hass.async_add_executor_job( hass.services.register, DOMAIN, 'reload', reload_all )

    # Return boolean to indicate that initialization was successful.
    return True

async def async_setup_entry( hass, config_entry ):
    await async_setup_view(hass)
    await async_setup_connections( hass )

    return True

async def async_migrate( hass, in_dev ):
    store = hass.data[DOMAIN][CONF_STORE]

    version_update = not store.compare_version( VERSION )
    if in_dev or version_update or not await check_blueprints_folder_exists( hass ):
        LOGGER.debug('Migrating blueprints')
        await deploy_blueprints( hass )
        if version_update:
            await store.update_version( VERSION )

async def _init_blueprints( hass: HomeAssistant ):
    # Ensure blueprints empty for clean state
    blueprints = hass.data[DOMAIN][CONF_BLUEPRINTS] = {}
    for config in load_blueprints(hass):
        try:
            c_validated = BLUEPRINT_MQTT_SCHEMA(config.get('data')) if config.get('data').get('event_type') == 'mqtt' else BLUEPRINT_EVENT_SCHEMA(config.get('data'))
        except vol.Invalid as ex:
            LOGGER.error(_format_config_error(ex, f"{DOMAIN} {CONF_BLUEPRINTS}({config.get('id')})", config))
            continue
        blueprints[config.get('id')] = models.Blueprint(hass, config.get('id'), c_validated, config.get('has_image'))


async def _init_switch_configs( hass: HomeAssistant ):
    switches = await hass.data[DOMAIN][CONF_STORE].get_managed_switches()
    for _id in switches:
        switch = models.ManagedSwitchConfig( 
            hass, 
            _get_blueprint( hass, switches[_id].get('blueprint') ), 
            _id, 
            switches[_id] 
        )
        await _set_switch_config( hass, switch )

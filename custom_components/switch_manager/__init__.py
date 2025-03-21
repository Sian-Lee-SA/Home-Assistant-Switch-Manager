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
from .helpers import load_blueprints, VERSION, deploy_blueprints, check_blueprints_folder_exists, _get_blueprint, _get_switch_config, _set_switch_config
from .view import async_setup_view, async_bind_blueprint_images
from . import models
from .schema import BLUEPRINT_MQTT_SCHEMA, BLUEPRINT_EVENT_SCHEMA, SERVICE_SET_VARIABLES_SCHEMA
from .connections import async_setup_connections
from homeassistant.core import HomeAssistant, callback
from homeassistant.config import format_schema_error
from homeassistant.helpers import issue_registry as ir
from homeassistant.helpers.typing import ConfigType

async def async_setup( hass: HomeAssistant, config: ConfigType ):
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
        await async_bind_blueprint_images(hass)

    @callback
    def switch_merge_variables( call ):
        switch = _get_switch_config(hass, str(call.data.get('switch_id')))
        if not switch:
            raise ValueError(f"Switch id {call.data.get('switch_id')} does not exist")
        switch.mergeVariables( call.data.get('variables') )

    await _init_blueprints(hass)
    await _init_switch_configs(hass)

    hass.async_add_executor_job( hass.services.register, DOMAIN, 'reload', reload_all )
    hass.async_add_executor_job( hass.services.register, DOMAIN, 'set_variables', switch_merge_variables, SERVICE_SET_VARIABLES_SCHEMA )

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
    for config in await load_blueprints(hass):
        try:
            c_validated = BLUEPRINT_MQTT_SCHEMA(config.get('data')) if config.get('data').get('event_type') == 'mqtt' else BLUEPRINT_EVENT_SCHEMA(config.get('data'))
        except vol.Invalid as ex:
            LOGGER.error(format_schema_error(hass, ex, f"{DOMAIN} {CONF_BLUEPRINTS}({config.get('id')})", config))
            continue
        if len(c_validated.get('buttons')) == 1:
            button = c_validated.get('buttons')[0]
            if button.get('x') or button.get('y') or button.get('width') or button.get('height') or button.get('d'):
                LOGGER.error(f"{DOMAIN} {CONF_BLUEPRINTS}({config.get('id')}) Single button blueprints should not have x, y, width, height or d")
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

        if switch.is_mismatch:
            ir.async_create_issue(
                    hass,
                    domain=DOMAIN,
                    issue_id=f"switch_{_id}_mismatch",
                    is_persistent=False,
                    is_fixable=False,
                    learn_more_url=f"/switch_manager/edit/{_id}",
                    severity=ir.IssueSeverity.ERROR,
                    translation_key="mismatch",
                    translation_placeholders={
                        'name': switch.name
                    }
                )

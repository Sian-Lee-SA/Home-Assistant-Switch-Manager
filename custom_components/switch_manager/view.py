from .const import DOMAIN, CONF_BLUEPRINTS, BLUEPRINTS_FOLDER, PANEL_URL, NAME
from .helpers import VERSION
from homeassistant.core import HomeAssistant

async def async_setup_view(hass: HomeAssistant):

    hass.http.register_static_path(
        PANEL_URL,
        hass.config.path("custom_components/switch_manager/assets/switch_manager_panel.js"),
    )

    for key in hass.data[DOMAIN].get(CONF_BLUEPRINTS):
        if hass.data[DOMAIN].get(CONF_BLUEPRINTS)[key].has_image:
            hass.http.register_static_path(
                f'/assets/{DOMAIN}/{key}.png',
                hass.config.path(f"{BLUEPRINTS_FOLDER}/{DOMAIN}/{key}.png"),
            )

    hass.components.frontend.async_register_built_in_panel(
        component_name="custom",
        sidebar_title=NAME,
        sidebar_icon="mdi:light-switch-off",
        frontend_url_path="switch_manager",
        require_admin=True,
        config={
            "_panel_custom": {
                "name": "switch-manager-panel",
                "module_url": f"{PANEL_URL}?{VERSION}",
                "embed_iframe": True
            }
        },
    )
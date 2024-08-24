import os, pathlib
from .const import DOMAIN, CONF_BLUEPRINTS, BLUEPRINTS_FOLDER, PANEL_URL, NAME, LOGGER
from .helpers import VERSION
from homeassistant.core import HomeAssistant
from homeassistant.components.frontend import async_register_built_in_panel
from homeassistant.components.http import StaticPathConfig
from homeassistant.util.yaml.loader import _find_files

async def async_setup_view(hass: HomeAssistant):
    staticJS = [StaticPathConfig(PANEL_URL, hass.config.path("custom_components/switch_manager/assets/switch_manager_panel.js"), True)]
    
    # folder = pathlib.Path(hass.config.path("custom_components/switch_manager/assets"))
    # staticJS = [];
    # for f in _find_files(folder, "*.js"):
    #     staticJS.append(
    #         StaticPathConfig(f"/{os.path.basename(f)}", f, True)
    #     )

    await hass.http.async_register_static_paths(staticJS)
    await async_bind_blueprint_images(hass)

    async_register_built_in_panel(hass,
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
            },
            "version": VERSION
        },
    )

async def async_bind_blueprint_images(hass: HomeAssistant):
    static_paths = []
    
    for key in hass.data[DOMAIN].get(CONF_BLUEPRINTS):
        if hass.data[DOMAIN].get(CONF_BLUEPRINTS)[key].has_image:
            static_paths.append(
                StaticPathConfig(
                    f'/assets/{DOMAIN}/{key}.png',
                    hass.config.path(f"{BLUEPRINTS_FOLDER}/{DOMAIN}/{key}.png"),
                    True
                )
            )
            
    await hass.http.async_register_static_paths(static_paths)
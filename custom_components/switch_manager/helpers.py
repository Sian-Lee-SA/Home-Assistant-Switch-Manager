"""Helpers for switch_manager integration."""
import pathlib, os
from homeassistant.util.yaml.loader import _find_files, load_yaml
from .const import LOGGER, DOMAIN, BLUEPRINTS_FOLDER
from homeassistant.exceptions import HomeAssistantError

def _load_blueprints( hass ):
    folder = pathlib.Path(hass.config.path(BLUEPRINTS_FOLDER, DOMAIN))
    results = [];
    for f in _find_files(folder, "*.yaml"):
        try:
            data = load_yaml(f)
        except HomeAssistantError as ex:
            LOGGER.error(str(ex))
            continue
        results.append({
            'id': os.path.splitext(os.path.basename(f))[0],
            'has_image': os.path.exists(
                os.path.join(folder, os.path.splitext(os.path.basename(f))[0] + '.png')
            ),
            'data': data        
        })
    return results
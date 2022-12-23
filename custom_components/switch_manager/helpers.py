"""Helpers for switch_manager integration."""
import json, pathlib, os, shutil
from homeassistant.util.yaml.loader import _find_files, load_yaml
from .const import LOGGER, DOMAIN, BLUEPRINTS_FOLDER
from homeassistant.exceptions import HomeAssistantError
from homeassistant.components.mqtt.models import ReceiveMessage

COMPONENT_PATH = os.path.dirname(os.path.realpath(__file__))

MANIFEST = json.load(
        open( os.path.join( COMPONENT_PATH, 'manifest.json') )
    )
    
VERSION = MANIFEST['version']


async def check_blueprints_folder_exists( hass ):
    dest_folder = pathlib.Path(hass.config.path(BLUEPRINTS_FOLDER, DOMAIN))
    return os.path.exists( dest_folder )

async def deploy_blueprints( hass ):
    dest_folder = pathlib.Path(hass.config.path(BLUEPRINTS_FOLDER, DOMAIN))
    if not os.path.exists( dest_folder ):
        os.makedirs( dest_folder )
    
    component_blueprints_path = os.path.join( COMPONENT_PATH, 'blueprints' )
    files = os.listdir(component_blueprints_path)
    for file in files:
        if os.path.isfile( os.path.join( component_blueprints_path, file )):
            shutil.copy( 
                os.path.join( component_blueprints_path, file ),
                dest_folder
            )

def load_blueprints( hass ):
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

def format_mqtt_message( message: ReceiveMessage):
    try:
        data = json.loads(message.payload)
        data['topic'] = message.topic
    except ValueError as e:
        data = {
            "topic": message.topic,
            "payload": message.payload
        }
    return data
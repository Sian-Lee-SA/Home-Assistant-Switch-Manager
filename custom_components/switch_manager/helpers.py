"""Helpers for switch_manager integration."""
import json, pathlib, os, shutil
from homeassistant.core import HomeAssistant
from homeassistant.util.yaml.loader import _find_files, load_yaml
from .const import (
    LOGGER, 
    DOMAIN, 
    BLUEPRINTS_FOLDER, 
    CONF_BLUEPRINTS,
    CONF_MANAGED_SWITCHES
)
from . import models
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
    except ValueError as e:
        data = {
            "payload": message.payload
        }

    data.update({
        'topic': message.topic,
        'topic_basename': message.topic.split('/')[-1]
    })
    return data

def get_val_from_str(_string, _dict):
    keys = _string.split('.')
    v = _dict
    for key in keys:
        if not key in v:
            return None
        v = v[key]
    return v

def _get_blueprint( hass: HomeAssistant, id: str ):
    return hass.data[DOMAIN][CONF_BLUEPRINTS].get(id, id)

async def _set_switch_config( hass: HomeAssistant, config ):
    hass.data[DOMAIN][CONF_MANAGED_SWITCHES][config.id] = config
    await config.start();

def _get_switch_config( hass: HomeAssistant, _id: str ):
    return hass.data[DOMAIN][CONF_MANAGED_SWITCHES].get(_id)

async def _remove_switch_config( hass: HomeAssistant, _id: str ):
    hass.data[DOMAIN][CONF_MANAGED_SWITCHES][_id].stop()
    del hass.data[DOMAIN][CONF_MANAGED_SWITCHES][_id]
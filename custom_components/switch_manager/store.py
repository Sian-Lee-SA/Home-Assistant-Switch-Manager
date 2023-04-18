from __future__ import annotations

from .const import LOGGER
from .models import ManagedSwitchConfig
import attr

STORAGE_VERSION = 1
STORAGE_ID = "switch_manager"


@attr.s
class SwitchManagerManagedSwitchData:
    name = attr.ib(type=str, default='')
    enabled = attr.ib(type=bool, default=True)
    blueprint = attr.ib(type=str, default=None)
    identifier = attr.ib(type=str, default=None)
    variables = attr.ib(type=dict, default=None)
    rotate = attr.ib(type=int, default=0)
    buttons = attr.ib(type=list, default=[])

    def set_from_managed_switch_config( self, config: ManagedSwitchConfig ):
        self.__dict__.update(config.as_dict())      
        self.blueprint = config.blueprint.id

    @classmethod
    def from_dict(cls, data):
        return cls(**data)

    def asdict(self):
        return attr.asdict(self)


@attr.s
class SwitchManagerStoreData:
    version = attr.ib(type=str, default="0")
    managed_switches = attr.ib(type=dict[str:SwitchManagerManagedSwitchData], factory=dict)

    @classmethod
    def from_dict(cls, data):
        return cls(**data)

    def asdict(self):
        return attr.asdict(self)

class SwitchManagerStore:
    
    def __init__(self, hass):
        self.store = hass.helpers.storage.Store(STORAGE_VERSION, STORAGE_ID)
        self.data = None
        self.dirty = False

    async def save(self):
        await self.store.async_save(attr.asdict(self.data))

    async def load(self):
        stored = await self.store.async_load()
        if stored:
            self.data = SwitchManagerStoreData.from_dict(stored)
            
        # We assume either the stored data was deleteed or is a new install
        if self.data is None:
            self.data = SwitchManagerStoreData()
            await self.save()
        self.dirty = False

    async def updated(self):
        self.dirty = True
        await self.save()

    async def get_managed_switches(self):
        return self.data.managed_switches

    def compare_version(self, version):
        return self.data.version == str(version)

    async def update_version(self, version):
        self.data.version = str(version)
        await self.updated()

    async def delete_managed_switch(self, _id: str):
        del self.data.managed_switches[_id]
        await self.updated()

    def asdict(self):
        return self.data.asdict()

    def get_available_id( self ) -> str:
        if not any(self.data.managed_switches):
            return '0'            
        return str( int(list(self.data.managed_switches.keys())[-1]) + 1 );
            
    async def set_managed_switch( self, config_data: ManagedSwitchConfig ):        
        config = self.data.managed_switches.get(int(config_data.id), SwitchManagerManagedSwitchData())
        config.set_from_managed_switch_config( config_data )

        self.data.managed_switches[config_data.id] = config
        await self.updated()
        
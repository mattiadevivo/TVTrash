from typing import TypedDict

from attr import dataclass

from scraper.adapters import Adapters
from scraper.domains.waste.municipality_repository import MunicipalityRepository
from scraper.services.municipality import MunicipalityService


class Config(TypedDict):
    pass


@dataclass
class Services:
    municipality: MunicipalityService


def create(config: Config, adapters: Adapters) -> Services:
    municipality = MunicipalityService(MunicipalityRepository(db=adapters.db))
    return Services(municipality=municipality)

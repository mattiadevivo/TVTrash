from typing import Sequence
from scraper.domains.waste.municipality import Municipality
from scraper.domains.waste.municipality_repository import MunicipalityRepository


class MunicipalityService:
    def __init__(self, repo: MunicipalityRepository):
        self.repo = repo

    def create_municipality(
        self, name: str, zone: str | None, area: str | None
    ) -> Municipality:
        municipality = Municipality(name=name, zone=zone, area=area)
        return self.repo.insert(municipality)

    def list_municipalities(self) -> Sequence[Municipality]:
        return self.repo.get_all()

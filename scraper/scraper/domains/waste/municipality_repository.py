from typing import Sequence
from sqlalchemy.dialects.postgresql import insert
from sqlmodel import Session, select
from scraper.adapters.db import Db
from scraper.domains.waste.municipality import Municipality


class MunicipalityRepository:
    def __init__(self, db: Db) -> None:
        self.db = db.engine

    def insert(self, municipality: Municipality) -> Municipality:
        insertStatement = (
            insert(Municipality)
            .values(
                name=municipality.name, zone=municipality.zone, area=municipality.area
            )
            .on_conflict_do_nothing(index_elements=["name", "area", "zone"])
        )
        with Session(self.db) as session:
            session.exec(insertStatement)  # type:ignore
            return municipality

    def get_all(self) -> Sequence[Municipality]:
        with Session(self.db) as session:
            municipalities = session.exec(select(Municipality)).all()
            return municipalities

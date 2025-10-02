from typing import Sequence
from unittest import TestCase
from unittest.mock import create_autospec
from scraper.domains.waste.collection_schedule import CollectionSchedule
from scraper.services.collection_schedules import CollectionScheduleService
from scraper.domains.waste.collection_schedule_repository import (
    CollectionScheduleRepository,
)


class TestCollectionSchedulerService(TestCase):
    def setUp(self):
        self.mock_repository: CollectionScheduleRepository = create_autospec(
            CollectionScheduleRepository
        )
        self.service = CollectionScheduleService(repo=self.mock_repository)

    def test_create_many(self):
        collection_schedules: Sequence[CollectionSchedule] = [
            CollectionSchedule.model_construct(
                date="2023-10-01",
                wastes=["VPL"],
            ),
        ]
        self.mock_repository.insert_many.return_value = collection_schedules

        result = self.service.create_many(collection_schedules)

        self.assertCountEqual(result, collection_schedules)
        self.mock_repository.insert_many.assert_called_once_with(collection_schedules)

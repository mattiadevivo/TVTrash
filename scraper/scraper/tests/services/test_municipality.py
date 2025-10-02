from unittest import TestCase
from unittest.mock import create_autospec
from scraper.domains.waste.municipality import Municipality
from scraper.domains.waste.municipality_repository import MunicipalityRepository
from scraper.services.municipality import MunicipalityService


class TestMunicipalityService(TestCase):
    def setUp(self):
        self.mock_repository: MunicipalityRepository = create_autospec(
            MunicipalityRepository
        )
        self.service = MunicipalityService(repo=self.mock_repository)

    def test_create(self):
        municipality = Municipality.model_construct(
            id="123e4567-e89b-12d3-a456-426614174000",
            name="Casier",
            zone="",
            area=None,
        )
        self.mock_repository.get_by_info.return_value = municipality

        result = self.service.create("Casier", "", None)

        self.assertIsInstance(result, Municipality)
        self.assertEqual(
            result.model_dump_json(),
            municipality.model_dump_json(),
        )

        self.mock_repository.get_by_info.assert_called_once_with("Casier", "", None)
        self.mock_repository.insert.assert_not_called()

    def test_create_municipality_not_exists(self):
        municipality = Municipality.model_construct(
            id="123e4567-e89b-12d3-a456-426614174000",
            name="Casier",
            zone="",
            area=None,
        )
        self.mock_repository.get_by_info.return_value = None
        self.mock_repository.insert.return_value = municipality

        result = self.service.create("Casier", "", None)
        self.assertIsInstance(result, Municipality)
        self.assertEqual(
            result.model_dump_json(),
            municipality.model_dump_json(),
        )

        self.mock_repository.get_by_info.assert_called_once_with("Casier", "", None)
        self.mock_repository.insert.assert_called_once()

    def test_list(self):
        self.mock_repository.get_all.return_value = []

        result = self.service.list()

        self.assertCountEqual(result, [])
        self.mock_repository.get_all.assert_called_once()

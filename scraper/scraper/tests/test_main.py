from unittest.mock import create_autospec
from assertpy import assert_that
from bs4 import BeautifulSoup, Tag
import httpx
from injector import Injector
import pytest
from scraper.adapters import Adapters
from scraper.adapters.db import Config as DbConfig
from scraper.config import Settings
from scraper.main import extract_municipality_from_table, get_page_content
from scraper.services import Services
from scraper.services.collection_schedules import CollectionScheduleService
from scraper.services.municipality import MunicipalityService


@pytest.fixture
def municipality_service_mock() -> MunicipalityService:
	return create_autospec(MunicipalityService)


@pytest.fixture
def collection_schedule_service_mock() -> CollectionScheduleService:
	return create_autospec(CollectionScheduleService)


@pytest.fixture
def settings() -> Settings:
	return Settings()


@pytest.fixture
def services(
	municipality_service_mock, collection_schedule_service_mock, settings
) -> Services:
	injector = Injector()
	injector.binder.bind(DbConfig, DbConfig(settings.db_connection_string))
	injector.binder.bind(MunicipalityService, municipality_service_mock)
	injector.binder.bind(MunicipalityService, collection_schedule_service_mock)
	return injector.get(Services)


@pytest.fixture
def adapters(settings) -> Adapters:
	injector = Injector([])
	injector.binder.bind(DbConfig, DbConfig(settings.db_connection_string))
	return injector.get(Adapters)


@pytest.fixture
def html_content() -> bytes:
	return open('scraper/tests/assets/test_get_page_content.html', 'rb').read()


@pytest.fixture
def municipality_table(html_content):
	soup = BeautifulSoup(html_content, 'html.parser')
	return soup.findAll(
		'table', attrs={'class': lambda x: x and x.startswith('table comune')}
	)[1]


def test_get_page_content(settings, adapters, html_content):
	adapters.http_client.client = httpx.Client(
		transport=httpx.MockTransport(
			lambda request: httpx.Response(
				200,
				content=html_content,
			)
		)
	)
	page_content = get_page_content(adapters.http_client, settings.page_url)
	assert_that(page_content).is_equal_to(html_content)


def test_get_page_content_error(settings, adapters):
	adapters.http_client.client = httpx.Client(
		transport=httpx.MockTransport(
			lambda request: httpx.Response(
				500,
			)
		)
	)
	assert_that(get_page_content).raises(Exception).when_called_with(
		adapters.http_client, settings.page_url
	)


def test_extract_municipality_from_table(municipality_table):
	municipality = extract_municipality_from_table(municipality_table)

	assert_that(municipality).is_not_none()


# def test_scrape(settings, services):
# assert scrape(settings, services) is None

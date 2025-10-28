from datetime import datetime
from bs4 import BeautifulSoup, Tag, ResultSet
from typing import List, cast
from re import search

from scraper.adapters import Adapters
from scraper.adapters.http import HttpClient
from scraper.config import Settings
from scraper.domains.waste.municipality import Municipality
from scraper.domains.waste.collection_schedule import CollectionSchedule, Waste

from scraper.services import Services


def get_page_content(http_client: HttpClient, url: str) -> bytes:
	response = http_client.client.get(url)
	if response.status_code != 200:
		raise (Exception)
	return response.content


def extract_municipality(table: Tag) -> Municipality | None:
	def extract_municipality_zone_from_class_attrs(attrs: list[str]) -> str | None:
		"""Some municipalities have more than one zone, if present extract it"""
		for attr in attrs:
			match = search(r'comune_zona_(\d+)', attr)
			if match:
				return match.group(1)
		return None

	municipality_zone = extract_municipality_zone_from_class_attrs(
		cast(list[str], table.attrs['class'])
	)
	# extract the comune name
	municipality_row = table.find('tr', attrs={'class': 'firstrow'})
	assert isinstance(municipality_row, Tag)
	municipality_column = municipality_row.find('td')
	if municipality_zone is not None and municipality_column is not None:
		municipality_with_area = municipality_column.getText('-', strip=True)
		return Municipality(
			name=municipality_with_area.split('-')[0],
			zone=municipality_zone,
			area=municipality_with_area.split('-')[1]
			if municipality_with_area.find('-') != -1
			else None,
		)
	return None


def extract_collection_schedules(
	table: Tag, municipality: Municipality
) -> List[CollectionSchedule]:
	collection_schedules_table = table.find(
		'table', id=f'svuotamenti_{municipality.zone}'
	)
	assert isinstance(collection_schedules_table, Tag)
	collection_schedules_rows = collection_schedules_table.find_all(
		'tr', recursive=False
	)
	collection_schedules: List[CollectionSchedule] = []
	for row in collection_schedules_rows:
		assert isinstance(row, Tag)
		collection_schedules_cells = row.find_all('td', recursive=False)
		if collection_schedules_cells:
			text = ' '.join(
				[s.getText('&', strip=True) for s in collection_schedules_cells]
			)
			(date, s) = text.split(' ', 1)
			collection_schedules.append(
				CollectionSchedule(
					date=datetime.strptime(date, '%d-%m-%Y').date(),
					waste=cast(
						List[Waste],
						s.split('&') if len(s) > 0 else [],
					),
					municipality_id=municipality.id,
				)
			)
	return collection_schedules


def extract_and_save_collection_schedules(table: Tag, services: Services):
	assert isinstance(table, Tag)
	municipality = extract_municipality(table)
	if municipality is None:
		return
	municipality = services.municipality.create(
		municipality.name, municipality.zone, municipality.area
	)
	collection_schedules = extract_collection_schedules(table, municipality)
	services.collection_schedule.create_many(collection_schedules)


def scrape(settings: Settings, adapters: Adapters, services: Services):
	page_content = get_page_content(adapters.http_client, settings.page_url)
	# Create a BeautifulSoup object and specify the parser
	soup = BeautifulSoup(page_content, 'html.parser')
	# Find all table elements with class that follow the pattern "table comune"
	tables: ResultSet = soup.find_all(
		attrs={'class': lambda x: x and x.startswith('table comune')}
	)
	for table in tables:
		extract_and_save_collection_schedules(table, services)

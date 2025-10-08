import httpx
from injector import Module, inject, provider


class HttpClient:
	@inject
	def __init__(self):
		self.client = httpx.Client()


class HttpModule(Module):
	@provider
	def provide_http_client(self) -> HttpClient:
		return HttpClient()

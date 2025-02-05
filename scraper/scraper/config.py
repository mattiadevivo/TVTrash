from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # each field of the settings can be overriden by an env var with the same name as the field prefixed by"scraper_"
    model_config = SettingsConfigDict(env_prefix="scraper_", case_sensitive=False)
    page_url: str = Field(
        default="https://contarina.it/cittadino/raccolta-differenziata/eco-calendario"
    )

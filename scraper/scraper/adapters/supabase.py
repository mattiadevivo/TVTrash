from supabase import create_client, Client


class Supabase:
    def __init__(self, url: str, key: str):
        self.client: Client = create_client(url, key)

    def insert_data(self, data: dict | list):
        self.client.table("schedules").insert(data).execute

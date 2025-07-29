import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

type Config = {
  url: string;
  anonKey: string;
};

export function create(config: Config) {
  return createClient<Database>(config.url, config.anonKey);
}

export type Client = ReturnType<typeof create>;

export type Municipality =
  Database["tvtrash"]["Tables"]["municipalities"]["Row"];

export async function getMunicipalities(client: Client) {
  const { data } = await client
    .schema("tvtrash")
    .from("municipalities")
    .select();
  return data;
}

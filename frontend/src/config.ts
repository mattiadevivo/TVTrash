import { z } from "zod";

const EnvSchema = z.object({
  SUPABASE_URL: z.string(),
  SUPABASE_ANON_KEY: z.string(),
});

export function create() {
  const envSchema = EnvSchema.parse(import.meta.env);

  return {
    supabase: {
      url: envSchema.SUPABASE_URL,
      anonKey: envSchema.SUPABASE_ANON_KEY,
    },
  };
}

export type Config = ReturnType<typeof create>;

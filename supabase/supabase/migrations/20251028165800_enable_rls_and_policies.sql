-- Enable RLS on public-facing tables and add policies to keep app behavior intact

-- municipalities: public read, no writes (writes via service role only)
ALTER TABLE tvtrash.municipalities ENABLE ROW LEVEL SECURITY;
CREATE POLICY municipalities_select_public
ON tvtrash.municipalities
FOR SELECT
TO anon, authenticated
USING (true);

-- waste_collections: public read, no writes (writes/cleanup via service role/owner)
ALTER TABLE tvtrash.waste_collections ENABLE ROW LEVEL SECURITY;
CREATE POLICY waste_collections_select_public
ON tvtrash.waste_collections
FOR SELECT
TO anon, authenticated
USING (true);


-- notification_types: public read, no writes
ALTER TABLE tvtrash.notification_types ENABLE ROW LEVEL SECURITY;
CREATE POLICY notification_types_select_public
ON tvtrash.notification_types
FOR SELECT
TO anon, authenticated
USING (true);


-- notification_preferences: per-user access
ALTER TABLE tvtrash.notification_preferences ENABLE ROW LEVEL SECURITY;
CREATE POLICY notification_preferences_manage_own
ON tvtrash.notification_preferences
FOR SELECT, INSERT, UPDATE, DELETE
TO authenticated
USING (auth.uid() IS NOT NULL AND auth.uid() = user_id)
WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id); -- check that user_id is the authenticated user in INSERT/UPDATE queries


-- Add useful indexes for joins on notification_preferences
CREATE INDEX IF NOT EXISTS notification_preferences_municipality_id_idx
  ON tvtrash.notification_preferences (municipality_id);

CREATE INDEX IF NOT EXISTS notification_preferences_notification_type_id_idx
  ON tvtrash.notification_preferences (notification_type_id);
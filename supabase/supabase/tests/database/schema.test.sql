CREATE OR REPLACE FUNCTION tvtrash.testschema()
RETURNS SETOF TEXT LANGUAGE plpgsql AS $$
BEGIN
    RETURN NEXT has_table( 'municipalities' );
    RETURN NEXT has_table( 'waste_collections' );
    RETURN NEXT has_table( 'notification_preferences' );
    RETURN NEXT has_table( 'notification_types' );
END;
$$;

SELECT * FROM runtests('tvtrash'::text);

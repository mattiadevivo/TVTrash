CREATE OR REPLACE FUNCTION tvtrash.send_notification()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' 
AS $$
BEGIN
    -- Make the HTTP POST request to the edge function
    perform net.http_post(
        url:='http:/host.docker.internal:54321/functions/v1/send-notification',
        headers:=jsonb_build_object(
            'Content-Type', 'application/json',
            'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'
        ),
        body:=jsonb_build_object(
            'user_id', new.user_id
        )
    ) AS request_id;
    RETURN new;
END $$;

-- Create the trigger
CREATE OR REPLACE TRIGGER send_notification_on_user_preference_change
AFTER INSERT ON tvtrash.notification_preferences
FOR EACH ROW
EXECUTE FUNCTION tvtrash.send_notification();
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "src/shadcdn/components/ui/button";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <div className="p-2">
      <p>Hello from About!</p>
      <Button variant={"destructive"}>
        <Link to="/">Home</Link>
      </Button>
    </div>
  );
}

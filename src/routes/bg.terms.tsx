import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/bg/terms")({
  beforeLoad: () => {
    throw redirect({ to: "/terms", replace: true });
  },
});

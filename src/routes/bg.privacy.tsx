import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/bg/privacy")({
  beforeLoad: () => {
    throw redirect({ to: "/privacy", replace: true });
  },
});

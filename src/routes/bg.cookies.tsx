import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/bg/cookies")({
  beforeLoad: () => {
    throw redirect({ to: "/cookies", replace: true });
  },
});

import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/bg/")({
  beforeLoad: () => {
    throw redirect({ to: "/", replace: true });
  },
});

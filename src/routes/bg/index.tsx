import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import i18n from "@/i18n";

export const Route = createFileRoute("/bg/")({
  component: BgRedirect,
});

function BgRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    try {
      localStorage.setItem("hs_lang", "bg");
    } catch {}
    i18n.changeLanguage("bg");
    navigate({ to: "/", replace: true });
  }, [navigate]);
  return null;
}

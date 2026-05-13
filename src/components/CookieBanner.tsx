import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";

const STORAGE_KEY = "cookie-consent";

export default function CookieBanner() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
  }, []);

  const decide = (choice: "accepted" | "declined") => {
    localStorage.setItem(STORAGE_KEY, choice);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label={t("cookieBanner.title")}
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 60,
        background: "#1a1530",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 -10px 30px rgba(0,0,0,0.4)",
        padding: "1rem 1.25rem",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "1rem",
          justifyContent: "space-between",
        }}
      >
        <p
          style={{
            color: "rgba(232,228,240,0.7)",
            fontSize: "0.875rem",
            margin: 0,
            flex: "1 1 320px",
            lineHeight: 1.5,
          }}
        >
          {t("cookieBanner.text")}{" "}
          <Link
            to="/cookies"
            style={{ color: "#22e4e4", textDecoration: "underline" }}
          >
            {t("cookieBanner.policyLink")}
          </Link>
          .
        </p>
        <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
          <button
            type="button"
            onClick={() => decide("declined")}
            style={{
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "999px",
              padding: "0.6rem 1.25rem",
              color: "rgba(232,228,240,0.7)",
              fontWeight: 500,
              fontSize: "0.875rem",
              cursor: "pointer",
            }}
          >
            {t("cookieBanner.decline")}
          </button>
          <button
            type="button"
            onClick={() => decide("accepted")}
            style={{
              background: "linear-gradient(90deg, #d96cf0, #7b78f5, #22e4e4)",
              border: "none",
              borderRadius: "999px",
              padding: "0.6rem 1.25rem",
              color: "#0d0b1a",
              fontWeight: 700,
              fontSize: "0.875rem",
              cursor: "pointer",
              letterSpacing: "0.02em",
            }}
          >
            {t("cookieBanner.accept")}
          </button>
        </div>
      </div>
    </div>
  );
}

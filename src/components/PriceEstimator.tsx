// @ts-nocheck
import { useState } from "react";
import { useTranslation } from "react-i18next";

const MonitorIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }}>
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

export default function PriceEstimator() {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [projectType, setProjectType] = useState(null);
  const [design, setDesign] = useState(null);
  const [features, setFeatures] = useState([]);
  const [timeline, setTimeline] = useState("standard");
  const [support, setSupport] = useState("none");
  const [showResult, setShowResult] = useState(false);

  const currency = t("estimator.currencySymbol");

  const PROJECT_TYPES = [
    { id: "landing", label: t("estimator.landingPage"), icon: <MonitorIcon />, desc: t("estimator.landingPageDesc"), base: 500 },
    { id: "multipage", label: t("estimator.multiPage"), icon: "📄", desc: t("estimator.multiPageDesc"), base: 2000 },
    { id: "webapp", label: t("estimator.webApp"), icon: "⚡", desc: t("estimator.webAppDesc"), base: 5000 },
    { id: "mobile", label: t("estimator.mobileApp"), icon: "📱", desc: t("estimator.mobileAppDesc"), base: 8000 },
    { id: "ecommerce", label: t("estimator.ecommerce"), icon: "🛒", desc: t("estimator.ecommerceDesc"), base: 3500 },
  ];

  const DESIGN_OPTIONS = [
    { id: "template", label: t("estimator.templateBased"), desc: t("estimator.templateDesc"), price: 0 },
    { id: "custom", label: t("estimator.customDesign"), desc: t("estimator.customDesc"), price: 800 },
    { id: "premium", label: t("estimator.premiumBrand"), desc: t("estimator.premiumDesc"), price: 2000 },
  ];

  const FEATURES = [
    { id: "cms", label: t("estimator.cms"), icon: "✏️", price: 500 },
    { id: "auth", label: t("estimator.auth"), icon: "🔐", price: 800 },
    { id: "booking", label: t("estimator.booking"), icon: "📅", price: 1000 },
    { id: "payments", label: t("estimator.payments"), icon: "💳", price: 1200 },
    { id: "api", label: t("estimator.api"), icon: "🔗", price: 700 },
    { id: "animations", label: t("estimator.animations"), icon: "✨", price: 600 },
    { id: "seo", label: t("estimator.seo"), icon: "📈", price: 400 },
    { id: "multilang", label: t("estimator.multilang"), icon: "🌍", price: 900 },
  ];

  const TIMELINE_OPTIONS = [
    { id: "standard", label: t("estimator.standard"), desc: t("estimator.standardDesc"), multiplier: 1 },
    { id: "fast", label: t("estimator.fastTrack"), desc: t("estimator.fastTrackDesc"), multiplier: 1.3 },
    { id: "rush", label: t("estimator.rush"), desc: t("estimator.rushDesc"), multiplier: 1.6 },
  ];

  const SUPPORT_OPTIONS = [
    { id: "none", label: t("estimator.noSupport"), desc: t("estimator.noSupportDesc"), price: 0 },
    { id: "basic", label: t("estimator.basicMaintenance"), desc: t("estimator.basicDesc"), price: 0 },
    { id: "retainer", label: t("estimator.retainer"), desc: t("estimator.retainerDesc"), price: 500 },
  ];

  const toggleFeature = (id) => {
    setFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const calcPrice = () => {
    const base = PROJECT_TYPES.find((p) => p.id === projectType)?.base || 0;
    const designCost = DESIGN_OPTIONS.find((d) => d.id === design)?.price || 0;
    const featureCost = features.reduce((sum, fid) => {
      return sum + (FEATURES.find((f) => f.id === fid)?.price || 0);
    }, 0);
    const supportCost = SUPPORT_OPTIONS.find((s) => s.id === support)?.price || 0;
    const multiplier = TIMELINE_OPTIONS.find((tl) => tl.id === timeline)?.multiplier || 1;
    return Math.round((base + designCost + featureCost + supportCost) * multiplier);
  };

  const formatPrice = (n) => currency + n.toLocaleString();

  const steps = [
    t("estimator.stepProjectType"),
    t("estimator.stepDesign"),
    t("estimator.stepFeatures"),
    t("estimator.stepTimeline"),
  ];
  const canNext = [
    !!projectType,
    !!design,
    true,
    true,
  ];

  const gradText = {
    background: "linear-gradient(90deg, #d96cf0, #7b78f5, #22e4e4)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };

  const cardBase = {
    background: "#1a1530",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "12px",
    padding: "1rem 1.25rem",
    cursor: "pointer",
    transition: "all 0.2s ease",
  };

  const cardSelected = {
    ...cardBase,
    border: "1px solid rgba(123,120,245,0.6)",
    background: "rgba(123,120,245,0.12)",
    boxShadow: "0 0 20px rgba(123,120,245,0.2)",
  };

  const btnPrimary = {
    background: "linear-gradient(90deg, #d96cf0, #7b78f5, #22e4e4)",
    border: "none",
    borderRadius: "999px",
    padding: "0.75rem 2rem",
    color: "#0d0b1a",
    fontWeight: "700",
    fontSize: "0.95rem",
    cursor: "pointer",
    letterSpacing: "0.02em",
  };

  const btnGhost = {
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "999px",
    padding: "0.75rem 2rem",
    color: "rgba(232,228,240,0.6)",
    fontWeight: "500",
    fontSize: "0.95rem",
    cursor: "pointer",
  };

  return (
    <section className="est-section" style={{ background: "#0d0b1a", padding: "5rem 1.5rem", fontFamily: 'var(--font-sans)' }}>
      <style>{`
        .est-card:hover { border-color: rgba(123,120,245,0.4) !important; background: rgba(123,120,245,0.07) !important; }
        .est-feat:hover { border-color: rgba(34,228,228,0.4) !important; }
        .est-btn-ghost:hover { border-color: rgba(255,255,255,0.35) !important; color: #e8e4f0 !important; }
        @media (max-width: 640px) {
          .est-section { padding: 3rem 1rem !important; }
          .est-step-label, .est-step-line { display: none !important; }
          .est-steps { gap: 0.75rem !important; }
          .est-types-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={{ maxWidth: "800px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: "700", letterSpacing: "0.12em", textTransform: "uppercase", color: "#22e4e4", marginBottom: "0.75rem" }}>
            {t("estimator.label")}
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: "800", fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 1.1, color: "#e8e4f0", margin: "0 0 1rem" }}>
            {t("estimator.heading1")} <span style={gradText}>{t("estimator.heading2")}</span>
          </h2>
          <p style={{ color: "rgba(232,228,240,0.55)", fontSize: "1rem", maxWidth: "480px", margin: "0 auto" }}>
            {t("estimator.subheading")}
          </p>
        </div>

        {!showResult ? (
          <>
            {/* Step indicator */}
            <div className="est-steps" style={{ display: "flex", gap: "0.5rem", marginBottom: "2.5rem", justifyContent: "center" }}>
              {steps.map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div style={{
                    width: "28px", height: "28px", borderRadius: "50%",
                    background: i <= step ? "linear-gradient(135deg, #d96cf0, #22e4e4)" : "#1a1530",
                    border: i <= step ? "none" : "1px solid rgba(255,255,255,0.1)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.75rem", fontWeight: "700",
                    color: i <= step ? "#0d0b1a" : "rgba(232,228,240,0.3)",
                    transition: "all 0.3s",
                    flexShrink: 0,
                  }}>{i + 1}</div>
                  <span className="est-step-label" style={{ fontSize: "0.8rem", color: i === step ? "#e8e4f0" : "rgba(232,228,240,0.35)" }}>{s}</span>
                  {i < steps.length - 1 && <div className="est-step-line" style={{ width: "24px", height: "1px", background: "rgba(255,255,255,0.1)" }} />}
                </div>
              ))}
            </div>

            {/* Step 0: Project Type */}
            {step === 0 && (
              <div>
                <p style={{ color: "rgba(232,228,240,0.55)", fontSize: "0.875rem", marginBottom: "1.25rem" }}>{t("estimator.selectProjectType")}</p>
                <div className="est-types-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.75rem" }}>
                  {PROJECT_TYPES.map((p) => (
                    <div key={p.id} className="est-card"
                      style={projectType === p.id ? cardSelected : cardBase}
                      onClick={() => setProjectType(p.id)}>
                      <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem", color: "#e8e4f0" }}>{p.icon}</div>
                      <div style={{ fontWeight: "600", color: "#e8e4f0", marginBottom: "0.25rem" }}>{p.label}</div>
                      <div style={{ fontSize: "0.825rem", color: "rgba(232,228,240,0.5)" }}>{p.desc}</div>
                      <div style={{ fontSize: "0.8rem", color: "#7b78f5", marginTop: "0.5rem", fontWeight: "600" }}>{t("estimator.from")} {formatPrice(p.base)}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 1: Design */}
            {step === 1 && (
              <div>
                <p style={{ color: "rgba(232,228,240,0.55)", fontSize: "0.875rem", marginBottom: "1.25rem" }}>Choose your design approach</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {DESIGN_OPTIONS.map((d) => (
                    <div key={d.id} className="est-card"
                      style={{ ...(design === d.id ? cardSelected : cardBase), display: "flex", justifyContent: "space-between", alignItems: "center" }}
                      onClick={() => setDesign(d.id)}>
                      <div>
                        <div style={{ fontWeight: "600", color: "#e8e4f0", marginBottom: "0.2rem" }}>{d.label}</div>
                        <div style={{ fontSize: "0.825rem", color: "rgba(232,228,240,0.5)" }}>{d.desc}</div>
                      </div>
                      <div style={{ fontSize: "0.875rem", color: d.price === 0 ? "#22e4e4" : "#7b78f5", fontWeight: "700", flexShrink: 0, marginLeft: "1rem" }}>
                        {d.price === 0 ? "Included" : `+ ${formatPrice(d.price)}`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Features */}
            {step === 2 && (
              <div>
                <p style={{ color: "rgba(232,228,240,0.55)", fontSize: "0.875rem", marginBottom: "1.25rem" }}>Select any additional features <span style={{ color: "rgba(232,228,240,0.35)" }}>(optional)</span></p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "0.75rem" }}>
                  {FEATURES.map((f) => {
                    const selected = features.includes(f.id);
                    return (
                      <div key={f.id} className="est-feat"
                        style={{
                          ...cardBase,
                          border: selected ? "1px solid rgba(34,228,228,0.5)" : "1px solid rgba(255,255,255,0.08)",
                          background: selected ? "rgba(34,228,228,0.08)" : "#1a1530",
                          display: "flex", alignItems: "center", gap: "0.75rem",
                        }}
                        onClick={() => toggleFeature(f.id)}>
                        <span style={{ fontSize: "1.2rem" }}>{f.icon}</span>
                        <div>
                          <div style={{ fontSize: "0.875rem", fontWeight: "600", color: "#e8e4f0" }}>{f.label}</div>
                          <div style={{ fontSize: "0.775rem", color: selected ? "#22e4e4" : "rgba(232,228,240,0.45)" }}>+ {formatPrice(f.price)}</div>
                        </div>
                        {selected && <div style={{ marginLeft: "auto", color: "#22e4e4", fontSize: "1rem" }}>✓</div>}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 3: Timeline & Support */}
            {step === 3 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                <div>
                  <p style={{ color: "rgba(232,228,240,0.55)", fontSize: "0.875rem", marginBottom: "1.25rem" }}>Timeline</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {TIMELINE_OPTIONS.map((t) => (
                      <div key={t.id} className="est-card"
                        style={{ ...(timeline === t.id ? cardSelected : cardBase), display: "flex", justifyContent: "space-between", alignItems: "center" }}
                        onClick={() => setTimeline(t.id)}>
                        <div>
                          <div style={{ fontWeight: "600", color: "#e8e4f0", marginBottom: "0.2rem" }}>{t.label}</div>
                          <div style={{ fontSize: "0.825rem", color: "rgba(232,228,240,0.5)" }}>{t.desc}</div>
                        </div>
                        <div style={{ fontSize: "0.875rem", color: t.multiplier === 1 ? "#22e4e4" : "#d96cf0", fontWeight: "700", flexShrink: 0, marginLeft: "1rem" }}>
                          {t.multiplier === 1 ? "Standard rate" : `${Math.round((t.multiplier - 1) * 100)}% rush fee`}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p style={{ color: "rgba(232,228,240,0.55)", fontSize: "0.875rem", marginBottom: "1.25rem" }}>Ongoing support after launch</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {SUPPORT_OPTIONS.map((s) => (
                      <div key={s.id} className="est-card"
                        style={{ ...(support === s.id ? cardSelected : cardBase), display: "flex", justifyContent: "space-between", alignItems: "center" }}
                        onClick={() => setSupport(s.id)}>
                        <div>
                          <div style={{ fontWeight: "600", color: "#e8e4f0", marginBottom: "0.2rem" }}>{s.label}</div>
                          <div style={{ fontSize: "0.825rem", color: "rgba(232,228,240,0.5)" }}>{s.desc}</div>
                        </div>
                        <div style={{ fontSize: "0.875rem", color: "#22e4e4", fontWeight: "700", flexShrink: 0, marginLeft: "1rem" }}>
                          {s.price === 0 ? "Included" : `+ ${formatPrice(s.price)}/mo`}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Nav buttons */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2.5rem", alignItems: "center" }}>
              {step > 0 ? (
                <button className="est-btn-ghost" style={btnGhost} onClick={() => setStep(step - 1)}>← Back</button>
              ) : <div />}
              {step < steps.length - 1 ? (
                <button style={{ ...btnPrimary, opacity: canNext[step] ? 1 : 0.4, cursor: canNext[step] ? "pointer" : "not-allowed" }}
                  onClick={() => canNext[step] && setStep(step + 1)}>
                  Continue →
                </button>
              ) : (
                <button style={btnPrimary} onClick={() => setShowResult(true)}>
                  See my estimate →
                </button>
              )}
            </div>
          </>
        ) : (
          /* Result screen */
          <div style={{ textAlign: "center" }}>
            <div style={{
              background: "linear-gradient(135deg, rgba(217,108,240,0.1), rgba(34,228,228,0.1))",
              border: "1px solid rgba(123,120,245,0.3)",
              borderRadius: "20px",
              padding: "3rem 2rem",
              marginBottom: "2rem",
            }}>
              <p style={{ color: "rgba(232,228,240,0.55)", fontSize: "0.875rem", marginBottom: "0.5rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>Your project starts at</p>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: "800", fontSize: "clamp(3rem, 10vw, 5rem)", lineHeight: 1, ...gradText, marginBottom: "1rem" }}>
                {formatPrice(calcPrice())}
              </div>
              <p style={{ color: "rgba(232,228,240,0.5)", fontSize: "0.875rem", maxWidth: "380px", margin: "0 auto" }}>
                This is a starting estimate based on your selections. Final pricing is confirmed after a free consult where we dig into your goals and timeline.
              </p>

              {/* Summary pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center", marginTop: "1.75rem" }}>
                {projectType && <span style={{ background: "rgba(123,120,245,0.15)", color: "#7b78f5", borderRadius: "999px", padding: "0.3rem 0.9rem", fontSize: "0.8rem", fontWeight: "500" }}>
                  {PROJECT_TYPES.find(p => p.id === projectType)?.label}
                </span>}
                {design && <span style={{ background: "rgba(217,108,240,0.12)", color: "#d96cf0", borderRadius: "999px", padding: "0.3rem 0.9rem", fontSize: "0.8rem", fontWeight: "500" }}>
                  {DESIGN_OPTIONS.find(d => d.id === design)?.label}
                </span>}
                {features.map(fid => (
                  <span key={fid} style={{ background: "rgba(34,228,228,0.1)", color: "#22e4e4", borderRadius: "999px", padding: "0.3rem 0.9rem", fontSize: "0.8rem", fontWeight: "500" }}>
                    {FEATURES.find(f => f.id === fid)?.label}
                  </span>
                ))}
                <span style={{ background: "rgba(255,255,255,0.06)", color: "rgba(232,228,240,0.6)", borderRadius: "999px", padding: "0.3rem 0.9rem", fontSize: "0.8rem" }}>
                  {TIMELINE_OPTIONS.find(t => t.id === timeline)?.label}
                </span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <button style={btnPrimary} onClick={() => {
                const el = document.getElementById("book");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}>
                Book a free consult →
              </button>
              <button className="est-btn-ghost" style={btnGhost} onClick={() => { setShowResult(false); setStep(0); setProjectType(null); setDesign(null); setFeatures([]); setTimeline("standard"); setSupport("none"); }}>
                Start over
              </button>
            </div>

            <p style={{ color: "rgba(232,228,240,0.3)", fontSize: "0.8rem", marginTop: "1.5rem" }}>
              We respond within 48 hours. No spam, ever.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

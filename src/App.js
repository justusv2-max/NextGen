import React, { useEffect, useRef, useState } from "react";

/**
 * Selbstständige React-Vorschau ohne externe Libraries
 * - keine Imports von framer-motion oder lucide-react
 * - Icons als einfache SVGs / Emojis
 * - leichte, inline definierte UI-Komponenten
 */

/* ------------------------- Kleine UI-Helpers ------------------------- */
const Button = ({
  children,
  onClick,
  disabled,
  variant = "primary",
  size = "md",
  type = "button",
  style,
}) => {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    border:
      variant === "secondary" ? "1px solid #e2e8f0" : "1px solid transparent",
    background: variant === "secondary" ? "#fff" : "#0f172a",
    color: variant === "secondary" ? "#0f172a" : "#fff",
    padding:
      size === "lg" ? "12px 20px" : size === "sm" ? "6px 10px" : "10px 16px",
    fontSize: size === "lg" ? 14 : size === "sm" ? 12 : 14,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{ ...base, ...style }}
    >
      {children}
    </button>
  );
};

const Card = ({ children, style }) => (
  <div
    style={{
      border: "1px solid #e2e8f0",
      borderRadius: 16,
      background: "#ffffffcc",
      ...style,
    }}
  >
    {children}
  </div>
);
const CardHeader = ({ children, style }) => (
  <div style={{ padding: 16, borderBottom: "1px solid #e2e8f0", ...style }}>
    {children}
  </div>
);
const CardTitle = ({ children, style }) => (
  <h3 style={{ margin: 0, fontWeight: 600, ...style }}>{children}</h3>
);
const CardContent = ({ children, style }) => (
  <div style={{ padding: 16, ...style }}>{children}</div>
);

/* ------------------------------ Tabs ------------------------------ */
const TabsContext = React.createContext(null);
const Tabs = ({ defaultValue, children }) => {
  const [value, setValue] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ value, setValue }}>
      {children}
    </TabsContext.Provider>
  );
};
const useTabs = () => {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error("Tabs.* muss innerhalb <Tabs> verwendet werden");
  return ctx;
};
const TabsList = ({ children }) => (
  <div
    style={{
      display: "inline-flex",
      gap: 8,
      border: "1px solid #e2e8f0",
      borderRadius: 16,
      padding: 6,
      background: "#fff",
    }}
  >
    {children}
  </div>
);
const TabsTrigger = ({ value, children }) => {
  const { value: active, setValue } = useTabs();
  const activeStyle = active === value;
  return (
    <button
      onClick={() => setValue(value)}
      style={{
        padding: "8px 14px",
        fontSize: 14,
        borderRadius: 12,
        border: "1px solid",
        borderColor: activeStyle ? "#0f172a" : "#e2e8f0",
        background: activeStyle ? "#0f172a" : "#fff",
        color: activeStyle ? "#fff" : "#334155",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
};
const TabsContent = ({ value, children, style }) => {
  const { value: active } = useTabs();
  if (active !== value) return null;
  return <div style={style}>{children}</div>;
};

/* ---------------------------- Icons (einfach) ---------------------------- */
const Icon = ({ label, size = 16 }) => (
  <span aria-hidden style={{ fontSize: size, lineHeight: 1 }}>
    {label}
  </span>
);

/* ----------------------- Konfiguration & Inhalte ----------------------- */
const CONFIG = {
  brand: {
    name: "NextGen Performance",
    tagline: "Eine klare Strategie – kein Hype, keine Ablenkung.",
  },
  pricing: {
    pdfPrice: "750€ einmalig",
    communityMonthly: "70€ / Monat",
    bundleNote:
      "Strategie bleibt dein Eigentum. Support monatlich kündbar. Zugang nur für Käufer der Strategie.",
  },
  bullets: [
    "Kompakte, professionelle Strategie als PDF (ca. 40–60 Seiten)",
    "Regeln für Analyse, Einstieg, Ausstieg & Rebalancing",
    "Muster-Portfolio & Vorlagen zur direkten Umsetzung",
  ],
  faq: [
    {
      q: "Warum als PDF?",
      a: "Weil du sie jederzeit durchsuchen, drucken und schnell umsetzen kannst. Kein Zeitverlust durch Videos oder Marketinggeplänkel.",
    },
    {
      q: "Was ist der Premium-Support?",
      a: "Der Premium-Support bietet einen ganzheitlichen Begleitrahmen für die Anwendung der Strategie. Teilnehmende können individuelle Rückfragen stellen, erhalten Einblicke in aktuelle Markt- und Strategieanalysen und profitieren von einem transparenten Austausch zu bestehenden Positionen. Darüber hinaus werden regelmäßig Tipps und Optimierungshinweise geteilt, die helfen, Entscheidungen sicherer und strukturierter zu treffen. Ziel des Supports ist es, die Umsetzung der Strategie zu vertiefen und die Erfolgswahrscheinlichkeit nachhaltig zu maximieren – durch Wissen, Austausch und klare Orientierung. Der Zugang steht ausschließlich Käufern der Strategie zur Verfügung.",
    },
    {
      q: "Kann ich nur die Strategie kaufen?",
      a: "Ja. Die Strategie ist als eigenständiges Produkt erhältlich. Der Preis ist bewusst fair kalkuliert, doch die Erfahrung zeigt, dass Support bei der konsequenten Umsetzung hilft und typische Fehler vermeidet.",
    },
    {
      q: "Ist das Anlageberatung?",
      a: "Nein. Es handelt sich um ein Bildungsprodukt. Keine Finanz-, Steuer- oder Anlageberatung. Du triffst deine Entscheidungen selbst.",
    },
  ],
};

/* ---------------------------- Kleine Bausteine ---------------------------- */
const Bullet = ({ children }) => (
  <li
    style={{
      display: "flex",
      gap: 8,
      alignItems: "flex-start",
      color: "#334155",
    }}
  >
    <Icon label="✔️" />
    <span>{children}</span>
  </li>
);

const TrustBar = () => (
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      gap: 24,
      justifyContent: "center",
      color: "#64748b",
      fontSize: 12,
    }}
  >
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <Icon label="💳" />
      Sichere Zahlung
    </div>
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <Icon label="⏱️" />
      Sofortiger Download
    </div>
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <Icon label="✅" />
      Monatlich kündbar
    </div>
  </div>
);

/* ------------------------------ Checkout ------------------------------ */
function CheckoutModal({
  open,
  onClose,
  priceLabel = CONFIG.pricing.pdfPrice,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [method, setMethod] = useState("card");
  const [consent, setConsent] = useState(false);
  const firstFieldRef = useRef(null);

  const emailValid = /\S+@\S+\.\S+/.test(email);
  const nameValid = name.trim().length > 1;
  const formValid = emailValid && nameValid && consent;

  useEffect(() => {
    if (open && firstFieldRef.current) firstFieldRef.current.focus();
  }, [open]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValid) return;
    alert("Demo: Checkout-Daten erfasst. Hier Payment-Provider anbinden.");
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Checkout"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{ position: "fixed", inset: 0, zIndex: 50 }}
    >
      <div
        style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.4)" }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 10,
          minHeight: "100%",
          display: "grid",
          placeItems: "center",
          padding: 16,
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 640,
            borderRadius: 16,
            background: "#fff",
            border: "1px solid #e2e8f0",
            boxShadow: "0 10px 30px rgba(0,0,0,.08)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 16,
              borderBottom: "1px solid #e2e8f0",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Icon label="💳" />
              <h3 style={{ margin: 0, fontWeight: 600 }}>
                Checkout – Strategie-PDF
              </h3>
            </div>
            <button
              onClick={onClose}
              aria-label="Schließen"
              style={{
                background: "transparent",
                border: 0,
                cursor: "pointer",
                padding: 4,
              }}
            >
              ✖️
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            style={{ padding: 16, display: "grid", gap: 12 }}
          >
            <div
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                padding: 12,
                background: "#f8fafc",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: 14,
                }}
              >
                <div>
                  <div style={{ fontWeight: 600 }}>
                    Strategie-PDF (Sofort-Download)
                  </div>
                  <div style={{ color: "#64748b" }}>inkl. MwSt.</div>
                </div>
                <div style={{ fontWeight: 600 }}>{priceLabel}</div>
              </div>
            </div>

            <label style={{ fontSize: 14 }}>
              <div style={{ marginBottom: 6, color: "#334155" }}>Name</div>
              <input
                ref={firstFieldRef}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Max Mustermann"
                style={{
                  width: "100%",
                  border: "1px solid #e2e8f0",
                  borderRadius: 12,
                  padding: "10px 12px",
                  fontSize: 14,
                }}
              />
            </label>
            <label style={{ fontSize: 14 }}>
              <div style={{ marginBottom: 6, color: "#334155" }}>E-Mail</div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="max@example.de"
                style={{
                  width: "100%",
                  border: "1px solid #e2e8f0",
                  borderRadius: 12,
                  padding: "10px 12px",
                  fontSize: 14,
                }}
              />
              {!emailValid && email.length > 0 && (
                <div style={{ fontSize: 12, color: "#dc2626", marginTop: 4 }}>
                  Bitte eine gültige E-Mail eingeben.
                </div>
              )}
            </label>

            <div style={{ fontSize: 14 }}>
              <div style={{ marginBottom: 8, fontWeight: 600 }}>
                Zahlungsmethode
              </div>
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <label
                  style={{ display: "flex", gap: 8, alignItems: "center" }}
                >
                  <input
                    type="radio"
                    name="method"
                    checked={method === "card"}
                    onChange={() => setMethod("card")}
                  />{" "}
                  Kredit-/Debitkarte
                </label>
                <label
                  style={{ display: "flex", gap: 8, alignItems: "center" }}
                >
                  <input
                    type="radio"
                    name="method"
                    checked={method === "paypal"}
                    onChange={() => setMethod("paypal")}
                  />{" "}
                  PayPal
                </label>
              </div>
              <div style={{ fontSize: 12, color: "#64748b", marginTop: 6 }}>
                (Platzhalter – hier später Stripe/PayPal integrieren)
              </div>
            </div>

            <label
              style={{
                display: "flex",
                gap: 8,
                fontSize: 12,
                color: "#334155",
              }}
            >
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
              />
              <span>
                Ich stimme ausdrücklich zu, dass mit der Ausführung des Vertrags
                über den digitalen Inhalt vor Ablauf der Widerrufsfrist begonnen
                wird und ich dadurch mein Widerrufsrecht verliere.
              </span>
            </label>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <button
                type="button"
                onClick={onClose}
                style={{
                  background: "transparent",
                  border: 0,
                  color: "#475569",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Abbrechen
              </button>
              <Button type="submit" disabled={!formValid}>
                <span style={{ marginRight: 6 }}>⬇️</span> Zahlung fortsetzen
              </Button>
            </div>
          </form>

          <div
            style={{ fontSize: 11, color: "#64748b", padding: "0 16px 16px" }}
          >
            Keine Anlageberatung. Digitale Inhalte – kein Widerruf nach Beginn
            der Ausführung. Lieferung: Sofort-Download per E-Mail-Link.
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ Seite ------------------------------ */
export default function SalesPagePDF() {
  const [consent, setConsent] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const openCheckout = () => setCheckoutOpen(true);
  const closeCheckout = () => setCheckoutOpen(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(#f8fafc,#ffffff)",
        color: "#0f172a",
      }}
    >
      {/* NAV */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 30,
          background: "rgba(255,255,255,.8)",
          backdropFilter: "blur(6px)",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontWeight: 600 }}>{CONFIG.brand.name}</div>
          <div style={{ display: "flex", gap: 16, fontSize: 14 }}>
            <a href="#pricing" style={{ color: "#0f172a" }}>
              Preise
            </a>
            <a href="#faq" style={{ color: "#0f172a" }}>
              FAQ
            </a>
          </div>
          <Button onClick={openCheckout}>Strategie entdecken</Button>
        </div>
      </header>

      {/* HERO */}
      <section
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "48px 16px",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 24,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,1fr)",
            gap: 24,
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 40,
                lineHeight: 1.15,
                margin: 0,
                fontWeight: 800,
              }}
            >
              Starte mit Klarheit –{" "}
              <span style={{ color: "#64748b" }}>nicht mit Hoffnung.</span>
            </h1>
            <p style={{ marginTop: 16, color: "#475569", maxWidth: 700 }}>
              {CONFIG.brand.tagline} Du zahlst nur für Wissen, das du wirklich
              nutzt – und erhältst optionalen Premium-Support, wenn du
              persönlichen Austausch suchst.
            </p>
            <ul
              style={{
                marginTop: 16,
                paddingLeft: 0,
                listStyle: "none",
                display: "grid",
                gap: 8,
              }}
            >
              {CONFIG.bullets.map((b, i) => (
                <Bullet key={i}>{b}</Bullet>
              ))}
            </ul>
            <div
              style={{
                marginTop: 16,
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <Button size="lg" onClick={openCheckout}>
                <span style={{ marginRight: 6 }}>⬇️</span>Strategie sichern
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => {
                  document
                    .querySelector("#faq")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span style={{ marginRight: 6 }}>💬</span>Mehr erfahren
              </Button>
            </div>
            <div style={{ marginTop: 16 }}>
              <TrustBar />
            </div>
          </div>
          {/* Symbolgrafik */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 16,
                background: "linear-gradient(45deg,#e2e8f0,#ffffff)",
                filter: "blur(16px)",
              }}
              aria-hidden
            />
            <div
              style={{
                position: "relative",
                border: "1px solid #e2e8f0",
                borderRadius: 16,
                background: "#ffffffdd",
                padding: 40,
                display: "grid",
                placeItems: "center",
                boxShadow: "0 10px 30px rgba(0,0,0,.05)",
              }}
            >
              <div style={{ fontSize: 64, color: "#94a3b8" }}>📄</div>
              <div style={{ marginTop: 8, fontSize: 12, color: "#64748b" }}>
                Digitale Strategie als PDF – klar & kompakt
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FÜR WEN / WARUM */}
      <section
        style={{ maxWidth: 1100, margin: "0 auto", padding: "0 16px 40px" }}
      >
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}
        >
          <div>
            <h3 style={{ fontSize: 24, margin: 0, fontWeight: 600 }}>
              Für wen ist die Strategie?
            </h3>
            <ul
              style={{
                marginTop: 12,
                paddingLeft: 0,
                listStyle: "none",
                display: "grid",
                gap: 8,
                fontSize: 14,
              }}
            >
              <Bullet>
                Für <strong>Anfänger</strong> und{" "}
                <strong>Fortgeschrittene</strong> – klare Regeln, keine
                Fachsprache.
              </Bullet>
              <Bullet>
                <strong>Langfristig</strong> statt hektisch: zeitlich flexibel,
                unabhängig von Tages- und Nachtzeit.
              </Bullet>
              <Bullet>
                Analyse <strong>nicht im Chart</strong>: keine verpassten
                Einstiege, kein Zwang zu bestimmten Uhrzeiten.
              </Bullet>
              <Bullet>
                Ideal für <strong>Berufstätige</strong>: Analyse kann{" "}
                <strong>24/7</strong> erfolgen – wenn es in deinen Alltag passt.
              </Bullet>
            </ul>
          </div>
          <div>
            <h3 style={{ fontSize: 24, margin: 0, fontWeight: 600 }}>
              Warum jetzt?
            </h3>
            <ul
              style={{
                marginTop: 12,
                paddingLeft: 0,
                listStyle: "none",
                display: "grid",
                gap: 8,
                fontSize: 14,
              }}
            >
              <Bullet>
                Du willst Entscheidungen treffen, die du{" "}
                <strong>begründen</strong> kannst – nicht fühlen.
              </Bullet>
              <Bullet>
                Du suchst eine <strong>wiederholbare Methode</strong> statt
                News- und Meinungschaos.
              </Bullet>
              <Bullet>
                Du möchtest eine <strong>strukturierte Umsetzung</strong> – mit
                optionalem Support, wenn Fragen auftauchen.
              </Bullet>
            </ul>
          </div>
        </div>
      </section>

      {/* VERGLEICH */}
      <section
        style={{ maxWidth: 1100, margin: "0 auto", padding: "0 16px 40px" }}
      >
        <h3 style={{ fontSize: 24, margin: "0 0 12px", fontWeight: 600 }}>
          Was unterscheidet diese Strategie?
        </h3>
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              fontSize: 14,
              borderCollapse: "collapse",
              border: "1px solid #e2e8f0",
              borderRadius: 16,
            }}
          >
            <thead style={{ background: "#f1f5f9", color: "#64748b" }}>
              <tr>
                <th style={{ textAlign: "left", padding: 12 }}>Kriterium</th>
                <th style={{ textAlign: "left", padding: 12 }}>
                  Strategie-PDF
                </th>
                <th style={{ textAlign: "left", padding: 12 }}>
                  Signal-Gruppen
                </th>
                <th style={{ textAlign: "left", padding: 12 }}>Videokurse</th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "Zeitaufwand",
                  "Planbar, 24/7 Analyse",
                  "Abhängig von Echtzeit-Signalen",
                  "Stunden Videos",
                ],
                [
                  "Kosten",
                  "Einmalig + optional Support",
                  "Monatliche Abos",
                  "Einmalig/hoch",
                ],
                [
                  "Reproduzierbarkeit",
                  "Klare Regeln",
                  "Oft intransparent",
                  "Abhängig vom Dozenten",
                ],
                [
                  "Flexibilität",
                  "Unabhängig von Handelszeiten",
                  "Oft Intraday-Zwang",
                  "Konsum statt Umsetzung",
                ],
              ].map((row, i) => (
                <tr key={i} style={{ borderTop: "1px solid #e2e8f0" }}>
                  {row.map((cell, j) => (
                    <td key={j} style={{ padding: 12 }}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* STORY */}
      <section
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "40px 16px",
          color: "#334155",
        }}
      >
        <h2
          style={{
            fontSize: 28,
            margin: "0 0 16px",
            textAlign: "center",
            color: "#0f172a",
          }}
        >
          Vom Frust im Future-Handel zur Klarheit an der Börse
        </h2>
        <p>
          Fünf Jahre lang habe ich versucht, im Future-Handel erfolgreich zu
          werden – und bin immer wieder gescheitert. Ich suchte den Fehler in
          mir, bis ich erkannte: Nicht ich war das Problem, sondern das System,
          in dem ich mich bewegte.
        </p>
        <p>
          Emotionen, Überhebelung und ständige Marktgeräusche ließen keinen Raum
          für Struktur. Erst als ich den Schritt in den Aktienmarkt wagte,
          verstand ich, dass nachhaltiger Erfolg Zeit, Strategie und Ruhe
          braucht.
        </p>
        <p>
          Heute handle ich seit über fünf Jahren profitabel mit Aktien – mit
          einem klaren, wiederholbaren System, das auf Logik statt Emotion
          basiert. Diese Strategie ist das Ergebnis all dieser Erfahrungen – und
          sie soll genau das bieten, was mir damals gefehlt hat: einen Weg, der
          funktioniert, weil er dich ruhig denken lässt.
        </p>
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <Button onClick={openCheckout}>
            <span style={{ marginRight: 6 }}>⬇️</span>Starte deine Reise zu
            klaren Entscheidungen
          </Button>
        </div>
      </section>

      {/* TABS */}
      <section
        id="faq"
        style={{ maxWidth: 1100, margin: "0 auto", padding: "0 16px 40px" }}
      >
        <Tabs defaultValue="mission">
          <TabsList>
            <TabsTrigger value="mission">Unsere Mission</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="insights">Handelseinblicke</TabsTrigger>
          </TabsList>

          <TabsContent
            value="mission"
            style={{ marginTop: 16, color: "#334155" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 12,
              }}
            >
              <span style={{ fontSize: 40, color: "#94a3b8" }}>🚀</span>
            </div>
            <p>
              <strong>Ziel:</strong> Das Ziel dieser Strategie ist es, Menschen
              zu befähigen, ihre Finanzen selbstbestimmt und mit einem klaren
              System zu führen. Es geht nicht um das schnelle Geld, sondern um
              die Fähigkeit, Entscheidungen auf Basis von Struktur und Wissen zu
              treffen – unabhängig von Angst, Trends oder Meinungen.
            </p>
            <p>
              <strong>Werte:</strong> Die Strategie steht für Klarheit,
              Transparenz und Einfachheit. Sie soll zeigen, dass nachhaltiger
              Vermögensaufbau keine Spekulation ist, sondern eine
              nachvollziehbare, wiederholbare Vorgehensweise. Bildung, Disziplin
              und Verständnis sind die wahren Renditetreiber – nicht Glück oder
              Zufall.
            </p>
            <p>
              <strong>Umsetzung & Support:</strong> Eine Strategie entfaltet
              ihre volle Wirkung nur, wenn sie konsequent umgesetzt wird. Der
              Support dient nicht dazu, mehr zu verkaufen, sondern um Anwendern
              zu helfen, langfristig dranzubleiben, Rückfragen zu klären und
              Routine zu entwickeln. Er ist die Brücke zwischen Wissen und
              Ergebnis.
            </p>
          </TabsContent>

          <TabsContent value="faq" style={{ marginTop: 16 }}>
            <div
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: 16,
                background: "#ffffffb3",
              }}
            >
              {CONFIG.faq.map((f, i) => (
                <details
                  key={i}
                  style={{ borderTop: i ? "1px solid #e2e8f0" : "none" }}
                >
                  <summary
                    style={{
                      cursor: "pointer",
                      padding: "12px 16px",
                      fontWeight: 600,
                      listStyle: "none",
                    }}
                  >
                    {f.q}
                  </summary>
                  <div
                    style={{
                      padding: "0 16px 12px",
                      fontSize: 14,
                      color: "#334155",
                    }}
                  >
                    {f.a}
                  </div>
                </details>
              ))}
            </div>
            <p style={{ fontSize: 12, color: "#64748b", marginTop: 12 }}>
              Keine Anlageberatung. Investments bergen Risiken bis hin zum
              Totalverlust.
            </p>
          </TabsContent>

          <TabsContent value="insights" style={{ marginTop: 16 }}>
            <div
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: 16,
                background: "#ffffffb3",
                padding: 24,
                textAlign: "center",
                color: "#475569",
              }}
            >
              <div style={{ fontSize: 40, color: "#94a3b8", marginBottom: 8 }}>
                📊
              </div>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>
                Handelseinblicke
              </h3>
              <p>
                Hier werden künftig echte Beispiel-Trades und Markt-Einblicke
                präsentiert.
              </p>
              <p style={{ fontSize: 14, color: "#64748b" }}>
                Geplant ist eine automatische Diashow, in der vergangene Trades
                regelmäßig durchlaufen.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* PREISE */}
      <section
        id="pricing"
        style={{ maxWidth: 1100, margin: "0 auto", padding: "0 16px 40px" }}
      >
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <h2 style={{ fontSize: 28, margin: 0, fontWeight: 600 }}>
            Ehrliche Preise
          </h2>
          <p style={{ color: "#475569", marginTop: 8 }}>
            Zahle nur, was du wirklich brauchst.
          </p>
        </div>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Strategie-PDF</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ fontSize: 36, fontWeight: 700 }}>
                {CONFIG.pricing.pdfPrice}
              </div>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  display: "grid",
                  gap: 8,
                  fontSize: 14,
                  color: "#334155",
                  marginTop: 12,
                }}
              >
                <Bullet>Lebenslanger Zugriff & Updates</Bullet>
                <Bullet>Alle Vorlagen & Checklisten</Bullet>
                <Bullet>Kein Abo nötig</Bullet>
              </ul>
              <div style={{ display: "grid", gap: 8, marginTop: 12 }}>
                <label
                  style={{
                    display: "flex",
                    gap: 8,
                    fontSize: 12,
                    color: "#334155",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                  />
                  <span>
                    Ich stimme ausdrücklich zu, dass mit der Ausführung des
                    Vertrags über den digitalen Inhalt vor Ablauf der
                    Widerrufsfrist begonnen wird und ich dadurch mein
                    Widerrufsrecht verliere.
                  </span>
                </label>
                <Button disabled={!consent} onClick={openCheckout}>
                  <span style={{ marginRight: 6 }}>⬇️</span>Jetzt kaufen
                </Button>
                <div style={{ fontSize: 12, color: "#64748b" }}>
                  inkl. MwSt. • Sofort-Download
                </div>
              </div>
            </CardContent>
          </Card>

          <Card style={{ outline: "2px solid #0f172a" }}>
            <CardHeader>
              <CardTitle>Premium-Support (Community)</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ fontSize: 36, fontWeight: 700 }}>
                {CONFIG.pricing.communityMonthly}
              </div>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  display: "grid",
                  gap: 8,
                  fontSize: 14,
                  color: "#334155",
                  marginTop: 12,
                }}
              >
                <Bullet>Rückfragen & Feedback zur Umsetzung</Bullet>
                <Bullet>
                  Einblicke in Analysen & transparenter Austausch zu Positionen
                </Bullet>
                <Bullet>Tipps & Tricks aus der Praxis</Bullet>
                <Bullet>
                  <strong>Zugang nur für Käufer der Strategie</strong>
                </Bullet>
              </ul>
              <Button style={{ width: "100%", marginTop: 12 }}>
                <span style={{ marginRight: 6 }}>👥</span>Beitreten
              </Button>
              <div style={{ fontSize: 12, color: "#64748b", marginTop: 8 }}>
                {CONFIG.pricing.bundleNote}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section
        style={{ borderTop: "1px solid #e2e8f0", background: "#ffffffcc" }}
      >
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            padding: "32px 16px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 40, color: "#94a3b8", marginBottom: 8 }}>
            ✉️
          </div>
          <h3 style={{ fontSize: 24, margin: 0, fontWeight: 600 }}>
            Bleib informiert – erfahre als Erster, wenn die Strategie startet.
          </h3>
          <p style={{ color: "#475569", marginTop: 8 }}>
            Trag dich unverbindlich ein, um beim Launch benachrichtigt zu
            werden. Kein Spam, kein Risiko.
          </p>
          <form
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              justifyContent: "center",
              marginTop: 12,
            }}
          >
            <input
              type="text"
              placeholder="Dein Name"
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                padding: "10px 12px",
                fontSize: 14,
              }}
            />
            <input
              type="email"
              placeholder="E-Mail-Adresse"
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                padding: "10px 12px",
                fontSize: 14,
              }}
            />
            <Button>Benachrichtige mich beim Start</Button>
          </form>
          <p style={{ fontSize: 12, color: "#64748b", marginTop: 8 }}>
            Mit dem Eintrag erklärst du dich damit einverstanden, per E-Mail
            über den Start informiert zu werden.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #e2e8f0" }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "20px 16px",
            fontSize: 12,
            color: "#64748b",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <div>
            © {new Date().getFullYear()} {CONFIG.brand.name}
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <a href="#" style={{ color: "#0f172a" }}>
              Impressum
            </a>
            <a href="#" style={{ color: "#0f172a" }}>
              Datenschutz
            </a>
            <a href="#" style={{ color: "#0f172a" }}>
              Kontakt
            </a>
          </div>
          <div style={{ fontStyle: "italic", color: "#94a3b8" }}>
            Dieses Projekt befindet sich derzeit in Gründung.
          </div>
        </div>
      </footer>

      {/* MODAL */}
      <CheckoutModal open={checkoutOpen} onClose={closeCheckout} />
    </div>
  );
}

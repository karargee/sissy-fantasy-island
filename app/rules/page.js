import Link from "next/link";

const SECTIONS = [
  {
    title: "🤝 Consent Protocol",
    rules: [
      "Enthusiastic, verbal consent is required before ANY physical contact.",
      "\"No\" and \"not right now\" are complete sentences. Respect them immediately.",
      "Check in with your partner(s) throughout any scene.",
      "Anyone can withdraw consent at any time — no questions asked.",
      "If someone is intoxicated, they cannot give consent. Period.",
      "Use the house safeword \"RED\" to stop any interaction immediately.",
    ],
  },
  {
    title: "👗 Dress Code",
    rules: [
      "Leather, latex, PVC, harnesses, lingerie, fetish wear, or creative kink outfits.",
      "No streetwear (jeans, t-shirts, sneakers) on the dungeon floor.",
      "Nudity is permitted in designated play areas only.",
      "Changing rooms are available at the entrance.",
      "If you're unsure, ask staff — we'd rather help than turn you away.",
    ],
  },
  {
    title: "📵 Photography & Privacy",
    rules: [
      "Absolutely NO photography or video in play areas.",
      "Phone cameras must be covered with provided stickers in dungeon zones.",
      "Photography is allowed ONLY in the designated photo booth area.",
      "Do not share anyone's identity or attendance on social media without explicit permission.",
      "Violators will have their phone confiscated for the remainder of the event.",
    ],
  },
  {
    title: "🛡️ Safety & Dungeon Monitors",
    rules: [
      "Trained dungeon monitors (DMs) are stationed on every floor.",
      "DMs wear red armbands — approach them for any concern, big or small.",
      "All play equipment is inspected before the event. Do not modify or move equipment.",
      "A first aid station is available near the chill zone.",
      "If you see something unsafe, report it to a DM immediately.",
    ],
  },
  {
    title: "🍸 Alcohol & Substances",
    rules: [
      "Drink responsibly. Free water stations are available everywhere.",
      "Bartenders reserve the right to cut off service.",
      "No outside alcohol or substances permitted.",
      "Illegal substances are strictly prohibited. Violators will be removed and reported.",
      "Intoxicated individuals will not be allowed on the dungeon floor.",
    ],
  },
  {
    title: "🚫 Zero Tolerance",
    rules: [
      "Transphobia, racism, homophobia, sexism, ableism, or any form of discrimination = immediate removal.",
      "Stalking, harassment, or intimidation will result in a permanent ban.",
      "Violating consent results in immediate removal, no refund, and a permanent ban.",
      "Aggressive or threatening behavior toward staff or attendees is not tolerated.",
      "Management's decision is final in all disputes.",
    ],
  },
];

export default function Rules() {
  return (
    <div className="container" style={{ paddingTop: "3rem", paddingBottom: "3rem" }}>
      <Link href="/" className="rules-link" style={{ display: "inline-block", marginBottom: "2rem" }}>
        ← Back to Home
      </Link>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>📜 House Rules & Etiquette</h1>
      <p style={{ opacity: 0.6, marginBottom: "3rem", lineHeight: 1.6 }}>
        Trans & Sex Party is built on respect, consent, and community. These rules exist to keep everyone safe and ensure
        we all have an incredible night. By purchasing a ticket, you agree to follow these rules.
      </p>

      {SECTIONS.map((s) => (
        <div key={s.title} style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>{s.title}</h2>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {s.rules.map((r, i) => (
              <li key={i} style={{ fontSize: "0.95rem", opacity: 0.8, lineHeight: 1.6, paddingLeft: "1.5rem", position: "relative" }}>
                <span style={{ position: "absolute", left: 0 }}>•</span>
                {r}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div style={{
        background: "rgba(214,51,132,0.1)",
        border: "1px solid rgba(214,51,132,0.2)",
        borderRadius: "16px",
        padding: "2rem",
        textAlign: "center",
        marginTop: "2rem",
      }}>
        <p style={{ fontSize: "1.1rem", fontWeight: 600 }}>
          🏳️⚧️ Remember: Your body, your rules. Everyone's body, everyone's rules. 🏳️⚧️
        </p>
      </div>
    </div>
  );
}

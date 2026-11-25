"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import ChatWidget from "@/app/components/ChatWidget";
import { EVENT, TIERS, VIRTUAL_TIER } from "@/lib/event";
import s from "./home.module.css";

const BTC_WALLET = "bc1q6k7lmj5jruuk0tq28c03pc5ae2jv0wnthdpxpn";

const SCHEDULE = [
  { time: "8:00 PM", title: "Ultra VIP arrivals", desc: "Early entry, suite check-in and a quiet first drink before the doors open." },
  { time: "9:00 PM", title: "Doors open", desc: "Welcome drinks, coat check and the first DJ set on the main floor." },
  { time: "10:30 PM", title: "Themed rooms open", desc: "Each room has its own host, its own lighting and its own house rules, posted at the door." },
  { time: "12:00 AM", title: "Main-stage performances", desc: "A run of live performances from trans artists, hosts and invited guests." },
  { time: "1:00 AM", title: "Late floor", desc: "The music picks up and the floor stays open until close." },
  { time: "4:00 AM", title: "Close", desc: "Last call is at 3:30. Rides are arranged for Ultra VIP guests." },
];

const DRESS = [
  ["Lingerie & heels", "Always welcome."],
  ["Latex, leather, PVC", "Fetish wear encouraged."],
  ["Gowns & evening wear", "Dress for the occasion."],
  ["Tailoring", "Sharp suits for doms and admirers."],
  ["Costume & drag", "Go as far as you like."],
];

const RULES = [
  ["Consent, every time", "Ask first, accept the answer. A no, a safe word or silence means stop."],
  ["No photos on the floor", "Phones stay in your pocket outside the lounge. Our photographer only shoots people who opt in."],
  ["Respect everyone's identity", "Use people's names and pronouns. Misgendering or fetishising remarks will get you removed."],
  ["Look after each other", "Staff in black are trained to help. Find one, or come to the front desk, at any time."],
  ["18+ with photo ID", "Checked at the door, no exceptions."],
];

const FAQS = [
  { q: "Where is the venue?", a: "A private venue in Los Angeles. The address and entry instructions are emailed to every ticket holder 48 hours before doors open." },
  { q: "Who is this for?", a: "Trans women, sissies, subs, doms, admirers and anyone who supports them. Everyone is expected to follow the house rules." },
  { q: "How do I pay?", a: "By card through Stripe, our payment processor. You'll get a receipt by email straight away. Bitcoin is also accepted." },
  { q: "Can I get a refund?", a: "Card purchases can be refunded up to 7 days before the event. After that, tickets can be transferred to a friend instead. Email us and we'll sort it out." },
  { q: "Is there a dress code?", a: "Yes, and it's enforced at the door. No street clothes. If you're not sure, dress up." },
  { q: "Can I bring a guest?", a: "Each guest needs their own ticket. You can buy up to 10 in one checkout." },
  { q: "Is there a group rate?", a: "For groups of six or more, email us before you buy." },
];

function useCountdown(target) {
  const [t, setT] = useState(null);
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, new Date(target) - new Date());
      setT({
        Days: Math.floor(diff / 86400000),
        Hours: Math.floor((diff % 86400000) / 3600000),
        Minutes: Math.floor((diff % 3600000) / 60000),
        Seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return t;
}

function Reveal({ children }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className={`${s.reveal} ${inView ? s.revealIn : ""}`}>{children}</div>;
}

function SectionHead({ index, title, intro }) {
  return (
    <div className={s.sectionHead}>
      <div className={s.sectionIndex}>{index}</div>
      <div>
        <h2 className={s.sectionTitle}>{title}</h2>
        {intro && <p className={s.sectionIntro}>{intro}</p>}
      </div>
    </div>
  );
}

function FlagRule() {
  return <div className={s.flagRule} aria-hidden="true"><span /><span /><span /><span /><span /></div>;
}

function CheckoutModal({ tier, wallet, onClose }) {
  const [qty, setQty] = useState(1);
  const [method, setMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [btcForm, setBtcForm] = useState({ email: "", txid: "" });
  const [btcSent, setBtcSent] = useState(false);
  const isVirtual = tier.id === VIRTUAL_TIER.id;

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function payByCard() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tierId: tier.id, quantity: qty }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || "Could not start checkout.");
      window.location.href = data.url;
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  }

  async function submitBtc(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/btc-confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: btcForm.email, txid: btcForm.txid, tier: qty > 1 ? `${tier.name} x${qty}` : tier.name, wallet }),
      });
    } catch {}
    setLoading(false);
    setBtcSent(true);
  }

  return (
    <div className={s.overlay} onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="checkout-title">
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <button className={s.modalClose} onClick={onClose} aria-label="Close">×</button>
        <h2 id="checkout-title" className={s.modalTitle}>{tier.name}</h2>
        <p className={s.modalMeta}>{isVirtual ? `Live stream · ${EVENT.shortDate}` : `${EVENT.dateLabel} · ${EVENT.city}`}</p>

        <div className={s.qtyRow}>
          <span>Tickets</span>
          <div className={s.qty}>
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1} aria-label="Fewer tickets">−</button>
            <span aria-live="polite">{qty}</span>
            <button onClick={() => setQty((q) => Math.min(10, q + 1))} disabled={qty >= 10} aria-label="More tickets">+</button>
          </div>
        </div>
        <div className={s.total}><span>Total</span><span>${(tier.price * qty).toLocaleString()}</span></div>

        {method === "card" && (
          <>
            {error && <p className={s.error}>{error}</p>}
            <button className={`${s.btn} ${s.btnPrimary} ${s.btnBlock}`} onClick={payByCard} disabled={loading}>
              {loading ? "Opening secure checkout…" : "Continue to payment"}
            </button>
            <p className={s.fine}>Secure card checkout by Stripe. Receipt emailed instantly.</p>
            <button className={s.altPay} onClick={() => setMethod("btc")}>Pay with Bitcoin instead</button>
          </>
        )}

        {method === "btc" && (
          <div className={s.btcBox}>
            {btcSent ? (
              <p className={s.formMsg}>Thanks — we&apos;ll confirm the transaction on-chain and email your tickets within a few hours.</p>
            ) : (
              <>
                <div className={s.qr}><QRCodeSVG value={`bitcoin:${wallet}`} size={148} bgColor="#ffffff" fgColor="#0c0b0d" level="M" /></div>
                <div className={s.addr}>
                  <code>{wallet}</code>
                  <button className={`${s.btn} ${s.btnGhost} ${s.btnSmall}`} onClick={() => navigator.clipboard?.writeText(wallet)}>Copy</button>
                </div>
                <form className={s.stack} onSubmit={submitBtc}>
                  <input className={s.input} type="email" required placeholder="Email for your tickets" value={btcForm.email} onChange={(e) => setBtcForm({ ...btcForm, email: e.target.value })} />
                  <input className={s.input} type="text" placeholder="Transaction ID (optional)" value={btcForm.txid} onChange={(e) => setBtcForm({ ...btcForm, txid: e.target.value })} />
                  <button type="submit" className={`${s.btn} ${s.btnPrimary} ${s.btnBlock}`} disabled={loading}>
                    {loading ? "Sending…" : "I've sent the payment"}
                  </button>
                </form>
                <p className={s.fine}>Send the USD equivalent of ${(tier.price * qty).toLocaleString()} at the current rate.</p>
              </>
            )}
            <button className={s.altPay} onClick={() => setMethod("card")}>Pay by card instead</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [verified, setVerified] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [checkoutTier, setCheckoutTier] = useState(null);
  const [wallet, setWallet] = useState(BTC_WALLET);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const countdown = useCountdown(EVENT.startISO);

  useEffect(() => {
    let ok = false;
    try { ok = sessionStorage.getItem("age_verified") === "true"; } catch {}
    setVerified(ok);
    fetch("/api/settings").then((r) => r.json()).then((d) => {
      if (d.settings?.btcWallet) setWallet(d.settings.btcWallet);
    }).catch(() => {});
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function confirmAge() {
    try { sessionStorage.setItem("age_verified", "true"); } catch {}
    setVerified(true);
  }

  async function subscribe(e) {
    e.preventDefault();
    try {
      await fetch("/api/subscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
    } catch {}
    setSubscribed(true);
  }

  if (verified === null) return <div className={s.page} />;

  if (!verified) {
    return (
      <div className={s.page}>
        <FlagRule />
        <main className={s.gate}>
          <div className={s.gateInner}>
            <div className={s.eyebrow}>{EVENT.name} · {EVENT.shortDate}</div>
            <h1 className={s.gateTitle}>This site is for adults only.</h1>
            <p className={s.gateText}>You must be 18 or older to enter. By continuing you confirm that you are of legal age where you live.</p>
            <div className={s.gateActions}>
              <button className={`${s.btn} ${s.btnPrimary}`} onClick={confirmAge}>I&apos;m 18 or older</button>
              <a className={`${s.btn} ${s.btnGhost}`} href="https://www.google.com">Leave</a>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const nav = [["#night", "The Night"], ["#tickets", "Tickets"], ["#guide", "Guide"], ["#faq", "FAQ"], ["#contact", "Contact"]];

  return (
    <div className={s.page}>
      <a href="#main" className="skip-link">Skip to content</a>
      <FlagRule />

      <header className={`${s.header} ${scrolled ? s.headerScrolled : ""}`}>
        <div className={`${s.wrap} ${s.headerInner}`}>
          <a href="#top" className={s.brand}>{EVENT.name}</a>
          <nav aria-label="Main">
            <ul className={`${s.navLinks} ${menuOpen ? s.navOpen : ""}`}>
              {nav.map(([href, label]) => (
                <li key={href}><a href={href} onClick={() => setMenuOpen(false)}>{label}</a></li>
              ))}
            </ul>
          </nav>
          <div className={s.headerActions}>
            <a href="#tickets" className={`${s.btn} ${s.btnPrimary} ${s.btnSmall}`}>Tickets</a>
            <button className={s.menuBtn} onClick={() => setMenuOpen((o) => !o)} aria-expanded={menuOpen}>
              {menuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>

      <main id="main">
        {/* Hero */}
        <section className={s.hero} id="top">
          <div className={s.wrap}>
            <div className={s.eyebrow}>{EVENT.edition} · Los Angeles</div>
            <h1 className={s.heroTitle}>One night.<br /><em>Come as you are.</em></h1>
            <div className={s.heroGrid}>
              <div>
                <p className={s.heroLede}>
                  A private, after-dark party for trans women, sissies, subs, doms and the people who adore them.
                  Live performance, themed rooms and a dance floor that runs until four.
                </p>
                <div className={s.heroCtas}>
                  <a href="#tickets" className={`${s.btn} ${s.btnPrimary}`}>Get tickets — from ${TIERS[0].price}</a>
                  <a href="#night" className={`${s.btn} ${s.btnGhost}`}>See the night</a>
                </div>
              </div>
              <dl className={s.factList}>
                {[
                  ["Date", EVENT.dateLabel.replace("Sunday, ", "Sun, ")],
                  ["Doors", `${EVENT.doors} – ${EVENT.ends}`],
                  ["Venue", "Private, Los Angeles"],
                  ["Entry", "18+ with photo ID"],
                ].map(([k, v]) => (
                  <div className={s.fact} key={k}>
                    <dt className={s.factLabel}>{k}</dt>
                    <dd className={s.factValue}>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className={s.countdown} aria-label="Time until doors open">
              {Object.entries(countdown || { Days: "–", Hours: "–", Minutes: "–", Seconds: "–" }).map(([label, v]) => (
                <div className={s.countUnit} key={label}>
                  <span className={s.countNum}>{typeof v === "number" ? String(v).padStart(2, "0") : v}</span>
                  <span className={s.countLabel}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Night */}
        <section className={s.section} id="night">
          <div className={s.wrap}>
            <Reveal>
              <SectionHead
                index="01 — The Night"
                title={<>Eight hours, <em>planned properly.</em></>}
                intro="We keep the guest list small and the production tight: proper sound and lighting, trained floor staff, and rooms that are designed rather than improvised."
              />
              <ol className={`${s.schedule} ${s.body}`}>
                {SCHEDULE.map((r) => (
                  <li className={s.scheduleRow} key={r.time}>
                    <span className={s.scheduleTime}>{r.time}</span>
                    <span className={s.scheduleTitle}>{r.title}</span>
                    <span className={s.scheduleDesc}>{r.desc}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </section>

        {/* Tickets */}
        <section className={s.section} id="tickets">
          <div className={s.wrap}>
            <Reveal>
              <SectionHead
                index="02 — Tickets"
                title={<>Choose how you&apos;d <em>like to arrive.</em></>}
                intro={`All tickets are for ${EVENT.dateLabel}. Capacity is limited and we don't sell at the door.`}
              />
              <div className={s.tiers}>
                {TIERS.map((t) => (
                  <article key={t.id} className={`${s.tier} ${t.featured ? s.tierFeatured : ""}`}>
                    {t.featured && <span className={s.tierTag}>Most chosen</span>}
                    <h3 className={s.tierName}>{t.name}</h3>
                    <div className={s.tierPrice}>${t.price}<small>per person</small></div>
                    <p className={s.tierSummary}>{t.summary}</p>
                    <ul className={s.perks}>{t.perks.map((p) => <li key={p}>{p}</li>)}</ul>
                    <button
                      className={`${s.btn} ${t.featured ? s.btnPrimary : s.btnGhost} ${s.btnBlock}`}
                      onClick={() => setCheckoutTier(t)}
                    >
                      Select {t.name}
                    </button>
                  </article>
                ))}
              </div>

              <div className={s.virtual}>
                <div>
                  <h3 className={s.virtualTitle}>Can&apos;t be in LA? <span>Watch live.</span></h3>
                  <p style={{ color: "var(--muted)" }}>{VIRTUAL_TIER.summary}</p>
                  <ul className={s.virtualPerks}>{VIRTUAL_TIER.perks.map((p) => <li key={p}>{p}</li>)}</ul>
                </div>
                <button className={`${s.btn} ${s.btnGhost}`} onClick={() => setCheckoutTier(VIRTUAL_TIER)}>
                  Virtual Access — ${VIRTUAL_TIER.price}
                </button>
              </div>

              <p className={s.ticketNote}>
                Secure checkout by Stripe; Bitcoin also accepted. Your receipt arrives by email straight away, and the venue address follows 48 hours before doors.
                Card purchases are refundable up to 7 days before the event.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Guide */}
        <section className={s.section} id="guide">
          <div className={s.wrap}>
            <Reveal>
              <SectionHead
                index="03 — Guest Guide"
                title={<>Dress up. <em>Look after each other.</em></>}
              />
              <div className={`${s.twoCol} ${s.body}`}>
                <div>
                  <div className={s.subhead}>Dress code</div>
                  <ul className={s.plainList}>
                    {DRESS.map(([a, b]) => <li key={a}><span>{a}</span><span>{b}</span></li>)}
                  </ul>
                  <p className={s.sectionIntro} style={{ fontSize: "0.925rem" }}>No street clothes. The dress code is enforced at the door — when in doubt, overdress.</p>
                </div>
                <div>
                  <div className={s.subhead}>House rules</div>
                  <ol className={s.rules}>
                    {RULES.map(([a, b]) => <li key={a}><div><strong>{a}</strong><p>{b}</p></div></li>)}
                  </ol>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section className={s.section} id="faq">
          <div className={s.wrap}>
            <Reveal>
              <SectionHead index="04 — Questions" title="Before you come." />
              <div className={`${s.faq} ${s.body}`}>
                {FAQS.map((f) => (
                  <details key={f.q}>
                    <summary>{f.q}</summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Contact + updates */}
        <section className={s.section} id="contact">
          <div className={s.wrap}>
            <Reveal>
              <SectionHead index="05 — Contact" title={<>Questions, groups, <em>access needs.</em></>} />
              <div className={`${s.twoCol} ${s.body}`}>
                <div>
                  <div className={s.subhead}>Get in touch</div>
                  <ul className={s.contactList}>
                    <li><a href={`mailto:${EVENT.contactEmail}`}><span>Email</span><span>Write to us →</span></a></li>
                    <li><a href={`https://wa.me/${EVENT.phone.replace("+", "")}`} target="_blank" rel="noopener noreferrer"><span>WhatsApp</span><span>Message →</span></a></li>
                    <li><a href={`tel:${EVENT.phone}`}><span>Phone</span><span>{EVENT.phoneLabel}</span></a></li>
                  </ul>
                </div>
                <div>
                  <div className={s.subhead}>Event updates</div>
                  <p style={{ color: "var(--muted)", maxWidth: "44ch" }}>Line-up announcements and future dates. A few emails a year, nothing else.</p>
                  {subscribed ? (
                    <p className={s.formMsg}>You&apos;re on the list.</p>
                  ) : (
                    <form className={s.signup} onSubmit={subscribe}>
                      <input className={s.input} type="email" required placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email address" />
                      <button type="submit" className={`${s.btn} ${s.btnPrimary}`}>Subscribe</button>
                    </form>
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.wrap}>
          <div className={s.footerTop}>
            <div className={s.footerBrand}>{EVENT.name}</div>
            <ul className={s.footerLinks}>
              <li><a href="#tickets">Tickets</a></li>
              <li><Link href="/gallery">Gallery</Link></li>
              <li><Link href="/events">Events</Link></li>
              <li><Link href="/terms">Terms</Link></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className={s.footerBottom}>
            <span>© 2026 {EVENT.name}. Strictly 18+.</span>
            <span>{EVENT.dateLabel} · {EVENT.city}</span>
          </div>
        </div>
      </footer>

      <ChatWidget />
      {checkoutTier && <CheckoutModal tier={checkoutTier} wallet={wallet} onClose={() => setCheckoutTier(null)} />}
    </div>
  );
}

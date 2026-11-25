"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import ChatWidget from "@/app/components/ChatWidget";
import { EVENT, TIERS, VIRTUAL_TIER } from "@/lib/event";
import { PAST_PARTY_PHOTOS } from "@/lib/past-parties";
import { PRODUCTS } from "@/lib/shop";
import { FlagRule, SiteHeader, SiteFooter } from "@/app/components/SiteChrome";
import s from "./home.module.css";

const FEATURED_PRODUCTS = ["latex-top", "o-ring-collar", "red-stilettos", "jute-rope-kit"]
  .map((id) => PRODUCTS.find((p) => p.id === id))
  .filter(Boolean);

const BTC_WALLET = "bc1q6k7lmj5jruuk0tq28c03pc5ae2jv0wnthdpxpn";

const TIER_IMAGES = {
  ga: { src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=75", alt: "Confetti falling over a crowd under stage lights" },
  vip: { src: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1200&q=75", alt: "A cocktail on a wooden bar in low light" },
  ultra: { src: "/dungeon-5.jpg", alt: "Private suite with a tufted purple headboard" },
};

const ROOMS = [
  { src: "/dungeon-7.jpg", alt: "Brick-walled room with a St. Andrew's cross under purple light", caption: "The Cross Room", note: "Bondage and impact, with a monitor on the door", wide: true },
  { src: "/dungeon-3.jpg", alt: "Ornate mirror lit in violet", caption: "The Vanity", note: "Sissy makeovers, wigs and lashes" },
  { src: "/dungeon-8.jpg", alt: "Padded leather bench in a brick room", caption: "The Bench Room", note: "Spanking, paddles and discipline" },
  { src: "/dungeon-2.jpeg", alt: "Steel cage set into a dark cabinet", caption: "The Cage", note: "Pet play, kennels and keyholders" },
  { src: "/dungeon-11.jpg", alt: "Padded examination table under purple light", caption: "The Exam Room", note: "Medical play, inspections and role play" },
  { src: "/dungeon-9.jpg", alt: "Lounge with leather seating under a starlit ceiling", caption: "The Lounge", note: "Aftercare, water and somewhere soft to land", full: true },
];

const ux = (id, w = 900) => `https://images.unsplash.com/photo-${id}?w=${w}&q=75`;

const PLAY_MENU = [
  ["Rope & shibari", "A live demo at 10:30, then open rope frames for tying with your partner.", ux("1704919261572-2202be82fdc5"), "A person in a rope suspension under pink and purple light"],
  ["Sissy makeover station", "Hair, makeup, lashes and wardrobe. Come in one way, leave another.", ux("1583209814683-c023dd293cc6"), "Pink cosmetics and a makeup brush"],
  ["Impact play", "Floggers, paddles, crops and canes, with spotters on hand if you're new.", ux("1621354694227-b6aee8a614e5"), "A sub in red lace lingerie holding a riding crop"],
  ["Latex & rubber lounge", "Polishing station, shine bar and a room for the rubber crowd.", ux("1778954729399-12b5f868f60f"), "A figure in black latex and a gas mask"],
  ["Domme hour", "Mistresses and dommes take the main stage at midnight. Subs kneel.", ux("1763542994347-c8eddd093304"), "A domme in a black corset holding a riding crop"],
  ["Pet play corner", "Collars, leads and a kennel for pups, kittens and their handlers.", ux("1778954729609-aebd96c7d002"), "A pup in a black hood and latex shirt"],
  ["Restraint & chastity", "Cuff stations, and keyholders can lodge keys at the front desk for the night.", ux("1579071072964-395e8239d579"), "Wrists in padded leather cuffs"],
  ["Aftercare lounge", "Blankets, water, snacks and quiet. Open all night, staffed by our care team.", "/dungeon-9.jpg", "A lounge with soft seating under a starlit ceiling"],
];

const STRIP = [
  [ux("1514689832698-319d3bcac5d5", 700), "Portrait in a neon-lit harness"],
  [ux("1763446364826-1f7534669fe5", 900), "Cabaret performer on a lit stage"],
  [ux("1636930245053-a5503c411cd8", 700), "DJ decks under neon signs"],
  [ux("1573347904855-aab97d367eab", 700), "Drag performer in pink latex"],
  [ux("1676113462018-d4452266813b", 900), "A packed crowd around the DJ booth"],
  [ux("1516980907201-943c13a8d03c", 900), "Pink LOVE neon sign"],
  [ux("1611699082439-a8de44ba565f", 700), "Model in a glossy latex catsuit on pink"],
  [ux("1562061000-5be8fb06a0c7", 700), "A rubber pup in a full latex suit and hood"],
  [ux("1779906923802-b4b443c3c02e", 900), "Drag queen handed flowers on stage"],
  [ux("1781717510235-8434a44074df", 900), "Red lips under red light"],
  [ux("1576231976954-ac82b45bbe6d", 700), "Black latex thigh boots with platform heels"],
];

const STAGE = [
  { src: ux("1573347904855-aab97d367eab"), alt: "Drag performer in pink latex with chains", caption: "Drag", note: "Trans and drag headliners all night." },
  { src: ux("1763446364826-1f7534669fe5"), alt: "Cabaret performer on stage with dancers", caption: "Cabaret & burlesque", note: "Tease, comedy and costume changes." },
  { src: ux("1779906923802-b4b443c3c02e"), alt: "A drag queen handed flowers on stage", caption: "Crowning", note: "The night's best-dressed sub is crowned at 1:30." },
  { src: ux("1560195183-570e72bb6fd8"), alt: "A performer in red under a single spotlight", caption: "Domme hour", note: "The midnight headline. Subs kneel." },
];

const DOM_SUB = [
  { src: ux("1763542994347-c8eddd093304", 1200), alt: "A domme in a black corset holding a riding crop", caption: "Dommes", note: "Mistresses, dommes and switches who came to take charge.", tall: true },
  { src: ux("1621354694227-b6aee8a614e5"), alt: "A sub in red lace lingerie on her knees", caption: "Subs", note: "Sissies, subs and bottoms who came to give it up." },
  { src: ux("1581794236300-acd130bf0035"), alt: "A black collar with a chain lead", caption: "Owned", note: "Collared pairs welcome. Leads stay on all night if you like." },
  { src: ux("1760476406421-84e41744026f"), alt: "A person in a blindfold and leather jacket kneeling", caption: "Sensation", note: "Blindfolds, wax-free sensation play and slow tease." },
  { src: ux("1579071072955-6304ab5da48b"), alt: "Wrists cuffed behind the back over fishnet stockings", caption: "Restraint", note: "Cuff stations and crosses in every play room." },
];

const LOOKBOOK = [
  { src: "https://images.unsplash.com/photo-1537736445933-ad5b54d84f80?w=900&q=75", alt: "Model in a glossy black latex top and trousers against an orange backdrop", caption: "Latex" },
  { src: "https://images.unsplash.com/photo-1675434704191-9e956445f301?w=900&q=75", alt: "Shirtless man wearing a black leather chest harness", caption: "Harness" },
  { src: "https://images.unsplash.com/photo-1610241519159-8a62634bac9a?w=900&q=75", alt: "Black strappy lingerie laid on white sheets", caption: "Lingerie" },
  { src: "https://images.unsplash.com/photo-1743905030872-22d2970831af?w=900&q=75", alt: "Drag performer in neon green with a holographic fan", caption: "Drag" },
];

const SCHEDULE = [
  { time: "8:00 PM", title: "Ultra VIP arrivals", desc: "Early entry, suite check-in and a quiet first drink before the doors open." },
  { time: "9:00 PM", title: "Doors open", desc: "Welcome drinks, coat check and the first DJ set on the main floor." },
  { time: "10:00 PM", title: "Makeover station opens", desc: "Our artists turn sissies and first-timers out in lashes, lipstick and heels." },
  { time: "10:30 PM", title: "Play rooms open", desc: "The Cross Room, Bench Room and Cage open, alongside a live shibari demo on the rope frames." },
  { time: "11:00 PM", title: "Main stage opens", desc: "Trans and drag headliners, burlesque and cabaret. The stage runs until close." },
  { time: "12:00 AM", title: "Domme hour", desc: "Mistresses, dommes and trans performers take the main stage for the night's headline show." },
  { time: "1:30 AM", title: "Crowning & late floor", desc: "The best-dressed sub is crowned, then the music picks up until close." },
  { time: "4:00 AM", title: "Close", desc: "Last call is at 3:30. Rides are arranged for Ultra VIP guests." },
];

const DRESS = [
  ["Latex, PVC & rubber", "The shinier the better."],
  ["Leather & harnesses", "Chest, thigh or full body."],
  ["Lingerie, corsets & heels", "Stockings, garters, the works."],
  ["Collars, cuffs & gear", "Wear your rank: owned, owning or open."],
  ["Maid & sissy uniforms", "Frills, aprons and petticoats welcome."],
  ["Drag & costume", "Go as far as you like."],
  ["Tailoring", "Sharp suits for doms and admirers."],
];

const RULES = [
  ["Negotiate before you play", "Agree limits, safe words and aftercare before anything starts. If it wasn't agreed, it doesn't happen."],
  ["Green, yellow, red", "Our house safe words. Yellow means slow down and check in. Red means stop immediately, no questions asked."],
  ["Consent, every time", "Ask before you touch, join or watch up close. A no, a safe word or silence means stop."],
  ["Dungeon monitors have the final say", "Monitors in red armbands watch every play room. If they stop a scene, it stops."],
  ["No photos in play areas", "Phones stay in your pocket. Our photographer only shoots guests who opt in, in the lounge."],
  ["Respect everyone's identity", "Use people's names and pronouns. Misgendering or treating trans guests as a fetish object gets you removed."],
  ["Clean up after play", "Wipe down equipment after your scene. Supplies are in every room."],
  ["18+ with photo ID", "Checked at the door, no exceptions. Anyone visibly intoxicated can't play."],
];

const FAQS = [
  { q: "Where is the venue?", a: "A private venue in Los Angeles. The address and entry instructions are emailed to every ticket holder 48 hours before doors open." },
  { q: "Who is this for?", a: "Trans women, sissies, subs, doms, admirers and anyone who supports them. Everyone is expected to follow the house rules." },
  { q: "How do I pay?", a: "By card through Stripe, our payment processor. You'll get a receipt by email straight away. Bitcoin is also accepted." },
  { q: "Can I get a refund?", a: "Card purchases can be refunded up to 7 days before the event. After that, tickets can be transferred to a friend instead. Email us and we'll sort it out." },
  { q: "Is there a dress code?", a: "Yes, and it's enforced at the door. Fetish wear, lingerie, latex, leather, drag or formal. No street clothes. Changing rooms are available, so you can arrive covered up and change inside." },
  { q: "I'm new to kink. Will I fit in?", a: "Yes. Plenty of guests are on their first night out. Watch, ask questions and play only when you're ready. Our hosts can walk you round the rooms and introduce you." },
  { q: "Do I have to play?", a: "Not at all. Many guests come to dance, dress up, socialise and watch. Watching is welcome, but give scenes space and never join without being invited." },
  { q: "Can I bring my own toys and gear?", a: "Yes, personal floggers, paddles, rope, restraints and cuffs are welcome. Bring your own lube and barriers. Blades, fire, breath play and anything that breaks skin are not allowed." },
  { q: "Is there somewhere private to play?", a: "Ultra VIP suites are private. The other play rooms are semi-public and watched by dungeon monitors for everyone's safety." },
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

        <div className={s.payTabs} role="tablist" aria-label="Payment method">
          {[["card", "Card"], ["btc", "Bitcoin"]].map(([key, label]) => (
            <button
              key={key}
              role="tab"
              aria-selected={method === key}
              className={`${s.payTab} ${method === key ? s.payTabActive : ""}`}
              onClick={() => setMethod(key)}
            >
              {label}
            </button>
          ))}
        </div>

        {method === "card" && (
          <>
            {error && <p className={s.error}>{error}</p>}
            <button className={`${s.btn} ${s.btnPrimary} ${s.btnBlock}`} onClick={payByCard} disabled={loading}>
              {loading ? "Opening secure checkout…" : "Continue to payment"}
            </button>
            <p className={s.fine}>Secure card checkout by Stripe. Receipt emailed instantly.</p>
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
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [verified, setVerified] = useState(null);
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

  return (
    <div className={s.page}>
      <a href="#main" className="skip-link">Skip to content</a>
      <FlagRule />
      <SiteHeader onHome />

      <main id="main">
        {/* Hero */}
        <section className={`${s.hero} ${s.heroWithImage}`} id="top">
          <div className={s.heroMedia} aria-hidden="true">
            <Image src="/dungeon-9.jpg" alt="" fill priority sizes="100vw" className={s.heroImg} />
          </div>
          <div className={`${s.wrap} ${s.heroContent}`}>
            <div className={s.eyebrow}>{EVENT.edition} · Los Angeles</div>
            <h1 className={s.heroTitle}>One night.<br /><em>Come as you are.</em></h1>
            <div className={s.heroGrid}>
              <div>
                <p className={s.heroLede}>
                  A private fetish party for trans women, sissies, subs, dommes and the people who adore them.
                  Play rooms, rope, latex, live domme performances and a dance floor that runs until four.
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

        {/* Photo strip */}
        <div className={s.strip} aria-label="Photos of the kind of night to expect">
          <div className={s.stripTrack}>
            {[...STRIP, ...STRIP].map(([src, alt], i) => (
              <div key={i} className={s.stripItem} aria-hidden={i >= STRIP.length}>
                <Image src={src} alt={i >= STRIP.length ? "" : alt} fill sizes="300px" className={s.coverImg} />
              </div>
            ))}
          </div>
        </div>

        {/* Dommes & subs */}
        <section className={s.section} id="who">
          <div className={s.wrap}>
            <Reveal>
              <SectionHead
                index="01 — Who comes"
                title={<>Trans dommes. <em>Devoted subs.</em></>}
                intro="The night belongs to trans women and the subs, sissies, pups and admirers who worship them. Come to lead, come to kneel, or come to watch."
              />
              <div className={s.mosaic}>
                {DOM_SUB.map((d) => (
                  <figure key={d.caption} className={`${s.galleryItem} ${d.tall ? s.mosaicTall : ""}`}>
                    <div className={s.mosaicMedia}>
                      <Image src={d.src} alt={d.alt} fill sizes="(max-width: 760px) 100vw, (max-width: 1200px) 50vw, 600px" className={s.coverImg} />
                    </div>
                    <figcaption>{d.caption}<span className={s.captionNote}>{d.note}</span></figcaption>
                  </figure>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* The Night */}
        <section className={s.section} id="night">
          <div className={s.wrap}>
            <Reveal>
              <SectionHead
                index="02 — The Night"
                title={<>Eight hours, <em>planned properly.</em></>}
                intro="We keep the guest list small and the production tight: proper sound and lighting, trained floor staff, and rooms that are designed rather than improvised."
              />
              <div className={s.bandMedia}>
                <Image
                  src="https://images.unsplash.com/photo-1744313930610-1649242d1fcd?w=2000&q=75"
                  alt="A packed dance floor under disco balls and coloured lights"
                  fill
                  sizes="(max-width: 1200px) 100vw, 1152px"
                  className={s.coverImg}
                />
              </div>
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

        {/* On stage */}
        <section className={s.section} id="stage">
          <div className={s.wrap}>
            <Reveal>
              <SectionHead
                index="03 — On Stage"
                title={<>Live, loud <em>and in heels.</em></>}
                intro="The main stage runs from eleven until close: trans and drag headliners, burlesque, cabaret and the midnight domme show."
              />
              <div className={s.stageGrid}>
                {STAGE.map((p) => (
                  <figure key={p.caption} className={s.galleryItem}>
                    <div className={s.stageMedia}>
                      <Image src={p.src} alt={p.alt} fill sizes="(max-width: 760px) 50vw, 300px" className={s.coverImg} />
                    </div>
                    <figcaption>{p.caption}<span className={s.captionNote}>{p.note}</span></figcaption>
                  </figure>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Rooms */}
        <section className={s.section} id="rooms">
          <div className={s.wrap}>
            <Reveal>
              <SectionHead
                index="04 — The Rooms"
                title={<>Spaces built <em>for play.</em></>}
                intro="Beyond the main floor, each room is lit, furnished and hosted with a purpose. Every room's rules are posted at the door."
              />
              <div className={s.gallery}>
                {ROOMS.map((r) => (
                  <figure key={r.src} className={`${s.galleryItem} ${r.wide ? s.galleryWide : ""} ${r.full ? s.galleryFull : ""}`}>
                    <div className={s.galleryMedia}>
                      <Image src={r.src} alt={r.alt} fill sizes="(max-width: 760px) 100vw, (max-width: 1200px) 50vw, 600px" className={s.coverImg} />
                    </div>
                    <figcaption>{r.caption}<span className={s.captionNote}>{r.note}</span></figcaption>
                  </figure>
                ))}
              </div>

              <div className={s.playMenu}>
                <div className={s.subhead}>On the play menu</div>
                <ul className={s.playGrid}>
                  {PLAY_MENU.map(([title, desc, img, alt]) => (
                    <li key={title}>
                      <div className={s.playMedia}>
                        <Image src={img} alt={alt} fill sizes="(max-width: 760px) 100vw, (max-width: 980px) 50vw, 300px" className={s.coverImg} />
                      </div>
                      <strong>{title}</strong>
                      <p>{desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {PAST_PARTY_PHOTOS.length > 0 && (
          <section className={s.section} id="past">
            <div className={s.wrap}>
              <Reveal>
                <SectionHead index="Archive — Past Parties" title={<>From <em>previous nights.</em></>} intro={<Link href="/past-parties" className={s.textLink}>Browse the full archive →</Link>} />
                <div className={s.pastGrid}>
                  {PAST_PARTY_PHOTOS.map((ph) => (
                    <figure key={ph.src} className={s.galleryItem}>
                      <div className={s.pastMedia}>
                        <Image src={ph.src} alt={ph.alt || ""} fill sizes="(max-width: 760px) 50vw, 300px" className={s.coverImg} />
                      </div>
                      {ph.caption && <figcaption>{ph.caption}</figcaption>}
                    </figure>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>
        )}

        {/* Tickets */}
        <section className={s.section} id="tickets">
          <div className={s.wrap}>
            <Reveal>
              <SectionHead
                index="05 — Tickets"
                title={<>Choose how you&apos;d <em>like to arrive.</em></>}
                intro={`All tickets are for ${EVENT.dateLabel}. Capacity is limited and we don't sell at the door.`}
              />
              <div className={s.tiers}>
                {TIERS.map((t) => (
                  <article key={t.id} className={`${s.tier} ${t.featured ? s.tierFeatured : ""}`}>
                    {TIER_IMAGES[t.id] && (
                      <div className={s.tierMedia}>
                        <Image src={TIER_IMAGES[t.id].src} alt={TIER_IMAGES[t.id].alt} fill sizes="(max-width: 980px) 100vw, 400px" className={s.coverImg} />
                      </div>
                    )}
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

              <div className={`${s.virtual} ${s.virtualWithImage}`}>
                <div className={s.virtualMedia}>
                  <Image src={ux("1560195183-570e72bb6fd8", 900)} alt="A performer in red under a single spotlight on a dark stage" fill sizes="(max-width: 760px) 100vw, 360px" className={s.coverImg} />
                </div>
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
                index="06 — Guest Guide"
                title={<>Dress up. <em>Look after each other.</em></>}
              />
              <div className={s.lookbook}>
                {LOOKBOOK.map((l) => (
                  <figure key={l.src} className={s.galleryItem}>
                    <div className={s.lookMedia}>
                      <Image src={l.src} alt={l.alt} fill sizes="(max-width: 760px) 50vw, 300px" className={s.coverImg} />
                    </div>
                    <figcaption>{l.caption}</figcaption>
                  </figure>
                ))}
              </div>
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

        {/* Boutique teaser */}
        <section className={s.section} id="boutique">
          <div className={s.wrap}>
            <Reveal>
              <SectionHead
                index="07 — The Boutique"
                title={<>Arrive <em>dressed for it.</em></>}
                intro="Latex, leather, lingerie, heels, rope and restraints, picked by our hosts. Shipped discreetly in plain packaging."
              />
              <div className={s.productGrid}>
                {FEATURED_PRODUCTS.map((p) => (
                  <Link key={p.id} href={`/shop#${p.id}`} className={s.productCard}>
                    <div className={s.productMedia}>
                      <Image src={p.image} alt={p.alt} fill sizes="(max-width: 760px) 50vw, 280px" className={s.coverImg} />
                    </div>
                    <div className={s.productMeta}>
                      <span className={s.productCat}>{p.category}</span>
                      <span className={s.productName}>{p.name}</span>
                      <span className={s.productPrice}>${p.price}</span>
                    </div>
                  </Link>
                ))}
              </div>
              <div style={{ marginTop: 32 }}>
                <Link href="/shop" className={`${s.btn} ${s.btnGhost}`}>Shop the full boutique</Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section className={s.section} id="faq">
          <div className={s.wrap}>
            <Reveal>
              <SectionHead index="08 — Questions" title="Before you come." />
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
              <SectionHead index="09 — Contact" title={<>Questions, groups, <em>access needs.</em></>} />
              <div className={s.bandMedia}>
                <Image src={ux("1550218585-5a4e6bc59ebb", 2000)} alt="Pink and blue neon lights over a dark bar" fill sizes="(max-width: 1200px) 100vw, 1152px" className={s.coverImg} />
              </div>
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

      <SiteFooter />

      <ChatWidget />
      {checkoutTier && <CheckoutModal tier={checkoutTier} wallet={wallet} onClose={() => setCheckoutTier(null)} />}
    </div>
  );
}

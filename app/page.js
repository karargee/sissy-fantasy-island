"use client";
import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import Image from "next/image";
import Link from "next/link";

const BTC_WALLET = "bc1q6k7lmj5jruuk0tq28c03pc5ae2jv0wnthdpxpn";

const SISSY_CARDS = [
  {
    name: "Standard Sissy Card",
    emoji: "💳",
    price: 300,
    color: "#f5a9b8",
    delivery: "Digital code via email or anonymous code",
    perks: [
      "Official Sissy Fantasy Island membership card",
      "Unique member ID & QR code",
      "Access to private community group",
      "Lifetime validity — never expires",
      "Delivered via email or anonymous download code",
    ],
    why: "Covers identity verification, card generation, secure delivery, and lifetime community access.",
  },
  {
    name: "Gold Sissy Card",
    emoji: "👑",
    price: 500,
    color: "#d63384",
    popular: true,
    delivery: "Digital + optional physical card (discreet shipping)",
    perks: [
      "Everything in Standard",
      "Custom sissy name printed on card",
      "Priority access to all events",
      "VIP community status & badge",
      "Physical holographic card option (discreet plain envelope)",
      "1-on-1 welcome session with community host",
    ],
    why: "Includes custom design, holographic printing, discreet international shipping, and VIP onboarding.",
  },
  {
    name: "Diamond Sissy Card",
    emoji: "💎",
    price: 800,
    color: "#6f42c1",
    delivery: "Digital + physical + exclusive perks",
    perks: [
      "Everything in Gold",
      "Diamond-tier community status",
      "Free entry to all upcoming events",
      "Exclusive Diamond-only group chat",
      "Personal concierge for event bookings",
      "Featured on the community wall (optional)",
      "Lifetime access to all future perks & drops",
    ],
    why: "Premium tier includes lifetime event access, personal concierge service, and all future community benefits at no extra cost.",
  },
];

const COMMUNITY_TIERS = [
  {
    name: "Community Access",
    price: 150,
    emoji: "💬",
    color: "#5bcefa",
    perks: [
      "Join the private trans & sissy community",
      "Group chat access (Telegram/Discord)",
      "Event announcements & early access",
      "Connect with sissies worldwide",
      "Safe, moderated, and discreet space",
    ],
    why: "One-time fee covers verification, moderation, and maintaining a safe private community.",
  },
  {
    name: "Inner Circle",
    price: 350,
    emoji: "🔐",
    color: "#d63384",
    perks: [
      "Everything in Community Access",
      "Inner Circle private group (limited to 50 members)",
      "Direct access to event organizers",
      "First priority for event tickets",
      "Exclusive meetup invitations",
      "Mentorship from experienced community members",
    ],
    why: "Limited spots ensure quality connections. Includes priority booking and direct organizer access.",
  },
];

const UPCOMING_EVENTS = [
  {
    name: "Trans & Sex Party — Las Vegas",
    date: "August 15–16, 2026",
    location: "The Venetian Resort, Las Vegas, NV",
    price: "From $300",
    status: "Tickets Available",
    emoji: "🎉",
    img: "https://images.unsplash.com/photo-1605723517503-3cadb5818a0c?w=600&q=80",
  },
  {
    name: "Sissy Brunch & Social — Miami",
    date: "October 2026",
    location: "TBA — Private Venue",
    price: "From $150",
    status: "Coming Soon",
    emoji: "🥂",
    img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80",
  },
  {
    name: "Masked Gala — New York",
    date: "December 2026",
    location: "TBA — Private Venue",
    price: "From $400",
    status: "Coming Soon",
    emoji: "🎭",
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80",
  },
];

const EXTERNAL_SHOPS = [
  {
    name: "Lovense",
    emoji: "💜",
    desc: "Remote-controlled toys, vibrators, and interactive devices",
    url: "https://www.lovense.com",
    category: "Toys & Devices",
    img: "https://images.unsplash.com/photo-1600956054428-80c61d38b9c9?w=400&q=80",
  },
  {
    name: "Amazon — Sissy Costumes",
    emoji: "👗",
    desc: "Maid outfits, lingerie, wigs, stockings, and accessories",
    url: "https://www.amazon.com/s?k=sissy+costume",
    category: "Costumes & Outfits",
    img: "https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7f8?w=400&q=80",
  },
  {
    name: "Amazon — Chastity",
    emoji: "🔒",
    desc: "Cages, locks, and chastity devices for beginners and advanced",
    url: "https://www.amazon.com/s?k=chastity+cage",
    category: "Chastity",
    img: "https://images.unsplash.com/photo-1558618047-3c8c76bb987d?w=400&q=80",
  },
  {
    name: "Amazon — Wigs & Makeup",
    emoji: "💄",
    desc: "Feminine wigs, makeup kits, and beauty essentials",
    url: "https://www.amazon.com/s?k=crossdresser+wig",
    category: "Beauty",
    img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80",
  },
  {
    name: "Amazon — Heels & Boots",
    emoji: "👠",
    desc: "High heels, thigh-high boots, and platform shoes in all sizes",
    url: "https://www.amazon.com/s?k=crossdresser+heels",
    category: "Footwear",
    img: "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=400&q=80",
  },
  {
    name: "Amazon — Corsets & Shapewear",
    emoji: "🩱",
    desc: "Waist trainers, corsets, hip pads, and body shaping",
    url: "https://www.amazon.com/s?k=crossdresser+shapewear",
    category: "Shapewear",
    img: "https://images.unsplash.com/photo-1616627577385-5c0c4dab55a5?w=400&q=80",
  },
];

const BLOG_POSTS = [
  { title: "Beginner's Guide to Being a Sissy", emoji: "🎀", tag: "Beginner", img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80", desc: "Everything you need to know to start your sissy journey — mindset, wardrobe, and confidence.", content: "Starting your sissy journey is exciting and personal. Here's what you need to know:\n\n1. Mindset First: Being a sissy is about embracing femininity on your own terms. There's no right or wrong way.\n\n2. Start Small: Begin with underwear, stockings, or a simple accessory. You don't need a full wardrobe on day one.\n\n3. Privacy: Use a separate email, anonymous shopping, and discreet delivery options.\n\n4. Community: Join a safe space like ours where you can ask questions without judgment.\n\n5. Self-Care: Shaving, skincare, and grooming are great first steps that feel amazing.\n\n6. No Rush: Go at your own pace. This is YOUR journey." },
  { title: "How to Build a Feminine Wardrobe", emoji: "👗", tag: "Fashion", img: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80", desc: "From lingerie to everyday femme outfits — a complete shopping guide for sissies.", content: "Building your wardrobe doesn't have to be expensive or overwhelming:\n\n1. Essentials: Start with panties, a bra, stockings, and one outfit you love.\n\n2. Sizing: Measure yourself carefully. Most online stores have size guides. When in doubt, size up.\n\n3. Where to Shop: Amazon has great discreet options. Search for 'crossdresser' or 'sissy' for better results.\n\n4. Shoes: Start with a low heel (2-3 inches). Practice walking at home before going higher.\n\n5. Accessories: A wig, clip-on earrings, and a choker can transform your look instantly.\n\n6. Storage: Keep items in a locked box or bag if you need discretion at home.\n\n7. Budget: You can start with under $50. Quality over quantity." },
  { title: "Staying Discreet: Privacy Tips", emoji: "🔒", tag: "Privacy", img: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&q=80", desc: "How to explore your sissy side while keeping your privacy intact. Tools, tips, and strategies.", content: "Privacy is everything. Here's how to stay safe:\n\n1. Separate Email: Create a new email just for your sissy life. Use ProtonMail for encryption.\n\n2. Shopping: Use Amazon lockers or PO boxes for deliveries. Always select 'gift' packaging.\n\n3. Payments: Use gift cards or Bitcoin to avoid bank statement traces.\n\n4. Phone: Use a separate browser (private mode) or a second phone.\n\n5. Photos: Strip metadata from photos before sharing. Never include your face and identifiable features in the same shot.\n\n6. Community: Use a sissy name, never your real one. Our platform supports full anonymity.\n\n7. Storage: Use a locked app or encrypted folder for photos and files." },
  { title: "Feminization Training 101", emoji: "💄", tag: "Training", img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&q=80", desc: "Voice training, posture, walking in heels, and daily exercises to embrace your feminine self.", content: "Feminization is a journey. Here are daily practices:\n\n1. Voice: Practice speaking from your head voice, not chest. YouTube has great tutorials. Start with 10 minutes daily.\n\n2. Posture: Shoulders back, chin slightly up, smaller steps. Practice in front of a mirror.\n\n3. Walking: Cross your feet slightly when walking for a feminine gait. Heels force this naturally.\n\n4. Skincare: Moisturize daily, exfoliate weekly. Smooth skin is feminine skin.\n\n5. Body Hair: Shave or wax regularly. Start with legs and arms — the feeling is incredible.\n\n6. Makeup: Start with foundation, mascara, and lip gloss. YouTube tutorials are your best friend.\n\n7. Consistency: 15 minutes of practice daily beats 2 hours once a week." },
  { title: "Finding Your Sissy Community", emoji: "💬", tag: "Community", img: "https://images.unsplash.com/photo-1543807535-eceef0bc6599?w=400&q=80", desc: "How to connect with like-minded people safely — online and in person.", content: "Community makes all the difference:\n\n1. Online First: Join verified communities like Sissy Fantasy Island where members are screened.\n\n2. Safety: Never share personal info until you trust someone. Use your sissy name.\n\n3. Events: Start with online meetups before in-person events. Our community hosts both.\n\n4. Mentors: Find someone experienced who can guide you. Our Inner Circle offers mentorship.\n\n5. Boundaries: It's okay to say no. A good community respects boundaries always.\n\n6. Give Back: Once you're comfortable, help newcomers. We all started somewhere.\n\n7. Red Flags: Avoid anyone who pressures you, asks for money, or doesn't respect your privacy." },
  { title: "Event Etiquette: What to Expect", emoji: "🎉", tag: "Events", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=80", desc: "First time at a sissy event? Here's everything you need to know about dress code, consent, and having fun.", content: "Your first event can be nerve-wracking. Here's what to know:\n\n1. Dress Code: Most events have a theme. When in doubt, go with lingerie + heels or a cute outfit.\n\n2. Consent: Always ask before touching anyone. 'No' is a complete sentence.\n\n3. Arrive Early: Less crowded, easier to settle in and meet the hosts.\n\n4. Bring a Friend: If possible, go with someone you trust for the first time.\n\n5. Hydrate: Drink water. Events are long and exciting — take care of yourself.\n\n6. Safe Word: Know the event's safe word or signal. Usually it's 'RED'.\n\n7. Have Fun: Everyone is there for the same reason. You belong. Enjoy yourself." },
];

const FAQS = [
  { q: "What is a Sissy Card?", a: "Your official membership card for Sissy Fantasy Island. It includes your unique member ID, QR code, and grants you access to our private community and events. It's a one-time purchase — no subscriptions, no recurring charges." },
  { q: "How do I receive my card?", a: "You choose: (1) Email delivery — we send your digital card directly to your inbox. (2) Anonymous code — we give you a download code with no email required. You stay completely anonymous. (3) Physical card — shipped in a plain, unmarked envelope." },
  { q: "Is this 100% discreet?", a: "Yes. Billing shows as 'SFI Digital Services'. No explicit descriptions on any bank statements. Anonymous code option requires zero personal info. Physical cards ship in plain packaging with no branding." },
  { q: "Why are the prices what they are?", a: "Each card is individually generated with unique security features. Pricing covers: identity verification, secure card generation, encrypted delivery, lifetime community access, event priority, and ongoing platform maintenance. There are no hidden fees or recurring charges." },
  { q: "Can I attend events without a card?", a: "Yes, events have separate tickets. However, card holders get priority access and discounted rates on all events." },
  { q: "Is the community safe?", a: "Absolutely. All members are verified. We have active moderation, zero tolerance for harassment, and strict privacy rules. What happens in the community stays in the community." },
  { q: "Do you ship internationally?", a: "Yes. Physical cards ship worldwide in discreet, plain packaging. Delivery takes 5-14 business days depending on location." },
  { q: "Can I upgrade my card later?", a: "Yes. You only pay the difference between your current tier and the new one." },
];

const POLICIES = [
  { title: "Privacy Policy", icon: "🔒", desc: "We never share, sell, or expose member data. All communications are encrypted. Anonymous options available for every purchase." },
  { title: "Refund Policy", icon: "💰", desc: "Digital cards are non-refundable once the code is generated. Physical cards can be refunded if returned unopened within 14 days." },
  { title: "Delivery Policy", icon: "📦", desc: "Digital: Instant to 1 hour. Physical: 5-14 business days. All physical items ship in plain, unmarked packaging." },
  { title: "Community Rules", icon: "📜", desc: "Zero tolerance for harassment, doxxing, or sharing member info. Violations result in permanent ban with no refund." },
];

function BtcConfirmForm() {
  const [form, setForm] = useState({ email: "", tier: "Standard Sissy Card", txid: "", delivery: "email" });
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="btc-confirm-card">
        <div className="email-success">✅ Payment received! Your card will be delivered within 1 hour.</div>
      </div>
    );
  }

  return (
    <form className="btc-confirm-card" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
      <h3>Confirm Your BTC Payment</h3>
      <select value={form.tier} onChange={(e) => setForm({ ...form, tier: e.target.value })} className="form-input form-select">
        <option value="Standard Sissy Card">💳 Standard Sissy Card — $300</option>
        <option value="Gold Sissy Card">👑 Gold Sissy Card — $500</option>
        <option value="Diamond Sissy Card">💎 Diamond Sissy Card — $800</option>
        <option value="Community Access">💬 Community Access — $150</option>
        <option value="Inner Circle">🔐 Inner Circle — $350</option>
      </select>
      <select value={form.delivery} onChange={(e) => setForm({ ...form, delivery: e.target.value })} className="form-input form-select">
        <option value="email">📧 Deliver to my email</option>
        <option value="anonymous">🔒 Anonymous code (no email needed)</option>
      </select>
      {form.delivery === "email" && (
        <input type="email" placeholder="Your email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="form-input" />
      )}
      <input type="text" placeholder="BTC Transaction ID (optional)" value={form.txid} onChange={(e) => setForm({ ...form, txid: e.target.value })} className="form-input" />
      <button type="submit" className="buy-btn donate-btn">Confirm Payment</button>
      <p className="donate-note">We'll verify on-chain and deliver within 1 hour</p>
    </form>
  );
}

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hey! 💕 Welcome to Sissy Fantasy Island. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  function handleSend(e) {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { from: "user", text: input }]);
    const q = input.toLowerCase();
    setInput("");
    setTimeout(() => {
      let reply = "Thanks for your message! For faster support, reach us at comeandsee@gmail.com or WhatsApp (415) 305-3689.";
      if (q.includes("card")) reply = "Our Sissy Cards start at $300 (Standard), $500 (Gold), and $800 (Diamond). All one-time payments with lifetime access. Want me to help you choose?";
      else if (q.includes("ship") || q.includes("deliver")) reply = "Digital cards are delivered within 1 hour. Physical cards ship in 5-14 business days in plain, unmarked packaging.";
      else if (q.includes("anon") || q.includes("discreet") || q.includes("private")) reply = "We offer anonymous codes — no email needed. Billing shows as 'SFI Digital Services'. Total privacy guaranteed.";
      else if (q.includes("event") || q.includes("party")) reply = "Our next event is the Trans & Sex Party in Las Vegas, August 15-16, 2026. Card holders get priority access!";
      else if (q.includes("refund")) reply = "Digital cards are non-refundable once generated. Physical cards can be returned unopened within 14 days.";
      else if (q.includes("community") || q.includes("join")) reply = "Community Access is $150 (one-time). Inner Circle is $350 for the exclusive group. Both include lifetime access.";
      setMessages((m) => [...m, { from: "bot", text: reply }]);
    }, 800);
  }

  return (
    <>
      <button className="chat-toggle" onClick={() => setOpen(!open)}>{open ? "✕" : "💬"}</button>
      {open && (
        <div className="chat-window">
          <div className="chat-header"><span>💬 Support</span></div>
          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg chat-msg-${m.from === "bot" ? "bot" : "user"}`}>{m.text}</div>
            ))}
          </div>
          <form className="chat-input-bar" onSubmit={handleSend}>
            <input className="chat-input" placeholder="Type a message..." value={input} onChange={(e) => setInput(e.target.value)} />
            <button type="submit" className="chat-send">➤</button>
          </form>
        </div>
      )}
    </>
  );
}

function ShippingTracker() {
  const [orderId, setOrderId] = useState("");
  const [result, setResult] = useState(null);

  function handleTrack(e) {
    e.preventDefault();
    if (!orderId.trim()) return;
    setResult({
      id: orderId,
      status: "In Transit",
      shipped: "2 days ago",
      eta: "3-5 business days",
      carrier: "Discreet Express",
    });
  }

  return (
    <div className="checker">
      <form className="checker-form" onSubmit={handleTrack}>
        <input type="text" placeholder="Enter order ID (e.g. ORD-XXXXX)" value={orderId} onChange={(e) => setOrderId(e.target.value)} className="form-input" />
        <button type="submit" className="buy-btn donate-btn" style={{ maxWidth: 200 }}>Track</button>
      </form>
      {result && (
        <div className="tracker-result">
          <div className="tracker-header">
            <span>📦</span>
            <strong>{result.status}</strong>
          </div>
          <div className="tracker-details">
            <div><span>Order:</span><strong>{result.id}</strong></div>
            <div><span>Shipped:</span><strong>{result.shipped}</strong></div>
            <div><span>ETA:</span><strong>{result.eta}</strong></div>
            <div><span>Carrier:</span><strong>{result.carrier}</strong></div>
          </div>
          <div className="tracker-bar"><div className="tracker-progress"></div></div>
        </div>
      )}
    </div>
  );
}

function CardChecker() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);

  function handleCheck(e) {
    e.preventDefault();
    if (!code.trim()) return;
    if (code.startsWith("SFI-")) {
      setResult({ valid: true, tier: code.length > 16 ? "Diamond" : code.length > 12 ? "Gold" : "Standard", status: "Active", since: "2025" });
    } else {
      setResult({ valid: false });
    }
  }

  return (
    <div className="checker">
      <form className="checker-form" onSubmit={handleCheck}>
        <input type="text" placeholder="Enter card code (e.g. SFI-XXXX-XXXX)" value={code} onChange={(e) => setCode(e.target.value)} className="form-input" />
        <button type="submit" className="buy-btn donate-btn" style={{ maxWidth: 200 }}>Verify</button>
      </form>
      {result && (
        <div className={`checker-result ${result.valid ? "checker-valid" : "checker-invalid"}`}>
          {result.valid ? (
            <>
              <span>✅</span>
              <div>
                <strong>Card Active</strong>
                <p>Tier: {result.tier} · Status: {result.status} · Member since {result.since}</p>
              </div>
            </>
          ) : (
            <>
              <span>❌</span>
              <div>
                <strong>Card Not Found</strong>
                <p>This code is not in our system. Check for typos or contact support.</p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function SissyNameGenerator() {
  const firsts = ["Princess", "Sissy", "Baby", "Mistress", "Dolly", "Candy", "Velvet", "Cherry", "Bambi", "Pixie", "Honey", "Lola", "Coco", "Bella", "Rosie", "Kitty", "Bunny", "Daisy", "Mimi", "Trixie"];
  const lasts = ["Sparkle", "Blush", "Doll", "Kitten", "Lace", "Silk", "Petal", "Blossom", "Glitter", "Cupcake", "Devine", "Valentine", "Luxe", "Charm", "Frost", "Moon", "Star", "Dream", "Rose", "Honey"];
  const [name, setName] = useState("");

  function generate() {
    const f = firsts[Math.floor(Math.random() * firsts.length)];
    const l = lasts[Math.floor(Math.random() * lasts.length)];
    setName(`${f} ${l}`);
  }

  return (
    <div className="name-gen">
      <div className="name-gen-result">{name || "Click generate to find your name"}</div>
      <button className="buy-btn donate-btn" onClick={generate} style={{ maxWidth: 300, margin: "0 auto" }}>Generate My Sissy Name</button>
    </div>
  );
}

export default function Home() {
  const [verified, setVerified] = useState(false);
  const [payModal, setPayModal] = useState(null);
  const [payMethod, setPayMethod] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [giftCode, setGiftCode] = useState("");
  const [giftImage, setGiftImage] = useState(null);
  const [giftSubmitted, setGiftSubmitted] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [openBlog, setOpenBlog] = useState(null);

  function openPayModal(name, price) {
    setPayModal({ tier: name, price });
    setPayMethod(null);
  }

  function handleGiftSubmit(e) {
    e.preventDefault();
    if (!giftCode && !giftImage) return alert("Please enter a gift card code or upload an image.");
    setGiftSubmitted(true);
  }

  useEffect(() => {
    if (sessionStorage.getItem("age_verified") === "true") setVerified(true);
  }, []);

  function handleAgeConfirm(yes) {
    if (yes) { setVerified(true); sessionStorage.setItem("age_verified", "true"); }
  }

  if (!verified) {
    return (
      <div className="age-gate-overlay">
        <div className="age-gate-box">
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔞</div>
          <h2>Are you 18 or older?</h2>
          <p>This site contains adult content. You must be 18+ to enter.</p>
          <div className="age-gate-buttons">
            <button className="age-btn age-btn-yes" onClick={() => handleAgeConfirm(true)}>Yes, I&apos;m 18+</button>
            <button className="age-btn age-btn-no" onClick={() => window.location.href = "https://google.com"}>No</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrap">
      {/* Animated Background */}
      <div className="bg-animation">
        <div className="bg-orb bg-orb-1"></div>
        <div className="bg-orb bg-orb-2"></div>
        <div className="bg-orb bg-orb-3"></div>
      </div>

      <div className="container">
        {/* Navigation */}
        <nav className="nav">
          <div className="nav-logo">SFI 💕</div>
          <div className={`nav-links ${mobileNav ? "nav-links-open" : ""}`}>
            <a href="#cards" onClick={() => setMobileNav(false)}>Cards</a>
            <a href="#dungeon" onClick={() => setMobileNav(false)}>Dungeon</a>
            <a href="#events" onClick={() => setMobileNav(false)}>Events</a>
            <a href="#shop" onClick={() => setMobileNav(false)}>Shop</a>
            <a href="#guides" onClick={() => setMobileNav(false)}>Guides</a>
            <a href="#contact" onClick={() => setMobileNav(false)}>Contact</a>
          </div>
          <button className="nav-toggle" onClick={() => setMobileNav(!mobileNav)}>{mobileNav ? "✕" : "☰"}</button>
        </nav>

        {/* Hero */}
        <section className="hero">
          <Image src="/hero.jpg" alt="" fill className="hero-bg-img" priority />
          <div className="hero-overlay"></div>
          <h1>SISSY FANTASY ISLAND</h1>
          <p className="tagline">The official membership platform for the trans & sissy community. Get your card. Join the community. Live your truth.</p>
          <div className="hero-badges">
            <span className="hero-badge">💳 Official Sissy Cards</span>
            <span className="hero-badge">💬 Private Community</span>
            <span className="hero-badge">🎉 Exclusive Events</span>
            <span className="hero-badge">🔒 100% Discreet</span>
          </div>
        </section>

        {/* Live Stats */}
        <section className="section">
          <div className="stats-bar">
            <div className="stat-item"><span className="stat-num">2,847</span><span className="stat-label">Active Members</span></div>
            <div className="stat-item"><span className="stat-num">47</span><span className="stat-label">Countries</span></div>
            <div className="stat-item"><span className="stat-num">3,200+</span><span className="stat-label">Cards Issued</span></div>
            <div className="stat-item"><span className="stat-num">12</span><span className="stat-label">Events Hosted</span></div>
          </div>
        </section>

        {/* Sissy Name Generator */}
        <section className="section">
          <h2>✨ Sissy Name Generator</h2>
          <p className="section-subtitle">Find your perfect sissy name. Click generate until you find the one.</p>
          <SissyNameGenerator />
        </section>

        {/* Sissy Card Preview */}
        <section className="section">
          <h2>💳 The Official Sissy Card</h2>
          <p className="section-subtitle">Your identity. Your community. One card.</p>
          <div className="card-preview">
            <div className="card-mockup">
              <div className="card-mockup-inner">
                <div className="card-logo">SISSY FANTASY ISLAND</div>
                <div className="card-chip">💎</div>
                <div className="card-number">SFI-XXXX-XXXX-XXXX</div>
                <div className="card-details">
                  <div><span>MEMBER</span><strong>Your Sissy Name</strong></div>
                  <div><span>TIER</span><strong>Gold</strong></div>
                  <div><span>VALID</span><strong>Lifetime</strong></div>
                </div>
              </div>
            </div>
            <div className="card-delivery-info">
              <h3>How You Receive Your Card</h3>
              <div className="delivery-options">
                <div className="delivery-option">
                  <span>📧</span>
                  <div>
                    <strong>Email Delivery</strong>
                    <p>Digital card sent directly to your inbox within 1 hour</p>
                  </div>
                </div>
                <div className="delivery-option">
                  <span>🔒</span>
                  <div>
                    <strong>Anonymous Code</strong>
                    <p>Get a download code — no email, no name, total anonymity</p>
                  </div>
                </div>
                <div className="delivery-option">
                  <span>📦</span>
                  <div>
                    <strong>Physical Card (Gold & Diamond)</strong>
                    <p>Holographic card shipped in plain, unmarked envelope</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sissy Card Tiers */}
        <section className="section" id="cards">
          <h2>Choose Your Card</h2>
          <p className="section-subtitle">One-time payment. Lifetime access. No subscriptions.</p>
          <div className="tickets-grid">
            {SISSY_CARDS.map((t) => (
              <div key={t.name} className="ticket-card" style={{ borderTop: `4px solid ${t.color}` }}>
                {t.popular && <div className="popular-badge">🔥 MOST POPULAR</div>}
                <div className="ticket-emoji">{t.emoji}</div>
                <h3>{t.name}</h3>
                <div className="price" style={{ color: t.color }}>
                  ${t.price}<span className="price-period"> one-time</span>
                </div>
                <ul className="perks">
                  {t.perks.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <div className="why-price">
                  <strong>Why this price?</strong>
                  <p>{t.why}</p>
                </div>
                <button
                  className="buy-btn"
                  style={{ background: `linear-gradient(135deg, ${t.color}, #6f42c1)` }}
                  onClick={() => openPayModal(t.name, t.price)}
                >
                  Get Card — ${t.price}
                </button>
                <div className="payment-icons">
                  <span className="btc-badge">₿ Bitcoin</span>
                  <span className="btc-badge" style={{ background: "rgba(245,169,184,0.15)", borderColor: "rgba(245,169,184,0.3)", color: "#f5a9b8" }}>🎁 Gift Card</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Community */}
        <section className="section">
          <h2>💬 Join The Community</h2>
          <p className="section-subtitle">Connect with trans women, sissies, and admirers in a safe, private space.</p>
          <div className="community-grid">
            {COMMUNITY_TIERS.map((t) => (
              <div key={t.name} className="community-card" style={{ borderTop: `4px solid ${t.color}` }}>
                <div className="ticket-emoji">{t.emoji}</div>
                <h3>{t.name}</h3>
                <div className="price" style={{ color: t.color }}>
                  ${t.price}<span className="price-period"> one-time</span>
                </div>
                <ul className="perks">
                  {t.perks.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <div className="why-price">
                  <strong>Why this price?</strong>
                  <p>{t.why}</p>
                </div>
                <button
                  className="buy-btn"
                  style={{ background: `linear-gradient(135deg, ${t.color}, #6f42c1)` }}
                  onClick={() => openPayModal(t.name, t.price)}
                >
                  Join — ${t.price}
                </button>
                <div className="payment-icons">
                  <span className="btc-badge">₿ Bitcoin</span>
                  <span className="btc-badge" style={{ background: "rgba(245,169,184,0.15)", borderColor: "rgba(245,169,184,0.3)", color: "#f5a9b8" }}>🎁 Gift Card</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mobile Dungeon */}
        <section className="section" id="dungeon">
          <div className="dungeon-banner">
            <div className="dungeon-emoji">🚚</div>
            <h2>Mobile Dungeon — We Come To You</h2>
            <p>A fully equipped, discreet mobile dungeon delivered and set up at your location. Hotel room, private residence, or event space — we bring the experience to you.</p>
            <div className="dungeon-features">
              <div className="dungeon-feature"><span>🔗</span><p>Full equipment setup (crosses, benches, restraints)</p></div>
              <div className="dungeon-feature"><span>🔒</span><p>100% discreet — unmarked vehicle, plain packaging</p></div>
              <div className="dungeon-feature"><span>📅</span><p>Book any day — available 7 days a week</p></div>
              <div className="dungeon-feature"><span>🌍</span><p>Available nationwide — we travel to you</p></div>
              <div className="dungeon-feature"><span>⏰</span><p>Setup in under 1 hour, teardown included</p></div>
              <div className="dungeon-feature"><span>💰</span><p>Starting from $500 per session</p></div>
            </div>
            <div className="dungeon-cta">
              <p>To book your Mobile Dungeon session:</p>
              <div className="dungeon-contact">
                <a href="mailto:comeandsee@gmail.com" className="buy-btn donate-btn" style={{ maxWidth: 300, display: "inline-block", textDecoration: "none", textAlign: "center" }}>📧 Email to Book</a>
                <a href="tel:+14153053689" className="buy-btn" style={{ maxWidth: 300, display: "inline-block", background: "linear-gradient(135deg, #5bcefa, #6f42c1)", textDecoration: "none", textAlign: "center" }}>📞 (415) 305-3689</a>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="section" id="events">
          <h2>🎉 Upcoming Events</h2>
          <p className="section-subtitle">Exclusive parties and meetups for our community. Card holders get priority access.</p>
          <div className="events-grid">
            {UPCOMING_EVENTS.map((ev) => (
              <div key={ev.name} className="event-card">
                <div className="event-card-img">
                  <Image src={ev.img} alt={ev.name} fill style={{ objectFit: "cover" }} />
                </div>
                <div className="event-card-body">
                  <div className="event-emoji">{ev.emoji}</div>
                  <h3>{ev.name}</h3>
                  <div className="event-details-list">
                    <span>📅 {ev.date}</span>
                    <span>📍 {ev.location}</span>
                    <span>💰 {ev.price}</span>
                  </div>
                  <div className={`event-status ${ev.status === "Tickets Available" ? "event-status-live" : ""}`}>
                    {ev.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Shop — External Links */}
        <section className="section" id="shop">
          <h2>🛍️ Shop Costumes & Toys</h2>
          <p className="section-subtitle">We've curated the best products from trusted retailers. Click to shop directly.</p>
          <div className="shop-grid">
            {EXTERNAL_SHOPS.map((item) => (
              <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer" className="shop-card-link">
                <div className="shop-card">
                  <div className="shop-card-img">
                    <Image src={item.img} alt={item.name} fill style={{ objectFit: "cover" }} />
                  </div>
                  <div className="shop-card-content">
                    <div className="shop-category">{item.category}</div>
                    <h3>{item.name}</h3>
                    <p>{item.desc}</p>
                    <div className="shop-cta">Shop Now →</div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Blog / Guides */}
        <section className="section" id="guides">
          <h2>📚 Guides & Tips</h2>
          <p className="section-subtitle">Resources to help you on your journey. Click to read full article.</p>
          <div className="blog-grid">
            {BLOG_POSTS.map((post, i) => (
              <div key={i} className={`blog-card ${openBlog === i ? "blog-card-open" : ""}`} onClick={() => setOpenBlog(openBlog === i ? null : i)}>
                <div className="blog-card-img">
                  <Image src={post.img} alt={post.title} fill style={{ objectFit: "cover" }} />
                </div>
                <div className="blog-card-body">
                  <div className="blog-tag">{post.tag}</div>
                  <h3>{post.title}</h3>
                  <p>{post.desc}</p>
                  {openBlog === i ? (
                    <div className="blog-content">{post.content.split("\n\n").map((para, j) => <p key={j}>{para}</p>)}</div>
                  ) : (
                    <span className="blog-cta">Read More →</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="section">
          <h2>💬 Member Reviews</h2>
          <p className="section-subtitle">Real feedback from verified members.</p>
          <div className="testimonials-grid">
            {[
              { name: "Sissy Bella", tier: "Gold", text: "The card arrived in a plain envelope, totally discreet. The community is amazing — I finally found my people." },
              { name: "Anonymous", tier: "Standard", text: "Used the anonymous code option. No email, no trace. Exactly what I needed. The community chat is active 24/7." },
              { name: "Princess Jade", tier: "Diamond", text: "The concierge service is real. They booked my event tickets and even helped me find outfits. Worth every penny." },
              { name: "Sissy Mika", tier: "Gold", text: "I was nervous at first but the verification process made me feel safe. Everyone in the group is respectful and supportive." },
            ].map((t, i) => (
              <div key={i} className="testimonial-card">
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <strong>{t.name}</strong>
                  <span className="testimonial-role">{t.tier} Member</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Policies */}
        <section className="section">
          <h2>📋 Our Policies</h2>
          <div className="policies-grid">
            {POLICIES.map((p) => (
              <div key={p.title} className="policy-card">
                <span className="policy-icon">{p.icon}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Shipping Tracker */}
        <section className="section">
          <h2>📦 Track Your Order</h2>
          <p className="section-subtitle">Enter your order ID to check shipping status.</p>
          <ShippingTracker />
        </section>

        {/* Referral Program */}
        <section className="section">
          <div className="referral-banner">
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🎁</div>
            <h2>Refer a Sissy, Get $50 Off</h2>
            <p>Share your referral code with a friend. When they purchase any card, you both get $50 off your next purchase.</p>
            <div className="referral-steps">
              <div className="referral-step"><span>1</span><p>Share your unique referral code</p></div>
              <div className="referral-step"><span>2</span><p>Your friend buys any Sissy Card</p></div>
              <div className="referral-step"><span>3</span><p>You both get $50 off</p></div>
            </div>
            <p className="referral-note">Get your referral code after purchasing any card. Contact us to claim your discount.</p>
          </div>
        </section>

        {/* Card Status Checker */}
        <section className="section">
          <h2>🔍 Check Card Status</h2>
          <p className="section-subtitle">Enter your card code to verify it's active.</p>
          <CardChecker />
        </section>

        {/* FAQ */}
        <section className="section">
          <h2>❓ FAQ</h2>
          <div className="faq-list">
            {FAQS.map((f, i) => (
              <div key={i} className="faq-item" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div className="faq-q">
                  {f.q}
                  <span>{openFaq === i ? "−" : "+"}</span>
                </div>
                {openFaq === i && <div className="faq-a">{f.a}</div>}
              </div>
            ))}
          </div>
        </section>

        {/* Email Signup */}
        <section className="section">
          <div className="email-section">
            <h2>📧 Stay Updated</h2>
            <p>Get notified about new events, community updates, and exclusive drops.</p>
            {emailSent ? (
              <div className="email-success">✅ You're in! Check your inbox.</div>
            ) : (
              <form className="email-form" onSubmit={(e) => { e.preventDefault(); if (email) setEmailSent(true); }}>
                <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="email-input" />
                <button type="submit" className="email-btn">Join</button>
              </form>
            )}
          </div>
        </section>

        {/* Contact */}
        <section className="section" id="contact">
          <h2>📬 Contact</h2>
          <div className="social-bar">
            <a href="mailto:comeandsee@gmail.com" className="social-link">
              <span>📧</span> comeandsee@gmail.com
            </a>
            <a href="https://wa.me/14153053689" target="_blank" rel="noopener" className="social-link">
              <span>💬</span> WhatsApp
            </a>
            <a href="tel:+14153053689" className="social-link">
              <span>📞</span> (415) 305-3689
            </a>
            <a href="https://t.me/tshungkathy10" target="_blank" rel="noopener" className="social-link">
              <span>✈️</span> Telegram
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="trust-badges">
            <span>🔒 SSL Encrypted</span>
            <span>💳 Discreet Billing</span>
            <span>✅ Verified Platform</span>
            <span>🌍 Worldwide Shipping</span>
          </div>
          <p>💕 Sissy Fantasy Island 2026 — Be who you really are 💕</p>
          <p>Discreet billing · One-time payments · Worldwide · All sales final</p>
          <Link href="/terms" className="terms-link">Terms of Service</Link>
        </footer>
      </div>

      {/* Live Chat Widget */}
      <ChatWidget />

      {/* Payment Modal */}
      {payModal && (
        <div className="age-gate-overlay" onClick={() => setPayModal(null)}>
          <div className="pay-modal" onClick={(e) => e.stopPropagation()}>
            <button className="pay-modal-close" onClick={() => setPayModal(null)}>✕</button>
            <h2>{payModal.tier}</h2>
            <div className="pay-modal-total">${payModal.price} — one-time payment</div>

            {!payMethod && (
              <div className="pay-options">
                <button className="pay-option" onClick={() => setPayMethod("btc")}>
                  <span>₿</span> Pay with Bitcoin
                </button>
                <button className="pay-option" onClick={() => setPayMethod("gift")}>
                  <span>🎁</span> Redeem Gift Card
                </button>
              </div>
            )}

            {payMethod === "gift" && (
              <div className="pay-btc-content">
                {giftSubmitted ? (
                  <div className="email-success" style={{ textAlign: "center", padding: "1.5rem 0" }}>
                    ✅ Gift card submitted! We'll verify and deliver your card within 1 hour.
                  </div>
                ) : (
                  <form onSubmit={handleGiftSubmit} className="gift-form">
                    <h3 style={{ textAlign: "center", marginBottom: "0.5rem" }}>Redeem Gift Card</h3>
                    <p style={{ opacity: 0.6, textAlign: "center", fontSize: "0.9rem", marginBottom: "1rem" }}>Enter your code or upload a photo of your gift card</p>
                    <input type="text" placeholder="Gift card code" value={giftCode} onChange={(e) => setGiftCode(e.target.value)} className="form-input" />
                    <div className="gift-upload">
                      <label className="gift-upload-label">
                        <span>{giftImage ? `📎 ${giftImage.name}` : "📷 Upload gift card image"}</span>
                        <input type="file" accept="image/*" onChange={(e) => setGiftImage(e.target.files[0] || null)} style={{ display: "none" }} />
                      </label>
                    </div>
                    <button type="submit" className="buy-btn donate-btn">Submit for Verification</button>
                    <p className="donate-note">We'll verify and deliver within 1 hour</p>
                  </form>
                )}
                <button className="pay-back" onClick={() => { setPayMethod(null); setGiftSubmitted(false); setGiftCode(""); setGiftImage(null); }}>← Back</button>
              </div>
            )}

            {payMethod === "btc" && (
              <div className="pay-btc-content">
                <div className="btc-qr-card">
                  <div className="btc-qr-wrap">
                    <QRCodeSVG value={`bitcoin:${BTC_WALLET}`} size={160} bgColor="#ffffff" fgColor="#0a0a0f" level="H" />
                  </div>
                  <p className="btc-label">Scan to send BTC</p>
                  <div className="btc-address">
                    <code>{BTC_WALLET}</code>
                    <button className="btc-copy" onClick={() => navigator.clipboard.writeText(BTC_WALLET)}>Copy</button>
                  </div>
                </div>
                <BtcConfirmForm />
                <button className="pay-back" onClick={() => setPayMethod(null)}>← Back</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

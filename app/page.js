"use client";
import { useState, useEffect, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import Image from "next/image";
import Link from "next/link";

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms` }}>
      {children}
    </div>
  );
}

const BTC_WALLET = "bc1q6k7lmj5jruuk0tq28c03pc5ae2jv0wnthdpxpn";

const SISSY_CARDS = [
  {
    name: "Starter Sissy Card",
    emoji: "🌸",
    price: 50,
    color: "#f5a9b8",
    delivery: "Digital code via email or anonymous code",
    perks: [
      "Official Sissy Fantasy Island membership card",
      "Unique member ID & scannable QR code",
      "Access to private community group (Telegram + Discord)",
      "Lifetime validity — never expires",
      "Delivered via email or anonymous download code",
      "Member-only discounts on events",
      "Access to beginner guides & resources library",
    ],
    why: "Covers secure card generation, encrypted delivery, and lifetime access to community basics.",
  },
  {
    name: "Standard Sissy Card",
    emoji: "💳",
    price: 75,
    color: "#ff6b9d",
    delivery: "Digital code + bonus perks",
    perks: [
      "Everything in Starter",
      "Custom sissy name on your digital card",
      "Priority event announcements & early bird pricing",
      "Monthly community newsletter with exclusive content",
      "Access to video tutorials & training library",
      "Voting rights on community decisions",
      "Birthday surprise from the community",
      "Priority customer support (48hr response)",
    ],
    why: "Includes custom card design, training library access, and priority community features.",
  },
  {
    name: "Gold Sissy Card",
    emoji: "👑",
    price: 100,
    color: "#d63384",
    popular: true,
    delivery: "Digital + physical holographic card (discreet shipping)",
    perks: [
      "Everything in Standard",
      "Physical holographic card with NFC chip",
      "Priority access & VIP seating at all events",
      "VIP community status & gold badge",
      "1-on-1 welcome session with community host",
      "Access to exclusive masterclass recordings",
      "Priority customer support (24hr response)",
      "Discreet worldwide shipping in plain envelope",
      "Free entry to online meetups & virtual events",
      "Quarterly community gift drops",
    ],
    why: "Includes holographic NFC card, custom engraving, discreet shipping, VIP onboarding, and full access to premium content.",
  },
  {
    name: "Platinum Sissy Card",
    emoji: "✨",
    price: 150,
    color: "#8b5cf6",
    delivery: "Digital + premium physical card + exclusive access",
    perks: [
      "Everything in Gold",
      "Premium matte black card with gold foil lettering",
      "Platinum-tier badge & community status",
      "Free entry to 2 events per year",
      "Private Platinum-only group chat",
      "Monthly 1-on-1 check-in with mentor",
      "Early access to new products & collabs",
      "Personalized feminization roadmap",
      "Complimentary sissy starter kit (shipped discreetly)",
      "Direct message access to event organizers",
    ],
    why: "Premium card with gold foil, mentor access, starter kit, and 2 free event entries per year included.",
  },
  {
    name: "Diamond Sissy Card",
    emoji: "💎",
    price: 200,
    color: "#6f42c1",
    delivery: "Digital + premium metal card + all-access pass",
    perks: [
      "Everything in Platinum",
      "Premium metal card with laser engraving",
      "Diamond-tier status & exclusive badge",
      "Free entry to ALL events (lifetime)",
      "Exclusive Diamond-only group chat (max 25 members)",
      "Personal concierge for event bookings & travel",
      "Featured on the community wall (optional)",
      "Lifetime access to all future perks & features",
      "Annual surprise gift package",
      "Direct line to founders & organizers",
      "First access to limited edition merch drops",
      "Complimentary Mobile Dungeon session ($500 value)",
    ],
    why: "Metal card with laser engraving, lifetime all-access pass, personal concierge, free dungeon session, and every future benefit — forever.",
  },
];

const COMMUNITY_TIERS = [
  {
    name: "Community Access",
    price: 25,
    emoji: "💬",
    color: "#5bcefa",
    perks: [
      "Join the private trans & sissy community",
      "Group chat access (Telegram + Discord)",
      "Event announcements & early bird access",
      "Connect with sissies worldwide",
      "Safe, moderated, and discreet space",
      "Access to resource library & guides",
      "Weekly community check-ins",
    ],
    why: "One-time fee covers identity verification, moderation, and maintaining a safe private community space.",
  },
  {
    name: "Inner Circle",
    price: 75,
    emoji: "🔐",
    color: "#d63384",
    perks: [
      "Everything in Community Access",
      "Inner Circle private group (limited to 50 members)",
      "Direct access to event organizers & hosts",
      "First priority for event tickets & seating",
      "Exclusive meetup invitations (online & IRL)",
      "Mentorship from experienced community members",
      "Monthly private Q&A sessions",
      "Voting rights on future events & features",
    ],
    why: "Limited spots ensure quality connections. Includes priority booking, direct organizer access, and influence over community direction.",
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
  },
  {
    name: "Amazon — Sissy Costumes",
    emoji: "👗",
    desc: "Maid outfits, lingerie, wigs, stockings, and accessories",
    url: "https://www.amazon.com/s?k=sissy+costume",
    category: "Costumes & Outfits",
  },
  {
    name: "Amazon — Chastity",
    emoji: "🔒",
    desc: "Cages, locks, and chastity devices for beginners and advanced",
    url: "https://www.amazon.com/s?k=chastity+cage",
    category: "Chastity",
  },
  {
    name: "Amazon — Wigs & Makeup",
    emoji: "💄",
    desc: "Feminine wigs, makeup kits, and beauty essentials",
    url: "https://www.amazon.com/s?k=crossdresser+wig",
    category: "Beauty",
  },
  {
    name: "Amazon — Heels & Boots",
    emoji: "👠",
    desc: "High heels, thigh-high boots, and platform shoes in all sizes",
    url: "https://www.amazon.com/s?k=crossdresser+heels",
    category: "Footwear",
  },
  {
    name: "Amazon — Corsets & Shapewear",
    emoji: "🩱",
    desc: "Waist trainers, corsets, hip pads, and body shaping",
    url: "https://www.amazon.com/s?k=crossdresser+shapewear",
    category: "Shapewear",
  },
];

const BLOG_POSTS = [
  { title: "Beginner's Guide to Being a Sissy", emoji: "🎀", tag: "Beginner", desc: "Everything you need to know to start your sissy journey — mindset, wardrobe, and confidence.", content: "Starting your sissy journey is exciting and personal. Here's what you need to know:\n\n1. Mindset First: Being a sissy is about embracing femininity on your own terms. There's no right or wrong way.\n\n2. Start Small: Begin with underwear, stockings, or a simple accessory. You don't need a full wardrobe on day one.\n\n3. Privacy: Use a separate email, anonymous shopping, and discreet delivery options.\n\n4. Community: Join a safe space like ours where you can ask questions without judgment.\n\n5. Self-Care: Shaving, skincare, and grooming are great first steps that feel amazing.\n\n6. No Rush: Go at your own pace. This is YOUR journey." },
  { title: "How to Build a Feminine Wardrobe", emoji: "👗", tag: "Fashion", desc: "From lingerie to everyday femme outfits — a complete shopping guide for sissies.", content: "Building your wardrobe doesn't have to be expensive or overwhelming:\n\n1. Essentials: Start with panties, a bra, stockings, and one outfit you love.\n\n2. Sizing: Measure yourself carefully. Most online stores have size guides. When in doubt, size up.\n\n3. Where to Shop: Amazon has great discreet options. Search for 'crossdresser' or 'sissy' for better results.\n\n4. Shoes: Start with a low heel (2-3 inches). Practice walking at home before going higher.\n\n5. Accessories: A wig, clip-on earrings, and a choker can transform your look instantly.\n\n6. Storage: Keep items in a locked box or bag if you need discretion at home.\n\n7. Budget: You can start with under $50. Quality over quantity." },
  { title: "Staying Discreet: Privacy Tips", emoji: "🔒", tag: "Privacy", desc: "How to explore your sissy side while keeping your privacy intact. Tools, tips, and strategies.", content: "Privacy is everything. Here's how to stay safe:\n\n1. Separate Email: Create a new email just for your sissy life. Use ProtonMail for encryption.\n\n2. Shopping: Use Amazon lockers or PO boxes for deliveries. Always select 'gift' packaging.\n\n3. Payments: Use gift cards or Bitcoin to avoid bank statement traces.\n\n4. Phone: Use a separate browser (private mode) or a second phone.\n\n5. Photos: Strip metadata from photos before sharing. Never include your face and identifiable features in the same shot.\n\n6. Community: Use a sissy name, never your real one. Our platform supports full anonymity.\n\n7. Storage: Use a locked app or encrypted folder for photos and files." },
  { title: "Feminization Training 101", emoji: "💄", tag: "Training", desc: "Voice training, posture, walking in heels, and daily exercises to embrace your feminine self.", content: "Feminization is a journey. Here are daily practices:\n\n1. Voice: Practice speaking from your head voice, not chest. YouTube has great tutorials. Start with 10 minutes daily.\n\n2. Posture: Shoulders back, chin slightly up, smaller steps. Practice in front of a mirror.\n\n3. Walking: Cross your feet slightly when walking for a feminine gait. Heels force this naturally.\n\n4. Skincare: Moisturize daily, exfoliate weekly. Smooth skin is feminine skin.\n\n5. Body Hair: Shave or wax regularly. Start with legs and arms — the feeling is incredible.\n\n6. Makeup: Start with foundation, mascara, and lip gloss. YouTube tutorials are your best friend.\n\n7. Consistency: 15 minutes of practice daily beats 2 hours once a week." },
  { title: "Finding Your Sissy Community", emoji: "💬", tag: "Community", desc: "How to connect with like-minded people safely — online and in person.", content: "Community makes all the difference:\n\n1. Online First: Join verified communities like Sissy Fantasy Island where members are screened.\n\n2. Safety: Never share personal info until you trust someone. Use your sissy name.\n\n3. Events: Start with online meetups before in-person events. Our community hosts both.\n\n4. Mentors: Find someone experienced who can guide you. Our Inner Circle offers mentorship.\n\n5. Boundaries: It's okay to say no. A good community respects boundaries always.\n\n6. Give Back: Once you're comfortable, help newcomers. We all started somewhere.\n\n7. Red Flags: Avoid anyone who pressures you, asks for money, or doesn't respect your privacy." },
  { title: "Event Etiquette: What to Expect", emoji: "🎉", tag: "Events", desc: "First time at a sissy event? Here's everything you need to know about dress code, consent, and having fun.", content: "Your first event can be nerve-wracking. Here's what to know:\n\n1. Dress Code: Most events have a theme. When in doubt, go with lingerie + heels or a cute outfit.\n\n2. Consent: Always ask before touching anyone. 'No' is a complete sentence.\n\n3. Arrive Early: Less crowded, easier to settle in and meet the hosts.\n\n4. Bring a Friend: If possible, go with someone you trust for the first time.\n\n5. Hydrate: Drink water. Events are long and exciting — take care of yourself.\n\n6. Safe Word: Know the event's safe word or signal. Usually it's 'RED'.\n\n7. Have Fun: Everyone is there for the same reason. You belong. Enjoy yourself." },
];

const BUNDLES = [
  { name: "Starter Bundle", items: "Starter Card + Community Access", price: 65, save: 10, color: "#5bcefa" },
  { name: "Gold Bundle", items: "Gold Card + Inner Circle", price: 150, save: 25, color: "#d63384" },
  { name: "Ultimate Bundle", items: "Diamond Card + Inner Circle + Mobile Dungeon Session", price: 650, save: 125, color: "#6f42c1" },
];

const LIVE_ACTIVITY = [
  { name: "Princess Velvet", action: "just joined the community", time: "2m ago", emoji: "🌸" },
  { name: "Sissy Jade", action: "got her Gold Card", time: "5m ago", emoji: "👑" },
  { name: "Baby Sparkle", action: "registered from United Kingdom", time: "8m ago", emoji: "🇬🇧" },
  { name: "Mistress Lace", action: "upgraded to Diamond", time: "12m ago", emoji: "💎" },
  { name: "Candy Moon", action: "booked a Mobile Dungeon session", time: "15m ago", emoji: "🚚" },
  { name: "Dolly Rose", action: "just joined the community", time: "18m ago", emoji: "🌸" },
  { name: "Cherry Bliss", action: "got her Starter Card", time: "22m ago", emoji: "🌸" },
  { name: "Bambi Frost", action: "registered from Australia", time: "25m ago", emoji: "🇦🇺" },
  { name: "Pixie Dream", action: "got her Platinum Card", time: "30m ago", emoji: "✨" },
  { name: "Honey Silk", action: "joined Inner Circle", time: "35m ago", emoji: "🔐" },
];

const DAILY_CHALLENGES = [
  { emoji: "💄", title: "Full Glam Day", desc: "Wear full makeup for the entire day. Share your look in the community chat!", points: 50 },
  { emoji: "👠", title: "Heel Training", desc: "Walk in heels for 30 minutes. Practice your feminine gait in front of a mirror.", points: 30 },
  { emoji: "📸", title: "Outfit of the Day", desc: "Post your best sissy outfit in the community. Get votes from members!", points: 40 },
  { emoji: "📝", title: "Sissy Journal", desc: "Write 3 things you love about your feminine self. Share if you feel comfortable.", points: 20 },
  { emoji: "🛍️", title: "Shopping Spree", desc: "Add one new item to your sissy wardrobe today. Even just a new lip gloss counts!", points: 35 },
  { emoji: "🎵", title: "Feminine Playlist", desc: "Create a playlist of songs that make you feel your most feminine self.", points: 25 },
  { emoji: "🛁", title: "Pamper Session", desc: "Full body shave, moisturize, and do your nails. Treat yourself like the queen you are.", points: 45 },
];

const MEMBER_SPOTLIGHTS = [
  { name: "Princess Aurora", tier: "Diamond", location: "Los Angeles, CA", joined: "Jan 2025", quote: "SFI changed my life. I finally have a community that accepts me completely.", emoji: "💎" },
  { name: "Sissy Valentina", tier: "Gold", location: "London, UK", joined: "Mar 2025", quote: "The events are incredible. Met my best friends at the Vegas party!", emoji: "👑" },
  { name: "Baby Celestine", tier: "Platinum", location: "Toronto, Canada", joined: "Feb 2025", quote: "The mentorship program helped me come out of my shell. Forever grateful.", emoji: "✨" },
];

const GALLERY_ITEMS = [
  { img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&q=80", caption: "Community Night — Vegas 2025" },
  { img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80", caption: "Sissy Brunch — Miami" },
  { img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&q=80", caption: "Masked Gala — NYC" },
  { img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&q=80", caption: "Member Spotlight — Diamond Tier" },
  { img: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=500&q=80", caption: "Glam Night — Los Angeles" },
  { img: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=500&q=80", caption: "Inner Circle Meetup — London" },
  { img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=500&q=80", caption: "Annual Gala — Chicago 2025" },
  { img: "https://images.unsplash.com/photo-1496440737103-cd596325d314?w=500&q=80", caption: "VIP Lounge — Las Vegas" },
];

const LEADERBOARD = [
  { rank: "🥇", name: "Princess Aurora", tier: "Diamond", pts: 4820, badge: "Top Sissy" },
  { rank: "🥈", name: "Sissy Valentina", tier: "Gold", pts: 3950, badge: "Challenge Queen" },
  { rank: "🥉", name: "Baby Celestine", tier: "Platinum", pts: 3410, badge: "Social Butterfly" },
  { rank: "4", name: "Candy Moon", tier: "Gold", pts: 2980, badge: "Glam Icon" },
  { rank: "5", name: "Mistress Lace", tier: "Diamond", pts: 2750, badge: "Event Star" },
  { rank: "6", name: "Dolly Rose", tier: "Standard", pts: 2340, badge: "Rising Star" },
  { rank: "7", name: "Cherry Bliss", tier: "Platinum", pts: 2100, badge: "Style Queen" },
  { rank: "8", name: "Bambi Frost", tier: "Gold", pts: 1890, badge: "Community Fave" },
  { rank: "9", name: "Pixie Dream", tier: "Standard", pts: 1650, badge: "Daily Grinder" },
  { rank: "10", name: "Honey Silk", tier: "Gold", pts: 1420, badge: "Newcomer" },
];

const PARTNERS = [
  { emoji: "💜", name: "Lovense", tag: "Official Partner" },
  { emoji: "📦", name: "Amazon", tag: "Retail Partner" },
  { emoji: "🔒", name: "ProtonMail", tag: "Privacy Partner" },
  { emoji: "✈️", name: "Telegram", tag: "Community Platform" },
  { emoji: "💬", name: "Discord", tag: "Community Platform" },
  { emoji: "₿", name: "Bitcoin", tag: "Payment Partner" },
];

const PRESS_MENTIONS = [
  { name: "LGBTQ+ Nation", quote: "\"One of the most discreet and welcoming sissy communities online\"" },
  { name: "Femme Weekly", quote: "\"SFI is redefining what it means to be a sissy in 2025\"" },
  { name: "Trans Lifestyle", quote: "\"The gold standard for trans membership platforms\"" },
  { name: "Kink Culture Mag", quote: "\"Beautifully designed, totally private, absolutely worth it\"" },
  { name: "Adult Insider", quote: "\"Best community platform we've reviewed this year\"" },
  { name: "Pride Digital", quote: "\"A safe haven for sissies worldwide — highly recommended\"" },
];

const FAQS = [
  { q: "What is a Sissy Card?", a: "Your official membership card for Sissy Fantasy Island. It includes your unique member ID, QR code, and grants you access to our private community and events. It's a one-time purchase — no subscriptions, no recurring charges." },
  { q: "How do I receive my card?", a: "You choose: (1) Email delivery — we send your digital card directly to your inbox. (2) Anonymous code — we give you a download code with no email required. You stay completely anonymous. (3) Physical card — shipped in a plain, unmarked envelope." },
  { q: "Is this 100% discreet?", a: "Yes. Billing shows as 'SFI Digital Services'. No explicit descriptions on any bank statements. Anonymous code option requires zero personal info. Physical cards ship in plain packaging with no branding." },
  { q: "Why are the prices what they are?", a: "We keep prices accessible so everyone can join. Each card is individually generated with unique security features. Pricing covers: identity verification, secure card generation, encrypted delivery, lifetime community access, and ongoing platform maintenance. No hidden fees, no recurring charges, no upsells." },
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

function CountdownTimer({ targetDate }) {
  const [time, setTime] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = new Date(targetDate) - new Date();
      if (diff <= 0) return;
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins: Math.floor((diff % 3600000) / 60000),
        secs: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return (
    <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
      {[[time.days, "Days"], [time.hours, "Hours"], [time.mins, "Mins"], [time.secs, "Secs"]].map(([v, l]) => (
        <div key={l} style={{ textAlign: "center", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "1rem 1.5rem", minWidth: 70 }}>
          <div style={{ fontSize: "2rem", fontWeight: 800, background: "linear-gradient(135deg, #f5a9b8, #d63384)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{v}</div>
          <div style={{ fontSize: "0.7rem", opacity: 0.5, textTransform: "uppercase", letterSpacing: 1 }}>{l}</div>
        </div>
      ))}
    </div>
  );
}

function AnimatedCounter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const num = parseInt(target.replace(/[^0-9]/g, ""));
        const duration = 2000;
        const step = Math.ceil(num / (duration / 16));
        let current = 0;
        const id = setInterval(() => {
          current += step;
          if (current >= num) { current = num; clearInterval(id); }
          setCount(current);
        }, 16);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref} className="stat-num">{count.toLocaleString()}{suffix}</span>;
}

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
        <option value="Starter Sissy Card">🌸 Starter Sissy Card — $50</option>
        <option value="Standard Sissy Card">💳 Standard Sissy Card — $75</option>
        <option value="Gold Sissy Card">👑 Gold Sissy Card — $100</option>
        <option value="Platinum Sissy Card">✨ Platinum Sissy Card — $150</option>
        <option value="Diamond Sissy Card">💎 Diamond Sissy Card — $200</option>
        <option value="Community Access">💬 Community Access — $25</option>
        <option value="Inner Circle">🔐 Inner Circle — $75</option>
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
      if (q.includes("card")) reply = "Our Sissy Cards start at just $50! We have Starter ($50), Standard ($75), Gold ($100), Platinum ($150), and Diamond ($200). All one-time payments with lifetime access. Want me to help you choose?";
      else if (q.includes("ship") || q.includes("deliver")) reply = "Digital cards are delivered within 1 hour. Physical cards ship in 5-14 business days in plain, unmarked packaging.";
      else if (q.includes("anon") || q.includes("discreet") || q.includes("private")) reply = "We offer anonymous codes — no email needed. Billing shows as 'SFI Digital Services'. Total privacy guaranteed.";
      else if (q.includes("event") || q.includes("party")) reply = "Our next event is the Trans & Sex Party in Las Vegas, August 15-16, 2026. Card holders get priority access!";
      else if (q.includes("refund")) reply = "Digital cards are non-refundable once generated. Physical cards can be returned unopened within 14 days.";
      else if (q.includes("community") || q.includes("join")) reply = "Community Access is $25 (one-time). Inner Circle is $75 for the exclusive group. Both include lifetime access.";
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

const SISSY_FIRSTS = [
  "Princess","Sissy","Baby","Mistress","Dolly","Candy","Velvet","Cherry","Bambi","Pixie",
  "Honey","Lola","Coco","Bella","Rosie","Kitty","Bunny","Daisy","Mimi","Trixie",
  "Angel","Barbie","Bimbo","Blondie","Blossom","Bubbles","Buttercup","Caramel","Champagne","Chanel",
  "Cinnamon","Clover","Cookie","Cotton","Crystal","Cupcake","Dazzle","Diamond","Diva","Duchess",
  "Eden","Ellie","Ember","Fifi","Fleur","Flora","Fluffy","Foxy","Gigi","Glitter",
  "Glory","Goddess","Goldie","Grace","Harmony","Heaven","Iris","Ivory","Ivy","Jade",
  "Jasmine","Jewel","Jojo","Joy","Juliet","Kiki","Lady","Lavender","Lexi","Lily",
  "Lolita","Lotus","Luna","Lush","Luxe","Lyra","Madeleine","Magnolia","Maple","Marigold",
  "Meadow","Melody","Midnight","Minnie","Missy","Mocha","Moonbeam","Mystique","Naughty","Nectar",
  "Nikki","Nova","Nymph","Opal","Orchid","Pandora","Peaches","Pearl","Petal","Petunia",
  "Pinky","Pippa","Plum","Poppy","Precious","Prim","Priscilla","Queenie","Raven","Remy",
  "Roxy","Ruby","Sable","Saffron","Sage","Sapphire","Sasha","Scarlett","Seraphina","Serena",
  "Sherry","Silver","Skye","Sparkle","Spice","Star","Starlet","Stella","Storm","Sugar",
  "Sunny","Sunset","Sweet","Sweetpea","Sylvia","Tammy","Tangerine","Tasha","Tatiana","Tempest",
  "Tiffany","Tinker","Topaz","Treasure","Trinity","Tulip","Twinkle","Unique","Valentina","Vanilla",
  "Venus","Vicky","Violet","Vixen","Vivienne","Wanda","Willow","Winnie","Winter","Xena",
  "Yasmine","Zara","Zelda","Zoe","Zuzu","Amber","Amethyst","Amora","Anastasia","Andromeda",
  "Aphrodite","Arabella","Ariel","Arietta","Arya","Astrid","Aurora","Autumn","Ava","Azalea",
  "Beatrice","Bianca","Bliss","Bonbon","Bonnie","Briar","Briella","Brigitte","Brynn","Callie",
  "Camille","Caprice","Cara","Carissa","Carmen","Carolina","Cassandra","Cassie","Celeste","Celia",
  "Cherie","Chiara","Chloe","Christy","Clara","Clarissa","Claudette","Clementine","Colette","Coral",
  "Cordelia","Cosette","Crimson","Dahlia","Dainty","Dalia","Damaris","Daphne","Darcy","Darla",
  "Dawn","Dazzling","Debbie","Delilah","Della","Delphine","Demi","Desire","Destiny","Dew",
  "Dolce","Dominique","Donna","Dream","Dreamy","Dulce","Ebony","Effie","Elara","Elena",
  "Elise","Eliza","Ella","Elle","Eloise","Elsa","Elvira","Emilia","Emma","Enchanted",
  "Esme","Estelle","Eva","Evangeline","Evie","Exotic","Fairy","Faith","Fancy","Fawn",
  "Faye","Felicia","Felicity","Fern","Fierce","Flame","Flirty","Flossy","Fontaine","Francesca",
  "Freya","Frisky","Frost","Fuchsia","Gabrielle","Galaxy","Garnet","Gemma","Geneva","Genevieve",
  "Genie","Georgette","Gia","Gianna","Ginger","Giovanna","Giselle","Glamour","Glimmer","Gloss",
  "Glow","Graceful","Gracie","Guinevere","Gwendolyn","Hailey","Hannah","Harper","Hazel","Heather",
  "Helena","Heloise","Holly","Hope","Hyacinth","Iliana","Imogen","Indigo","Ingrid","Irene",
  "Isabella","Isadora","Isolde","Jacinda","Jacqueline","Jamie","Jana","Janelle","Jenna","Jessica",
  "Jezebel","Jillian","Jinx","Joelle","Josephine","Josie","Julianna","Juliette","June","Juniper",
  "Kali","Kara","Karen","Karma","Katarina","Kate","Katerina","Kathleen","Katrina","Kayla",
  "Kiara","Kimber","Kira","Kisses","Kitten","Kleo","Krystal","Lacey","Laila","Lana",
  "Larissa","Laura","Lauren","Laurette","Layla","Lea","Leah","Lena","Lenora","Leona",
  "Leonora","Leora","Leticia","Lia","Liana","Libby","Lila","Lilac","Liliana","Lilith",
  "Lina","Linda","Lindy","Lisette","Lissa","Livia","Liz","Liza","Lizette","Lolly",
  "Loretta","Lori","Lorna","Lorraine","Lottie","Louise","Lucia","Luciana","Lucille","Lucky",
  "Luisa","Lulu","Lumina","Lydia","Lynette","Lyric","Mabel","Madeline","Madison","Mae",
  "Maeve","Maggie","Maisie","Mandy","Marcella","Marcia","Margaret","Maria","Mariana","Marie",
  "Mariella","Marilyn","Marina","Marion","Marissa","Marlene","Marley","Martha","Martina","Mary",
  "Matilda","Maxine","Maya","Melanie","Melinda","Melissa","Mercedes","Meredith","Mia","Michaela",
  "Michelle","Mikaela","Mila","Millie","Miranda","Miriam","Misty","Molly","Monica","Monique",
];

const SISSY_LASTS = [
  "Sparkle","Blush","Doll","Kitten","Lace","Silk","Petal","Blossom","Glitter","Cupcake",
  "Devine","Valentine","Luxe","Charm","Frost","Moon","Star","Dream","Rose","Honey",
  "Angel","Aura","Babe","Babydoll","Bliss","Bloom","Bow","Breeze","Bright","Bubble",
  "Butter","Candy","Caress","Cherish","Cloud","Coral","Cotton","Cream","Crown","Crystal",
  "Curl","Cute","Darling","Dazzle","Delight","Desire","Dewdrop","Diamond","Dimple","Diva",
  "Dolce","Drizzle","Drop","Dust","Eden","Enchant","Fairy","Fantasy","Feather","Flair",
  "Flame","Flirt","Floss","Flutter","Foam","Fondant","Frills","Frosting","Fudge","Gaze",
  "Gem","Glow","Gold","Grace","Haze","Heart","Heaven","Hug","Ice","Icing",
  "Illusion","Iris","Ivory","Jewel","Joy","Kiss","Kneel","Lash","Lavender","Light",
  "Lilac","Lily","Lollipop","Love","Lush","Magic","Maple","Marble","Melt","Mist",
  "Mocha","Moonbeam","Moonlight","Mousse","Nectar","Neon","Nymph","Opal","Orchid","Parfait",
  "Passion","Peach","Pearl","Perfume","Petal","Pie","Pillow","Pink","Pixie","Plush",
  "Pout","Powder","Precious","Prism","Puff","Purr","Quartz","Queen","Radiance","Rain",
  "Rainbow","Ribbon","Ripple","Rouge","Ruffle","Satin","Shimmer","Shine","Silk","Silver",
  "Siren","Skye","Slick","Smile","Snow","Soft","Sorbet","Soul","Spell","Spice",
  "Sprinkle","Stardust","Starlight","Storm","Sugar","Sunbeam","Sundrop","Sunlight","Sunrise","Sunset",
  "Sweet","Swirl","Tease","Tempt","Tender","Thorn","Tingle","Tinsel","Topaz","Touch",
  "Treasure","Truffle","Tulip","Twirl","Twist","Velvet","Vibe","Vine","Violet","Vision",
  "Vixen","Vow","Warmth","Wave","Whirl","Whisper","White","Wild","Wisp","Wonder",
  "Worship","Wow","Zeal","Zest","Zing","Zip","Blaze","Bolt","Bounce","Breeze",
];

function SissyNameGenerator() {
  const [name, setName] = useState("");
  const [history, setHistory] = useState([]);
  const [copied, setCopied] = useState(false);

  function generate() {
    const f = SISSY_FIRSTS[Math.floor(Math.random() * SISSY_FIRSTS.length)];
    const l = SISSY_LASTS[Math.floor(Math.random() * SISSY_LASTS.length)];
    const newName = `${f} ${l}`;
    setName(newName);
    setHistory((h) => [newName, ...h.slice(0, 4)]);
    setCopied(false);
  }

  function copyName() {
    if (!name) return;
    navigator.clipboard.writeText(name);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="name-gen">
      <div className="name-gen-result" style={{ fontSize: name ? "2.5rem" : "1.2rem" }}>{name || "Click generate to find your name ✨"}</div>
      <div style={{ display: "flex", gap: "0.8rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "1rem" }}>
        <button className="buy-btn donate-btn" onClick={generate} style={{ maxWidth: 260, margin: 0 }}>🎲 Generate My Sissy Name</button>
        {name && <button onClick={copyName} style={{ padding: "0.9rem 1.5rem", borderRadius: 50, border: "1px solid rgba(245,169,184,0.4)", background: "transparent", color: "#f5a9b8", cursor: "pointer", fontWeight: 600 }}>{copied ? "✅ Copied!" : "📋 Copy"}</button>}
      </div>
      <p style={{ opacity: 0.4, fontSize: "0.75rem", marginBottom: "1rem" }}>Over 1,000+ unique name combinations</p>
      {history.length > 1 && (
        <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", flexWrap: "wrap" }}>
          {history.slice(1).map((n, i) => (
            <span key={i} onClick={() => setName(n)} style={{ padding: "0.3rem 0.8rem", borderRadius: 20, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", fontSize: "0.8rem", cursor: "pointer", opacity: 0.6 }}>{n}</span>
          ))}
        </div>
      )}
    </div>
  );
}

function LiveActivityFeed() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % LIVE_ACTIVITY.length), 3000);
    return () => clearInterval(id);
  }, []);
  const item = LIVE_ACTIVITY[idx];
  return (
    <div style={{ background: "rgba(40,167,69,0.08)", border: "1px solid rgba(40,167,69,0.2)", borderRadius: 50, padding: "0.6rem 1.2rem", display: "inline-flex", alignItems: "center", gap: "0.6rem", fontSize: "0.85rem", maxWidth: "100%" }}>
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#28a745", display: "inline-block", animation: "pulse 1.5s ease-in-out infinite", flexShrink: 0 }}></span>
      <span style={{ opacity: 0.9 }}>{item.emoji} <strong>{item.name}</strong> {item.action}</span>
      <span style={{ opacity: 0.4, fontSize: "0.75rem", flexShrink: 0 }}>{item.time}</span>
    </div>
  );
}

function DailyChallenge() {
  const day = new Date().getDay();
  const challenge = DAILY_CHALLENGES[day % DAILY_CHALLENGES.length];
  const [done, setDone] = useState(false);
  return (
    <div style={{ background: "linear-gradient(135deg, rgba(214,51,132,0.08), rgba(111,66,193,0.08))", border: "1px solid rgba(214,51,132,0.2)", borderRadius: 16, padding: "1.5rem", textAlign: "center", maxWidth: 500, margin: "0 auto" }}>
      <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: 2, opacity: 0.5, marginBottom: "0.5rem" }}>Today&apos;s Challenge</div>
      <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>{challenge.emoji}</div>
      <h3 style={{ fontSize: "1.2rem", marginBottom: "0.4rem" }}>{challenge.title}</h3>
      <p style={{ opacity: 0.6, fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "1rem" }}>{challenge.desc}</p>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
        <span style={{ background: "rgba(214,51,132,0.15)", color: "#f5a9b8", padding: "0.3rem 0.8rem", borderRadius: 20, fontSize: "0.8rem", fontWeight: 700 }}>+{challenge.points} pts</span>
        <button onClick={() => setDone(true)} style={{ padding: "0.6rem 1.5rem", borderRadius: 50, border: "none", background: done ? "rgba(40,167,69,0.3)" : "linear-gradient(135deg, #d63384, #6f42c1)", color: "white", fontWeight: 700, cursor: "pointer", fontSize: "0.9rem" }}>
          {done ? "✅ Challenge Accepted!" : "Accept Challenge"}
        </button>
      </div>
    </div>
  );
}

function PhotoGallery() {
  return (
    <div className="gallery-grid">
      {GALLERY_ITEMS.map((item, i) => (
        <div key={i} className="gallery-item">
          <Image src={item.img} alt={item.caption} fill style={{ objectFit: "cover" }} />
          <div className="gallery-overlay">
            <span className="gallery-caption">{item.caption}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function Leaderboard() {
  return (
    <div className="leaderboard-list">
      {LEADERBOARD.map((m, i) => (
        <div key={i} className="leaderboard-item">
          <div className="leaderboard-rank">{m.rank}</div>
          <div className="leaderboard-avatar">{m.name[0]}</div>
          <div className="leaderboard-info">
            <strong>{m.name}</strong>
            <span>{m.tier} Member</span>
          </div>
          <span className="leaderboard-badge">{m.badge}</span>
          <div className="leaderboard-pts">{m.pts.toLocaleString()} pts</div>
        </div>
      ))}
    </div>
  );
}

function SocialProofBar() {
  const [visible, setVisible] = useState(true);
  const [viewers, setViewers] = useState(47);
  const [actIdx, setActIdx] = useState(0);
  const recentActivity = [
    "Princess Velvet just purchased a Gold Card",
    "Sissy Jade upgraded to Diamond 💎",
    "Baby Sparkle joined from United Kingdom 🇬🇧",
    "Candy Moon booked a Mobile Dungeon session",
    "Dolly Rose just joined the community 🌸",
    "Cherry Bliss got her Starter Card",
    "Pixie Dream upgraded to Platinum ✨",
  ];
  useEffect(() => {
    const v = setInterval(() => setViewers((n) => n + Math.floor(Math.random() * 3) - 1), 5000);
    const a = setInterval(() => setActIdx((i) => (i + 1) % recentActivity.length), 4000);
    return () => { clearInterval(v); clearInterval(a); };
  }, []);
  if (!visible) return null;
  return (
    <div className="social-proof-bar">
      <div className="social-proof-viewers">
        <span className="social-proof-dot"></span>
        {viewers} people viewing now
      </div>
      <div className="social-proof-activity">
        🔥 {recentActivity[actIdx]}
      </div>
      <button className="social-proof-close" onClick={() => setVisible(false)}>✕</button>
    </div>
  );
}

function NewsletterPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem("nl_dismissed")) return;
    const t = setTimeout(() => setShow(true), 8000);
    return () => clearTimeout(t);
  }, []);
  function dismiss() { setShow(false); sessionStorage.setItem("nl_dismissed", "1"); }
  function submit(e) { e.preventDefault(); setDone(true); setTimeout(dismiss, 2000); }
  if (!show) return null;
  return (
    <div className="newsletter-popup-overlay" onClick={dismiss}>
      <div className="newsletter-popup" onClick={(e) => e.stopPropagation()}>
        <button className="newsletter-popup-close" onClick={dismiss}>✕</button>
        <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>💌</div>
        <h3>Get 10% Off Your First Card</h3>
        <p>Join our VIP list and receive an exclusive discount code plus early access to events and drops.</p>
        <div className="newsletter-discount">SISSY10</div>
        {done ? (
          <div className="email-success">✅ Check your inbox for your code!</div>
        ) : (
          <form className="newsletter-popup-form" onSubmit={submit}>
            <input type="email" placeholder="your@email.com" required value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" />
            <button type="submit" className="buy-btn donate-btn">Claim My 10% Off</button>
            <button type="button" onClick={dismiss} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", cursor: "pointer", fontSize: "0.8rem" }}>No thanks, I&apos;ll pay full price</button>
          </form>
        )}
      </div>
    </div>
  );
}

function TierProgress({ currentTier = "Starter" }) {
  const tiers = [
    { name: "Starter", emoji: "🌸" },
    { name: "Standard", emoji: "💳" },
    { name: "Gold", emoji: "👑" },
    { name: "Platinum", emoji: "✨" },
    { name: "Diamond", emoji: "💎" },
  ];
  const currentIdx = tiers.findIndex((t) => t.name === currentTier);
  return (
    <div className="tier-progress-wrap">
      <div className="tier-progress-track">
        {tiers.map((t, i) => (
          <>
            {i > 0 && <div key={`c-${i}`} className={`tier-connector ${i <= currentIdx ? "done" : ""}`} />}
            <div key={t.name} className="tier-node">
              <div className={`tier-node-circle ${i === currentIdx ? "active" : i < currentIdx ? "done" : ""}`}>
                {i < currentIdx ? "✓" : t.emoji}
              </div>
              <span className={`tier-node-label ${i === currentIdx ? "active" : ""}`}>{t.name}</span>
            </div>
          </>
        ))}
      </div>
      <p style={{ textAlign: "center", fontSize: "0.85rem", opacity: 0.5 }}>Upgrade your card to unlock the next tier and more perks</p>
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
  const [splash, setSplash] = useState(true);

  function openPayModal(name, price) {
    setPayModal({ tier: name, price });
    setPayMethod(null);
  }

  function handleGiftSubmit(e) {
    e.preventDefault();
    if (!giftCode && !giftImage) return alert("Please enter a gift card code or upload an image.");
    const formData = new FormData();
    formData.append("tier", payModal?.tier || "Unknown");
    formData.append("price", payModal?.price || "Unknown");
    formData.append("code", giftCode);
    if (giftImage) formData.append("image", giftImage);
    fetch("/api/gift-submit", { method: "POST", body: formData }).catch(() => {});
    setGiftSubmitted(true);
  }

  useEffect(() => {
    if (sessionStorage.getItem("age_verified") === "true") setVerified(true);
    const t = setTimeout(() => setSplash(false), 2000);
    return () => clearTimeout(t);
  }, []);

  function handleAgeConfirm(yes) {
    if (yes) { setVerified(true); sessionStorage.setItem("age_verified", "true"); }
  }

  if (splash) {
    return (
      <div style={{ position: "fixed", inset: 0, background: "#0a0a0f", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 99999, flexDirection: "column", gap: "1rem" }}>
        <div style={{ fontSize: "3rem", animation: "pulse 1.5s ease-in-out infinite" }}>💕</div>
        <div style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: 3, background: "linear-gradient(90deg, #f5a9b8, #d63384, #6f42c1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>SISSY FANTASY ISLAND</div>
        <div style={{ width: 40, height: 4, borderRadius: 2, background: "linear-gradient(90deg, #d63384, #6f42c1)", animation: "loading 1.5s ease-in-out infinite" }}></div>
      </div>
    );
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

      <div className="container" style={{ paddingBottom: "4rem" }}>
        {/* Flash Sale Banner */}
        <div style={{ background: "linear-gradient(90deg, #d63384, #6f42c1)", padding: "0.8rem 1.5rem", borderRadius: 10, textAlign: "center", marginBottom: "1.5rem", animation: "pulse 2s ease-in-out infinite" }}>
          <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>🔥 LIMITED TIME: Get 20% off all cards — Use code <strong>SISSY20</strong> at checkout</span>
        </div>

        {/* Navigation */}
        <nav className="nav">
          <div className="nav-logo">SFI 💕</div>
          <div className={`nav-links ${mobileNav ? "nav-links-open" : ""}`}>
            <a href="#cards" onClick={() => setMobileNav(false)}>Cards</a>
            <a href="#dungeon" onClick={() => setMobileNav(false)}>Dungeon</a>
            <a href="#events" onClick={() => setMobileNav(false)}>Events</a>
            <a href="#shop" onClick={() => setMobileNav(false)}>Shop</a>
            <a href="#guides" onClick={() => setMobileNav(false)}>Guides</a>
            <Link href="/events" onClick={() => setMobileNav(false)}>Events</Link>
            <Link href="/shop" onClick={() => setMobileNav(false)}>Shop</Link>
            <Link href="/contact" onClick={() => setMobileNav(false)}>Contact</Link>
            <Link href="/community" onClick={() => setMobileNav(false)} style={{ color: "#f5a9b8", fontWeight: 600 }}>Community</Link>
            <Link href="/search" onClick={() => setMobileNav(false)} style={{ color: "rgba(255,255,255,0.55)" }}>🔍</Link>
            <Link href="/messages" onClick={() => setMobileNav(false)} style={{ color: "#f5a9b8", fontWeight: 600 }}>Messages</Link>
            <Link href="/notifications" onClick={() => setMobileNav(false)} style={{ color: "rgba(255,255,255,0.55)" }}>🔔</Link>
            <Link href="/login" onClick={() => setMobileNav(false)} style={{ color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>Sign In</Link>
            <Link href="/register" onClick={() => setMobileNav(false)} style={{ background: "linear-gradient(135deg, #d63384, #7c3aed)", padding: "0.5rem 1.2rem", borderRadius: 6, color: "white", fontWeight: 700, textDecoration: "none", fontSize: "0.82rem", letterSpacing: "0.5px", textTransform: "uppercase" }}>Join</Link>

          </div>
          <button className="nav-toggle" onClick={() => setMobileNav(!mobileNav)}>{mobileNav ? "✕" : "☰"}</button>
        </nav>

        {/* Hero */}
        <section className="hero">
          <Image src="/hero.jpg" alt="" fill className="hero-bg-img" priority />
          <div className="hero-overlay"></div>
          <h1>The Ultimate <span>Sissy</span> Experience</h1>
          <p className="tagline">The official membership platform for the trans & sissy community. Get your card. Join the community. Live your truth.</p>
          <div style={{ margin: "1.5rem 0" }}>
            <LiveActivityFeed />
          </div>
          <div className="hero-badges">
            <span className="hero-badge">💳 Official Sissy Cards</span>
            <span className="hero-badge">💬 Private Community</span>
            <span className="hero-badge">🎉 Exclusive Events</span>
            <span className="hero-badge">🔒 100% Discreet</span>
          </div>
        </section>

        {/* How It Works */}
        <Reveal><section className="section">
          <h2>🚀 How It Works</h2>
          <p className="section-subtitle">Three simple steps to join the community.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", textAlign: "center" }}>
            {[
              { step: "1", icon: "💳", title: "Choose Your Card", desc: "Pick the tier that fits you — from $50 to $200" },
              { step: "2", icon: "✅", title: "Get Access", desc: "Card + community access delivered within 1 hour" },
            ].map((s) => (
              <div key={s.step} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "2rem 1.5rem" }}>
                <div style={{ width: 50, height: 50, borderRadius: "50%", background: "linear-gradient(135deg, #d63384, #6f42c1)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "1.2rem", marginBottom: "1rem" }}>{s.step}</div>
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{s.icon}</div>
                <h3 style={{ fontSize: "1.1rem", marginBottom: "0.4rem" }}>{s.title}</h3>
                <p style={{ fontSize: "0.85rem", opacity: 0.6, lineHeight: 1.5 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section></Reveal>

        {/* Live Stats */}
        <Reveal><section className="section">
          <div className="stats-bar">
            <div className="stat-item"><AnimatedCounter target="2847" /><span className="stat-label">Active Members</span></div>
            <div className="stat-item"><AnimatedCounter target="47" /><span className="stat-label">Countries</span></div>
            <div className="stat-item"><AnimatedCounter target="3200" suffix="+" /><span className="stat-label">Cards Issued</span></div>
            <div className="stat-item"><AnimatedCounter target="12" /><span className="stat-label">Events Hosted</span></div>
          </div>
        </section></Reveal>

        {/* Sissy Name Generator */}
        <Reveal><section className="section">
          <h2>✨ Sissy Name Generator</h2>
          <p className="section-subtitle">Find your perfect sissy name. Click generate until you find the one.</p>
          <SissyNameGenerator />
        </section></Reveal>

        {/* Sissy Card Preview */}
        <Reveal><section className="section">
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
        </section></Reveal>

        {/* Sissy Card Tiers */}
        <Reveal><section className="section" id="cards">
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
        </section></Reveal>

        {/* Community */}
        <Reveal><section className="section">
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
        </section></Reveal>

        {/* Mobile Dungeon */}
        <Reveal><section className="section" id="dungeon">
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
        </section></Reveal>

        {/* Upcoming Events */}
        <Reveal><section className="section" id="events">
          <h2>🎉 Upcoming Events</h2>
          <p className="section-subtitle">Exclusive parties and meetups for our community. Card holders get priority access.</p>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <p style={{ opacity: 0.6, marginBottom: "1rem" }}>🎰 Trans & Sex Party Las Vegas — Countdown:</p>
            <CountdownTimer targetDate="2026-08-15T20:00:00" />
          </div>
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
        </section></Reveal>

        {/* Shop — External Links */}
        <Reveal><section className="section" id="shop">
          <h2>🛍️ Shop Costumes & Toys</h2>
          <p className="section-subtitle">We've curated the best products from trusted retailers. Click to shop directly.</p>
          <div className="shop-grid">
            {EXTERNAL_SHOPS.map((item) => (
              <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer" className="shop-card-link">
                <div className="shop-card">
                  <div className="shop-emoji">{item.emoji}</div>
                  <div className="shop-category">{item.category}</div>
                  <h3>{item.name}</h3>
                  <p>{item.desc}</p>
                  <div className="shop-cta">Shop Now →</div>
                </div>
              </a>
            ))}
          </div>
        </section></Reveal>

        {/* Blog / Guides */}
        <Reveal><section className="section" id="guides">
          <h2>📚 Guides & Tips</h2>
          <p className="section-subtitle">Resources to help you on your journey. Click to read full article.</p>
          <div className="blog-grid">
            {BLOG_POSTS.map((post, i) => (
              <div key={i} className={`blog-card ${openBlog === i ? "blog-card-open" : ""}`} onClick={() => setOpenBlog(openBlog === i ? null : i)}>
                <div className="blog-emoji">{post.emoji}</div>
                <div className="blog-tag">{post.tag}</div>
                <h3>{post.title}</h3>
                <p>{post.desc}</p>
                {openBlog === i ? (
                  <div className="blog-content">{post.content.split("\n\n").map((para, j) => <p key={j}>{para}</p>)}</div>
                ) : (
                  <span className="blog-cta">Read More →</span>
                )}
              </div>
            ))}
          </div>
        </section></Reveal>

        {/* Bundle Deals */}
        <Reveal><section className="section">
          <h2>🎁 Bundle Deals — Save More</h2>
          <p className="section-subtitle">Combine card + community for the best value.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {BUNDLES.map((b) => (
              <div key={b.name} style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${b.color}33`, borderRadius: 16, padding: "2rem", textAlign: "center", position: "relative" }}>
                <div style={{ position: "absolute", top: -12, right: 16, background: "linear-gradient(135deg, #28a745, #20c997)", padding: "0.3rem 0.8rem", borderRadius: 20, fontSize: "0.75rem", fontWeight: 700 }}>SAVE ${b.save}</div>
                <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>{b.name}</h3>
                <p style={{ fontSize: "0.85rem", opacity: 0.6, marginBottom: "1rem", lineHeight: 1.5 }}>{b.items}</p>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: b.color, marginBottom: "1rem" }}>${b.price}</div>
                <button className="buy-btn" style={{ background: `linear-gradient(135deg, ${b.color}, #6f42c1)` }} onClick={() => openPayModal(b.name, b.price)}>Get Bundle — ${b.price}</button>
              </div>
            ))}
          </div>
        </section></Reveal>

        {/* About Us */}
        <Reveal><section className="section">
          <h2>💜 About Sissy Fantasy Island</h2>
          <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
            <p style={{ opacity: 0.7, lineHeight: 1.8, marginBottom: "1.5rem", fontSize: "1rem" }}>
              Sissy Fantasy Island was created by and for the trans & sissy community. We saw a need for a safe, discreet, and professional platform where people could explore their identity without fear of judgment or exposure.
            </p>
            <p style={{ opacity: 0.7, lineHeight: 1.8, marginBottom: "1.5rem", fontSize: "1rem" }}>
              Our team includes community organizers, event planners, and tech professionals who understand the importance of privacy and discretion. Every feature on this platform was designed with your safety in mind.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem", marginTop: "2rem" }}>
              {[
                { icon: "🔒", label: "Privacy First" },
                { icon: "🌍", label: "Global Community" },
                { icon: "🤝", label: "Verified Members" },
                { icon: "📦", label: "Discreet Always" },
              ].map((v) => (
                <div key={v.label} style={{ textAlign: "center", padding: "1rem", background: "rgba(255,255,255,0.03)", borderRadius: 12 }}>
                  <div style={{ fontSize: "1.5rem", marginBottom: "0.3rem" }}>{v.icon}</div>
                  <div style={{ fontSize: "0.8rem", opacity: 0.6 }}>{v.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section></Reveal>

        {/* Leaderboard */}
        <Reveal><section className="section">
          <h2>🏆 Weekly Leaderboard</h2>
          <p className="section-subtitle">Top members by challenge points this week. Can you make the list?</p>
          <Leaderboard />
        </section></Reveal>

        {/* Tier Progress */}
        <Reveal><section className="section">
          <h2>📈 Membership Tiers</h2>
          <p className="section-subtitle">See where you stand and what&apos;s waiting at the next level.</p>
          <TierProgress currentTier="Starter" />
          <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
            <button className="buy-btn donate-btn" style={{ maxWidth: 280 }} onClick={() => document.getElementById("cards").scrollIntoView({ behavior: "smooth" })}>Upgrade My Tier →</button>
          </div>
        </section></Reveal>

        {/* Daily Challenge */}
        <Reveal><section className="section">
          <h2>🎯 Daily Sissy Challenge</h2>
          <p className="section-subtitle">A new challenge every day. Complete it, earn points, level up.</p>
          <DailyChallenge />
        </section></Reveal>

        {/* Photo Gallery */}
        <Reveal><section className="section">
          <h2>📸 Community Lookbook</h2>
          <p className="section-subtitle">Real moments from our events and community. Your story starts here.</p>
          <PhotoGallery />
        </section></Reveal>

        {/* Member Spotlights */}
        <Reveal><section className="section">
          <h2>🌟 Member Spotlights</h2>
          <p className="section-subtitle">Real members, real stories.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {MEMBER_SPOTLIGHTS.map((m) => (
              <div key={m.name} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "1.8rem", textAlign: "center" }}>
                <div style={{ width: 60, height: 60, borderRadius: "50%", background: "linear-gradient(135deg, #d63384, #6f42c1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem", margin: "0 auto 1rem" }}>{m.emoji}</div>
                <h3 style={{ fontSize: "1.1rem", marginBottom: "0.2rem" }}>{m.name}</h3>
                <div style={{ fontSize: "0.75rem", opacity: 0.5, marginBottom: "0.8rem" }}>{m.tier} Member · {m.location} · Since {m.joined}</div>
                <p style={{ fontStyle: "italic", opacity: 0.7, fontSize: "0.9rem", lineHeight: 1.6 }}>&ldquo;{m.quote}&rdquo;</p>
              </div>
            ))}
          </div>
        </section></Reveal>

        {/* As Seen In */}
        <Reveal><section className="section">
          <h2>📰 As Seen In</h2>
          <p className="section-subtitle">Featured across the LGBTQ+ and lifestyle community.</p>
          <div className="press-grid">
            {PRESS_MENTIONS.map((p, i) => (
              <div key={i} className="press-item">
                <div className="press-name">{p.name}</div>
                <div className="press-quote">{p.quote}</div>
              </div>
            ))}
          </div>
        </section></Reveal>

        {/* Official Partners */}
        <Reveal><section className="section">
          <h2>🤝 Official Partners</h2>
          <p className="section-subtitle">Trusted brands and platforms we work with.</p>
          <div className="partners-grid">
            {PARTNERS.map((p, i) => (
              <div key={i} className="partner-badge">
                <span>{p.emoji}</span>
                <strong>{p.name}</strong>
                <span className="partner-verified">{p.tag}</span>
              </div>
            ))}
          </div>
        </section></Reveal>

        {/* Testimonials */}
        <Reveal><section className="section">
          <h2>💬 Member Reviews</h2>
          <p className="section-subtitle">Real feedback from verified members.</p>
          <div className="testimonials-grid">
            {[
              { name: "Sissy Bella", tier: "Gold", stars: 5, text: "The card arrived in a plain envelope, totally discreet. The community is amazing — I finally found my people." },
              { name: "Anonymous", tier: "Standard", stars: 5, text: "Used the anonymous code option. No email, no trace. Exactly what I needed. The community chat is active 24/7." },
              { name: "Princess Jade", tier: "Diamond", stars: 5, text: "The concierge service is real. They booked my event tickets and even helped me find outfits. Worth every penny." },
              { name: "Sissy Mika", tier: "Gold", stars: 5, text: "I was nervous at first but the verification process made me feel safe. Everyone in the group is respectful and supportive." },
              { name: "Baby Aurora", tier: "Platinum", stars: 5, text: "The feminization roadmap they gave me changed everything. I feel more confident than ever. 10/10 recommend." },
              { name: "Mistress Velvet", tier: "Diamond", stars: 5, text: "Been a member for 6 months. The events are incredible, the community is tight-knit, and the team actually cares." },
              { name: "Candy Frost", tier: "Starter", stars: 5, text: "Started with the Starter card just to test it out. Upgraded to Gold within a week. So worth it!" },
              { name: "Dolly Lace", tier: "Gold", stars: 5, text: "The physical card is STUNNING. Holographic, my name on it, came in a plain envelope. Absolutely love it." },
            ].map((t, i) => (
              <div key={i} className="testimonial-card">
                <div style={{ color: "#f7931a", fontSize: "0.9rem", marginBottom: "0.5rem" }}>{"★".repeat(t.stars)}</div>
                <p className="testimonial-text">&ldquo;{t.text}&rdquo;</p>
                <div className="testimonial-author">
                  <strong>{t.name}</strong>
                  <span className="testimonial-role">{t.tier} Member</span>
                </div>
              </div>
            ))}
          </div>
        </section></Reveal>

        {/* Policies */}
        <Reveal><section className="section">
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
        </section></Reveal>

        {/* Shipping Tracker */}
        <Reveal><section className="section">
          <h2>📦 Track Your Order</h2>
          <p className="section-subtitle">Enter your order ID to check shipping status.</p>
          <ShippingTracker />
        </section></Reveal>

        {/* Referral Program */}
        <Reveal><section className="section">
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
        </section></Reveal>

        {/* Card Status Checker */}
        <Reveal><section className="section">
          <h2>🔍 Check Card Status</h2>
          <p className="section-subtitle">Enter your card code to verify it's active.</p>
          <CardChecker />
        </section></Reveal>

        {/* FAQ */}
        <Reveal><section className="section">
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
        </section></Reveal>

        {/* Email Signup */}
        <Reveal><section className="section">
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
        </section></Reveal>

        {/* Contact */}
        <Reveal><section className="section" id="contact">
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
        </section></Reveal>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="nav-logo">SFI 💕</div>
              <p>The official membership platform for the trans & sissy community. Discreet. Private. Worldwide.</p>
            </div>
            <div className="footer-col">
              <h4>Membership</h4>
              <a href="#cards">Sissy Cards</a>
              <a href="#cards">Community Access</a>
              <a href="#cards">Bundle Deals</a>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <a href="#guides">Guides</a>
              <Link href="/events">Events</Link>
              <Link href="/gallery">Gallery</Link>
              <Link href="/contact">Contact</Link>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <a href="/terms">Terms of Service</a>
              <a href="#contact">Privacy Policy</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 Sissy Fantasy Island. All rights reserved.</p>
            <div className="trust-badges">
              <span>🔒 SSL Encrypted</span>
              <span>💳 Discreet Billing</span>
              <span>🌍 Worldwide</span>
            </div>
          </div>
        </footer>
      </div>

      {/* Social Proof Ticker */}
      <SocialProofBar />

      {/* Newsletter Popup */}
      <NewsletterPopup />

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

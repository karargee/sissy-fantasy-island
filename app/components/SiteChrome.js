"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { EVENT } from "@/lib/event";
import s from "@/app/home.module.css";

export function FlagRule() {
  return <div className={s.flagRule} aria-hidden="true"><span /><span /><span /><span /><span /></div>;
}

// onHome: links to homepage sections use "#x" instead of "/#x".
export function SiteHeader({ onHome = false, extra = null }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const h = (id) => (onHome ? `#${id}` : `/#${id}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    [h("night"), "The Night"],
    [h("rooms"), "Rooms"],
    [h("tickets"), "Tickets"],
    ["/shop", "Boutique"],
    ["/past-parties", "Past Parties"],
    [h("faq"), "FAQ"],
  ];

  return (
    <header className={`${s.header} ${scrolled ? s.headerScrolled : ""}`}>
      <div className={`${s.wrap} ${s.headerInner}`}>
        <Link href="/" className={s.brand}>{EVENT.name}</Link>
        <nav aria-label="Main">
          <ul className={`${s.navLinks} ${open ? s.navOpen : ""}`}>
            {nav.map(([href, label]) => (
              <li key={href}><Link href={href} onClick={() => setOpen(false)}>{label}</Link></li>
            ))}
          </ul>
        </nav>
        <div className={s.headerActions}>
          {extra}
          <Link href={h("tickets")} className={`${s.btn} ${s.btnPrimary} ${s.btnSmall}`}>Tickets</Link>
          <button className={s.menuBtn} onClick={() => setOpen((o) => !o)} aria-expanded={open}>
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className={s.footer}>
      <div className={s.wrap}>
        <div className={s.footerTop}>
          <div className={s.footerBrand}>{EVENT.name}</div>
          <ul className={s.footerLinks}>
            <li><Link href="/#tickets">Tickets</Link></li>
            <li><Link href="/shop">Boutique</Link></li>
            <li><Link href="/past-parties">Past Parties</Link></li>
            <li><Link href="/code-of-conduct">Code of Conduct</Link></li>
            <li><Link href="/privacy">Privacy</Link></li>
            <li><Link href="/terms">Terms</Link></li>
            <li><Link href="/#contact">Contact</Link></li>
          </ul>
        </div>
        <div className={s.footerBottom}>
          <span>© 2026 {EVENT.name}. Strictly 18+.</span>
          <span>{EVENT.dateLabel} · {EVENT.city}</span>
        </div>
      </div>
    </footer>
  );
}

// Same gate and storage key as the homepage, for pages people can land on directly.
export function AgeGate({ children }) {
  const [ok, setOk] = useState(null);
  useEffect(() => {
    let v = false;
    try { v = sessionStorage.getItem("age_verified") === "true"; } catch {}
    setOk(v);
  }, []);
  if (ok === null) return <div className={s.page} />;
  if (ok) return children;
  return (
    <div className={s.page}>
      <FlagRule />
      <main className={s.gate}>
        <div className={s.gateInner}>
          <div className={s.eyebrow}>{EVENT.name} · {EVENT.shortDate}</div>
          <h1 className={s.gateTitle}>This site is for adults only.</h1>
          <p className={s.gateText}>You must be 18 or older to enter. By continuing you confirm that you are of legal age where you live.</p>
          <div className={s.gateActions}>
            <button
              className={`${s.btn} ${s.btnPrimary}`}
              onClick={() => { try { sessionStorage.setItem("age_verified", "true"); } catch {} setOk(true); }}
            >
              I&apos;m 18 or older
            </button>
            <a className={`${s.btn} ${s.btnGhost}`} href="https://www.google.com">Leave</a>
          </div>
        </div>
      </main>
    </div>
  );
}

export function PageHero({ eyebrow, title, intro }) {
  return (
    <section className={s.pageHero}>
      <div className={s.wrap}>
        <div className={s.eyebrow}>{eyebrow}</div>
        <h1 className={s.pageTitle}>{title}</h1>
        {intro && <p className={s.sectionIntro}>{intro}</p>}
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { PAST_EVENTS } from "@/lib/past-parties";
import { EVENT } from "@/lib/event";
import { AgeGate, FlagRule, SiteHeader, SiteFooter, PageHero } from "@/app/components/SiteChrome";
import s from "../home.module.css";

export const metadata = {
  title: "Past Parties — LA Trans Party",
  description: "Photos and highlights from previous LA Trans Party nights.",
};

export default function PastParties() {
  return (
    <AgeGate>
      <div className={s.page}>
        <FlagRule />
        <SiteHeader />
        <main>
          <PageHero
            eyebrow="The Archive"
            title={<>Past <em>parties.</em></>}
            intro="Highlights from previous nights. Every guest pictured agreed to be photographed and shared."
            image="https://images.unsplash.com/photo-1516980907201-943c13a8d03c?w=2000&q=75"
            imageAlt="A pink LOVE neon sign glowing in the dark"
          />
          <section className={s.section}>
            <div className={s.wrap}>
              {PAST_EVENTS.length === 0 ? (
                <div className={s.emptyState}>
                  <h2>The first chapter is still to come.</h2>
                  <p>
                    Photos from {EVENT.dateLabel} will be published here after the night, with every guest&apos;s consent.
                  </p>
                  <div style={{ marginTop: 24 }}>
                    <Link href="/#tickets" className={`${s.btn} ${s.btnPrimary}`}>Be part of it</Link>
                  </div>
                </div>
              ) : (
                <div className={s.archiveList}>
                  {PAST_EVENTS.map((ev) => (
                    <article key={ev.slug} id={ev.slug} className={s.archiveEvent}>
                      <div className={s.archiveMeta}>
                        <div className={s.eyebrow} style={{ marginBottom: 0 }}>{ev.date} · {ev.city}</div>
                        <h2 className={s.archiveTitle}>{ev.title}</h2>
                        {ev.theme && <p style={{ color: "var(--accent)", marginBottom: 8 }}>{ev.theme}</p>}
                        {ev.summary && <p style={{ color: "var(--muted)" }}>{ev.summary}</p>}
                      </div>
                      <div className={s.archiveGrid}>
                        {[ev.cover && { src: ev.cover, alt: `${ev.title} cover` }, ...(ev.photos || [])]
                          .filter(Boolean)
                          .map((ph) => (
                            <figure key={ph.src} className={s.galleryItem}>
                              <div className={s.pastMedia}>
                                <Image src={ph.src} alt={ph.alt || ""} fill sizes="(max-width: 980px) 50vw, 400px" className={s.coverImg} />
                              </div>
                            </figure>
                          ))}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>
        <SiteFooter />
      </div>
    </AgeGate>
  );
}

import { EVENT } from "@/lib/event";
import { FlagRule, SiteHeader, SiteFooter, PageHero } from "@/app/components/SiteChrome";
import s from "../home.module.css";

export const metadata = {
  title: "Code of Conduct — LA Trans Party",
  description: "Consent, safety and respect: the rules every guest agrees to at LA Trans Party.",
};

export default function CodeOfConduct() {
  return (
    <div className={s.page}>
      <FlagRule />
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Every guest agrees to this"
          title={<>Code of <em>conduct.</em></>}
          intro="Our parties work because everyone looks after everyone else. Buying a ticket means you agree to these rules. Breaking them means you leave, with no refund."
          image="https://images.unsplash.com/photo-1643232880088-1596644e7e5c?w=2000&q=75"
          imageAlt="Hands loosely tied with soft rope in low light"
        />
        <section className={s.section}>
          <div className={s.wrap}>
            <div className={s.prose}>
              <h2>Consent</h2>
              <ul>
                <li>Ask before you touch anyone, join a scene or watch up close. Consent must be clear and enthusiastic.</li>
                <li>A no, a safe word, a hesitation or silence means stop. Don&apos;t argue, sulk or ask again.</li>
                <li>Consent can be withdrawn at any moment, including mid-scene.</li>
                <li>Someone who is drunk, high or not fully present can&apos;t consent. Neither can you.</li>
              </ul>

              <h2>Safe words</h2>
              <p>The house uses a traffic-light system, and it overrides any personal safe word:</p>
              <ul>
                <li><strong>Green</strong>: all good, keep going.</li>
                <li><strong>Yellow</strong>: slow down and check in.</li>
                <li><strong>Red</strong>: stop immediately. The scene is over.</li>
              </ul>

              <h2>Play</h2>
              <ul>
                <li>Negotiate limits, safe words and aftercare before anything starts. If it wasn&apos;t agreed, it doesn&apos;t happen.</li>
                <li>Play only in designated rooms. The dance floor and bar are for socialising.</li>
                <li>Dungeon monitors wear red armbands. They can pause or end any scene, and their decision is final.</li>
                <li>Wipe down equipment after use. Supplies are in every room.</li>
                <li>Not permitted: blood or anything that breaks skin, fire, knives, breath play, and scat.</li>
                <li>Barriers and lube are free at every station. Use them.</li>
              </ul>

              <h2>Respect</h2>
              <ul>
                <li>Use people&apos;s names and pronouns. If you get it wrong, apologise briefly and move on.</li>
                <li>Trans guests are people, not a fetish. Comments about bodies, &quot;passing&quot; or genitals without invitation get you removed.</li>
                <li>Admirers are welcome when they are respectful, and asked to leave when they aren&apos;t.</li>
                <li>Racism, transphobia, ableism and body-shaming are not tolerated.</li>
              </ul>

              <h2>Privacy</h2>
              <ul>
                <li>No photos or video in play areas, ever. Phones stay in your pocket.</li>
                <li>Don&apos;t share who you saw at the party, or anything about them.</li>
                <li>Our photographer only shoots guests wearing a green wristband, the opt-in sign.</li>
              </ul>

              <h2>If something goes wrong</h2>
              <p>
                Find a monitor in a red armband or come to the front desk, any time, for anything. You won&apos;t be judged,
                and you don&apos;t need proof. The aftercare lounge is open all night if you need somewhere quiet.
              </p>
              <p>
                After the event, you can report anything to{" "}
                <a href={`mailto:${EVENT.contactEmail}`}>{EVENT.contactEmail}</a>. Reports are confidential, and guests who
                break this code are banned from future events.
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

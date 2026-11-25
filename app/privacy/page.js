import { EVENT } from "@/lib/event";
import { FlagRule, SiteHeader, SiteFooter, PageHero } from "@/app/components/SiteChrome";
import s from "../home.module.css";

export const metadata = {
  title: "Privacy Policy — LA Trans Party",
  description: "How LA Trans Party collects, uses and protects your information.",
};

export default function Privacy() {
  return (
    <div className={s.page}>
      <FlagRule />
      <SiteHeader />
      <main>
        <PageHero eyebrow="Last updated November 25, 2026" title={<>Privacy <em>policy.</em></>} />
        <section className={s.section}>
          <div className={`${s.wrap}`}>
            <div className={s.prose}>
              <p>
                Discretion is part of what we offer. This policy explains what we collect when you buy a ticket, shop the
                boutique or contact us, why we collect it, and what you can ask us to do with it.
              </p>

              <h2>What we collect</h2>
              <ul>
                <li><strong>Purchase details:</strong> your name, email address, the tickets or products you bought, and, for boutique orders, your shipping address.</li>
                <li><strong>Payment information:</strong> card payments are handled by Stripe. We never see or store your full card number. For Bitcoin payments we keep the transaction ID you give us.</li>
                <li><strong>Messages:</strong> anything you send through our contact form, live chat, email or WhatsApp.</li>
                <li><strong>Mailing list:</strong> your email address, if you subscribe to updates.</li>
                <li><strong>Basic technical data:</strong> standard server logs (such as IP address and browser type) kept by our hosting provider for security.</li>
              </ul>

              <h2>How we use it</h2>
              <ul>
                <li>To issue tickets, send your confirmation and email the venue address before the event.</li>
                <li>To process and ship boutique orders and handle returns.</li>
                <li>To reply to your messages and manage the guest list on the night.</li>
                <li>To send event updates, only if you subscribed. Every email has an unsubscribe link.</li>
              </ul>
              <p>We do not sell, rent or trade your information, and we never share guest lists.</p>

              <h2>Who we share it with</h2>
              <p>Only the service providers needed to run the event and the shop:</p>
              <ul>
                <li><strong>Stripe</strong>: payment processing.</li>
                <li><strong>Supabase</strong>: our database for orders and messages.</li>
                <li><strong>Resend</strong>: sending confirmation emails.</li>
                <li><strong>Vercel</strong>: website hosting.</li>
                <li><strong>Shipping carriers</strong>: your name and address, for boutique orders only.</li>
              </ul>
              <p>We may also disclose information if the law requires it.</p>

              <h2>Photos at the event</h2>
              <p>
                Photography is not allowed in play areas. Our photographer only shoots guests who opt in, and we only publish
                images of guests who have agreed. If you appear in a photo we published and want it removed, email us and we
                will take it down within 48 hours.
              </p>

              <h2>How long we keep it</h2>
              <p>
                Ticket and order records are kept for as long as we need them for accounting and tax purposes, typically seven
                years. Messages are deleted after twelve months. You can unsubscribe from updates at any time.
              </p>

              <h2>Your rights</h2>
              <p>
                You can ask us for a copy of your information, ask us to correct it, or ask us to delete it, unless we have to
                keep it by law. California residents have these rights under the CCPA. Email{" "}
                <a href={`mailto:${EVENT.contactEmail}`}>{EVENT.contactEmail}</a> and we will respond within 30 days.
              </p>

              <h2>Cookies and storage</h2>
              <p>
                We don&apos;t use advertising or tracking cookies. Your browser stores a small flag confirming you passed the
                age check, and the contents of your shopping bag, both on your own device.
              </p>

              <h2>Contact</h2>
              <p>
                Questions about this policy: <a href={`mailto:${EVENT.contactEmail}`}>{EVENT.contactEmail}</a>.
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

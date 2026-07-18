import Link from "next/link";

export const metadata = {
  title: "Terms of Service — Sissy Fantasy Island",
  description: "Terms of Service, Privacy Policy, and Community Rules for Sissy Fantasy Island.",
};

export default function TermsPage() {
  return (
    <div className="terms-page">
      <div className="container" style={{ maxWidth: 800, padding: "3rem 1.5rem" }}>
        <Link href="/" className="back-link">← Back to Home</Link>
        <h1>Terms of Service</h1>
        <p className="terms-updated">Last updated: January 1, 2026</p>

        <div className="terms-section">
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing or using Sissy Fantasy Island ("SFI", "we", "us", "our"), you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use this platform. You must be 18 years of age or older to access this site.</p>
        </div>

        <div className="terms-section">
          <h2>2. Membership Cards</h2>
          <p>Sissy Fantasy Island membership cards are digital and/or physical products that grant access to our private community, events, and resources. All card purchases are:</p>
          <ul>
            <li>One-time payments — no recurring subscriptions or hidden fees</li>
            <li>Non-transferable — cards are issued to the purchasing member only</li>
            <li>Lifetime validity — cards do not expire</li>
            <li>Subject to community rules — violations may result in revocation without refund</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2>3. Payments & Refunds</h2>
          <p>We accept Bitcoin (BTC) and gift cards as payment methods. All sales are final with the following exceptions:</p>
          <ul>
            <li>Digital cards: Non-refundable once the code has been generated and delivered</li>
            <li>Physical cards: Eligible for refund if returned unopened within 14 days of delivery</li>
            <li>Bundles: Non-refundable once any component has been accessed or delivered</li>
            <li>Events: Ticket refund policies are stated at time of purchase</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2>4. Privacy & Discretion</h2>
          <p>We take your privacy extremely seriously. Our commitments to you:</p>
          <ul>
            <li>We never sell, share, or expose member data to third parties</li>
            <li>All communications are encrypted using industry-standard SSL/TLS</li>
            <li>Billing appears as "SFI Digital Services" on all statements</li>
            <li>Anonymous purchase options are available — no email or personal info required</li>
            <li>Physical cards ship in plain, unmarked packaging with no external branding</li>
            <li>Member data is stored securely and never used for advertising</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2>5. Community Rules</h2>
          <p>All members must adhere to our community standards. The following are strictly prohibited:</p>
          <ul>
            <li>Harassment, bullying, or threatening behavior toward any member</li>
            <li>Sharing, doxxing, or exposing any member's personal information</li>
            <li>Distributing another member's photos or content without explicit consent</li>
            <li>Soliciting money, services, or personal information from other members</li>
            <li>Impersonating other members, staff, or public figures</li>
            <li>Sharing illegal content of any kind</li>
            <li>Minors are strictly prohibited — any suspected underage activity will be reported</li>
          </ul>
          <p style={{ marginTop: "1rem" }}>Violations result in immediate permanent ban with no refund. We reserve the right to remove any member at our discretion.</p>
        </div>

        <div className="terms-section">
          <h2>6. Events</h2>
          <p>SFI events are private, adults-only gatherings. By attending any SFI event, you agree to:</p>
          <ul>
            <li>Respect all attendees' boundaries and consent at all times</li>
            <li>Not photograph or record other attendees without explicit consent</li>
            <li>Follow all venue rules and event-specific guidelines</li>
            <li>Not share event details, locations, or attendee information publicly</li>
            <li>Understand that event tickets are non-refundable unless the event is cancelled by SFI</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2>7. Mobile Dungeon Services</h2>
          <p>Mobile Dungeon sessions are professional adult entertainment services. All sessions require:</p>
          <ul>
            <li>Proof of age (18+) before any session is confirmed</li>
            <li>Full payment in advance via Bitcoin or gift card</li>
            <li>Agreement to session-specific terms provided at booking</li>
            <li>Sessions are non-refundable once confirmed and scheduled</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2>8. Intellectual Property</h2>
          <p>All content on Sissy Fantasy Island — including logos, card designs, text, and graphics — is the property of SFI and may not be reproduced, distributed, or used without written permission.</p>
        </div>

        <div className="terms-section">
          <h2>9. Limitation of Liability</h2>
          <p>Sissy Fantasy Island is provided "as is" without warranties of any kind. We are not liable for any indirect, incidental, or consequential damages arising from your use of the platform, community, or events. Our total liability shall not exceed the amount you paid for your membership.</p>
        </div>

        <div className="terms-section">
          <h2>10. Changes to Terms</h2>
          <p>We reserve the right to update these terms at any time. Continued use of the platform after changes constitutes acceptance of the new terms. We will notify members of significant changes via email or community announcement.</p>
        </div>

        <div className="terms-section">
          <h2>11. Contact</h2>
          <p>For questions about these terms, contact us at:</p>
          <ul>
            <li>Email: comeandsee@gmail.com</li>
            <li>Phone: (415) 305-3689</li>
            <li>Telegram: @tshungkathy10</li>
          </ul>
        </div>

        <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.06)", textAlign: "center", opacity: 0.4, fontSize: "0.85rem" }}>
          <p>💕 Sissy Fantasy Island 2026 — Be who you really are 💕</p>
        </div>
      </div>
    </div>
  );
}

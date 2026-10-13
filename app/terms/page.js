import Link from "next/link";

export const metadata = {
  title: "Terms of Service — LA Trans Party 2026",
  description: "Terms of Service and Event Rules for LA Trans Party 2026, October 23–24 in Los Angeles.",
};

export default function TermsPage() {
  return (
    <div className="terms-page">
      <div className="container" style={{ maxWidth: 800, padding: "3rem 1.5rem" }}>
        <Link href="/" className="back-link">← Back to Home</Link>
        <h1>Terms of Service</h1>
        <p className="terms-updated">Last updated: October 1, 2026</p>

        <div className="terms-section">
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing or using this website ("LA Trans Party", "we", "us", "our"), you agree to be bound by these Terms of Service. If you do not agree with these terms, do not use this site. You must be 18 years of age or older to access this site.</p>
        </div>

        <div className="terms-section">
          <h2>2. Event Tickets</h2>
          <p>LA Trans Party tickets are digital and/or physical products that grant entry to the event taking place October 23–24, 2026 in Los Angeles, CA. All ticket purchases are:</p>
          <ul>
            <li>One-time payments — no recurring subscriptions or hidden fees</li>
            <li>Non-transferable — tickets are issued to the purchasing attendee only</li>
            <li>Valid for the dates and access tier purchased</li>
            <li>Subject to event rules — violations may result in revocation without refund</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2>3. Payments & Refunds</h2>
          <p>We accept Bitcoin (BTC) and gift cards as payment methods. All sales are final with the following exceptions:</p>
          <ul>
            <li>Event cancelled by us: Full refund of the ticket price</li>
            <li>Event date changed by us: Full refund offered if you cannot attend the new date</li>
            <li>Event moved outside Los Angeles: Full refund offered</li>
            <li>Virtual Access: Digital tickets are non-refundable once the code has been generated and delivered</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2>4. Privacy & Discretion</h2>
          <p>We take your privacy extremely seriously. Our commitments to you:</p>
          <ul>
            <li>We never sell, share, or expose attendee data to third parties</li>
            <li>All communications are encrypted using industry-standard SSL/TLS</li>
            <li>Billing appears as a discreet, non-descriptive name on all statements</li>
            <li>Anonymous purchase options are available — no email or personal info required</li>
            <li>Attendee data is stored securely and never used for advertising</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2>5. Community & Event Rules</h2>
          <p>All attendees must adhere to our community standards. The following are strictly prohibited:</p>
          <ul>
            <li>Harassment, bullying, or threatening behavior toward any attendee</li>
            <li>Sharing, doxxing, or exposing any attendee's personal information</li>
            <li>Distributing photos or content of any attendee without explicit consent</li>
            <li>Any sexual activity without enthusiastic, explicit, ongoing consent</li>
            <li>Impairing anyone's judgment with substances — no means no, always</li>
            <li>Sharing illegal content of any kind</li>
            <li>Minors are strictly prohibited — any suspected underage person will be reported to authorities</li>
          </ul>
          <p style={{ marginTop: "1rem" }}>Violations result in immediate removal from the event without refund. We reserve the right to refuse entry or remove any attendee at our discretion.</p>
        </div>

        <div className="terms-section">
          <h2>6. Event Policies</h2>
          <p>LA Trans Party events are private, adults-only gatherings. By attending, you agree to:</p>
          <ul>
            <li>Respect all attendees' boundaries and consent at all times</li>
            <li>Not photograph or record other attendees without explicit consent</li>
            <li>Follow all venue rules and event-specific guidelines</li>
            <li>Not share event details, the venue location, or attendee information publicly</li>
            <li>Understand that tickets are non-refundable unless the event is cancelled by us</li>
            <li>Adhere to the posted dress code</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2>7. Venue Discretion</h2>
          <p>The venue is private and its location is disclosed exclusively to ticket holders 48 hours before the event via email. The venue reserves the right to remove any guest violating house rules. Entry is subject to the venue's policies and management's discretion.</p>
        </div>

        <div className="terms-section">
          <h2>8. Intellectual Property</h2>
          <p>All content on this site — including logos, ticket designs, text, and graphics — is the property of LA Trans Party and may not be reproduced, distributed, or used without written permission.</p>
        </div>

        <div className="terms-section">
          <h2>9. Limitation of Liability</h2>
          <p>This site and event are provided "as is" without warranties of any kind. We are not liable for any indirect, incidental, or consequential damages arising from your use of the site or attendance at the event. Our total liability shall not exceed the amount you paid for your ticket.</p>
        </div>

        <div className="terms-section">
          <h2>10. Changes to Terms</h2>
          <p>We reserve the right to update these terms at any time. Continued use of the site after changes constitutes acceptance of the new terms. We will notify ticket holders of significant changes via email.</p>
        </div>

        <div className="terms-section">
          <h2>11. Contact</h2>
          <p>For questions about these terms, contact us at:</p>
          <ul>
            <li>Email: sissyfantasyisland70@gmail.com</li>
            <li>Phone: (415) 305-3689</li>
            <li>Telegram: @tshungkathy10</li>
          </ul>
        </div>

        <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.06)", textAlign: "center", opacity: 0.4, fontSize: "0.85rem" }}>
          <p>🏳️⚧️ LA Trans Party 2026 — October 23–24 · Los Angeles 🏳️⚧️</p>
        </div>
      </div>
    </div>
  );
}

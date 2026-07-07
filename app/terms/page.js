import Link from "next/link";

export default function Terms() {
  return (
    <div className="terms-page">
      <div className="container" style={{ paddingTop: "3rem", paddingBottom: "3rem" }}>
        <Link href="/" className="back-link">← Back to Home</Link>
        <h1>Terms of Service</h1>
        <p className="terms-updated">Last updated: April 2026</p>

        <section className="terms-section">
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing or using Sissy Fantasy Island ("SFI", "we", "us"), you agree to be bound by these Terms of Service. If you do not agree, do not use our services. You must be at least 18 years of age to use this platform.</p>
        </section>

        <section className="terms-section">
          <h2>2. Services Provided</h2>
          <p>SFI provides digital and physical membership cards, community access, event ticketing, and curated product recommendations. All purchases are one-time payments unless otherwise stated.</p>
        </section>

        <section className="terms-section">
          <h2>3. Membership Cards</h2>
          <ul>
            <li>All Sissy Cards are issued with a unique member ID and are non-transferable.</li>
            <li>Cards grant lifetime access to the tier purchased at the time of sale.</li>
            <li>Digital cards are delivered within 1 hour of payment verification.</li>
            <li>Physical cards are shipped within 3 business days and arrive in 5-14 business days.</li>
            <li>Lost or damaged physical cards can be replaced for a $25 fee.</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>4. Payment & Billing</h2>
          <ul>
            <li>We accept Bitcoin (BTC) and gift cards as payment methods.</li>
            <li>All billing appears as "SFI Digital Services" on statements.</li>
            <li>Payments are processed securely and we do not store payment information.</li>
            <li>All prices are in USD and are subject to change without notice.</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>5. Refund Policy</h2>
          <ul>
            <li>Digital cards and codes are non-refundable once generated or delivered.</li>
            <li>Physical cards may be returned unopened within 14 days for a full refund.</li>
            <li>Community access fees are non-refundable.</li>
            <li>Event tickets are non-refundable but may be transferred to another person.</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>6. Privacy & Anonymity</h2>
          <ul>
            <li>We offer anonymous purchase options requiring no personal information.</li>
            <li>We never share, sell, or expose member data to third parties.</li>
            <li>All communications are encrypted end-to-end.</li>
            <li>Members may use pseudonyms and sissy names on all platforms.</li>
            <li>Physical shipments use plain, unmarked packaging with no branding.</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>7. Community Guidelines</h2>
          <ul>
            <li>All members must treat others with respect and dignity.</li>
            <li>Harassment, doxxing, or sharing member information is strictly prohibited.</li>
            <li>Discrimination of any kind results in immediate permanent ban.</li>
            <li>All interactions must be consensual.</li>
            <li>Violations result in permanent removal with no refund.</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>8. Events</h2>
          <ul>
            <li>Event locations are shared only with verified ticket holders.</li>
            <li>All attendees must be 18+ with valid ID at the door.</li>
            <li>Photography is prohibited unless in designated areas.</li>
            <li>SFI reserves the right to refuse entry or remove attendees at any time.</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>9. Intellectual Property</h2>
          <p>All content, branding, card designs, and materials on this platform are the property of Sissy Fantasy Island. Reproduction, distribution, or unauthorized use is prohibited.</p>
        </section>

        <section className="terms-section">
          <h2>10. Limitation of Liability</h2>
          <p>SFI is not liable for any indirect, incidental, or consequential damages arising from the use of our services. Our total liability shall not exceed the amount paid by you for the specific service in question.</p>
        </section>

        <section className="terms-section">
          <h2>11. Modifications</h2>
          <p>We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the new terms.</p>
        </section>

        <section className="terms-section">
          <h2>12. Contact</h2>
          <p>For questions about these terms, contact us at:</p>
          <ul>
            <li>Email: comeandsee@gmail.com</li>
            <li>Phone: (415) 305-3689</li>
            <li>WhatsApp: +1 (415) 305-3689</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

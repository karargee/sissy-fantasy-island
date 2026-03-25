import Link from "next/link";

export default function DonateSuccess() {
  return (
    <div className="container" style={{ paddingTop: "5rem", paddingBottom: "5rem", textAlign: "center" }}>
      <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>💜</div>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>Thank You!</h1>
      <p className="tagline">Your donation means the world to us.</p>
      <div className="ticket-card" style={{ maxWidth: "550px", margin: "2rem auto", borderTop: "4px solid #d63384" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>🎥 Your Livestream Access</h2>
        <p style={{ opacity: 0.7, lineHeight: 1.7, marginBottom: "1.5rem" }}>
          A private livestream link will be sent to your email <strong>24 hours before the event</strong>.
          The stream includes all main stage performances, exclusive backstage moments, and live chat with other viewers.
        </p>
        <div style={{
          background: "rgba(214,51,132,0.1)",
          border: "1px solid rgba(214,51,132,0.2)",
          borderRadius: "12px",
          padding: "1rem",
          fontSize: "0.9rem",
          opacity: 0.8,
        }}>
          📧 Check your inbox (and spam folder) for confirmation
        </div>
        <Link href="/">
          <button className="buy-btn" style={{ background: "linear-gradient(135deg, #d63384, #6f42c1)", marginTop: "1.5rem" }}>
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}

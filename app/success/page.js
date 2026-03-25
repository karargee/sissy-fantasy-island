import Link from "next/link";

export default function Success() {
  return (
    <div className="container">
      <h1>🎉 You're In!</h1>
      <p className="subtitle">Your ticket to the Trans Party has been confirmed.</p>
      <div className="ticket-card">
        <h2>See you there! 🏳️⚧️</h2>
        <p style={{ marginTop: "1rem" }}>Check your email for your ticket details.</p>
        <Link href="/">
          <button className="buy-btn" style={{ marginTop: "1.5rem" }}>Back to Home</button>
        </Link>
      </div>
    </div>
  );
}

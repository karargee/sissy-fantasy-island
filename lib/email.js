import { Resend } from "resend";

const FROM = "Sissy Fantasy Island <onboarding@resend.dev>";
const TO = "sissyfantasyisland70@gmail.com";

export async function sendEmail(subject, html, to = TO) {
  if (!process.env.RESEND_API_KEY) return;
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({ from: FROM, to, subject, html });
  } catch (e) { console.error("Email error:", e.message); }
}

import Link from "next/link";
import { EVENT } from "@/lib/event";
import s from "../home.module.css";

export const metadata = { title: "You're on the list — LA Trans Party" };

export default function Success() {
  return (
    <div className={s.page}>
      <main className={s.gate}>
        <div className={s.gateInner}>
          <div className={s.eyebrow}>Payment received</div>
          <h1 className={s.gateTitle}>You&apos;re on the list.</h1>
          <p className={s.gateText}>
            Your receipt is on its way to your inbox. We&apos;ll email the venue address and entry details
            48 hours before doors open — {EVENT.dateLabel}, {EVENT.doors}. Bring photo ID.
          </p>
          <div className={s.gateActions}>
            <Link href="/" className={`${s.btn} ${s.btnPrimary}`}>Back to the site</Link>
          </div>
        </div>
      </main>
    </div>
  );
}

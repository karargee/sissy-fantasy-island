"use client";
import { useEffect } from "react";
import Link from "next/link";
import s from "../../home.module.css";

export default function ShopSuccess() {
  useEffect(() => {
    try { localStorage.removeItem("ltp_bag"); } catch {}
  }, []);

  return (
    <div className={s.page}>
      <main className={s.gate}>
        <div className={s.gateInner}>
          <div className={s.eyebrow}>Order received</div>
          <h1 className={s.gateTitle}>Thank you.</h1>
          <p className={s.gateText}>
            Your receipt is on its way to your inbox. Orders ship in plain packaging within 2 business days,
            and we&apos;ll email tracking as soon as it leaves us.
          </p>
          <div className={s.gateActions}>
            <Link href="/shop" className={`${s.btn} ${s.btnGhost}`}>Keep shopping</Link>
            <Link href="/#tickets" className={`${s.btn} ${s.btnPrimary}`}>Get tickets</Link>
          </div>
        </div>
      </main>
    </div>
  );
}

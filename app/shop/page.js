"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { PRODUCTS, SHOP_CATEGORIES, SHIPPING } from "@/lib/shop";
import { AgeGate, FlagRule, SiteHeader, SiteFooter, PageHero } from "@/app/components/SiteChrome";
import s from "../home.module.css";

const SHOP_OPEN = process.env.NEXT_PUBLIC_SHOP_OPEN === "true";
const BAG_KEY = "ltp_bag";

const PROMISES = [
  ["Discreet packaging", "Plain box, no logos. The sender name on the label is neutral."],
  ["Private billing", "Card payments are processed by Stripe. We never see or store your card number."],
  ["Size help", "Unsure about fit? Email us your measurements and we'll recommend a size."],
  ["Easy returns", "Unworn clothing and footwear can be returned within 14 days. Intimate items and toys can't, for hygiene."],
];

function useBag() {
  const [bag, setBag] = useState({});
  useEffect(() => {
    try { setBag(JSON.parse(localStorage.getItem(BAG_KEY) || "{}")); } catch {}
  }, []);
  function save(next) {
    setBag(next);
    try { localStorage.setItem(BAG_KEY, JSON.stringify(next)); } catch {}
  }
  return {
    bag,
    add: (id) => save({ ...bag, [id]: Math.min((bag[id] || 0) + 1, 10) }),
    setQty: (id, q) => {
      const next = { ...bag };
      if (q <= 0) delete next[id]; else next[id] = Math.min(q, 10);
      save(next);
    },
  };
}

function Bag({ bag, setQty, onClose }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const lines = Object.entries(bag)
    .map(([id, qty]) => ({ product: PRODUCTS.find((p) => p.id === id), qty }))
    .filter((l) => l.product);
  const subtotal = lines.reduce((n, l) => n + l.product.price * l.qty, 0);
  const shipping = subtotal === 0 || subtotal >= SHIPPING.freeOver ? 0 : SHIPPING.flat;

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function checkout() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/shop-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: lines.map((l) => ({ id: l.product.id, qty: l.qty })) }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || "Could not start checkout.");
      window.location.href = data.url;
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  }

  return (
    <>
      <div className={s.overlay} onClick={onClose} />
      <aside className={s.drawer} role="dialog" aria-modal="true" aria-label="Your bag">
        <div className={s.drawerHead}>
          <h2 className={s.drawerTitle}>Your bag</h2>
          <button className={s.modalClose} style={{ position: "static" }} onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className={s.drawerBody}>
          {lines.length === 0 ? (
            <p style={{ color: "var(--muted)", padding: "24px 0" }}>Your bag is empty.</p>
          ) : lines.map(({ product: p, qty }) => (
            <div key={p.id} className={s.bagItem}>
              <div className={s.bagThumb}><Image src={p.image} alt="" fill sizes="72px" className={s.coverImg} /></div>
              <div>
                <div className={s.bagName}>{p.name}</div>
                <div className={s.bagSub}>${p.price} each</div>
                <button className={s.linkBtn} onClick={() => setQty(p.id, 0)}>Remove</button>
              </div>
              <div className={s.qty}>
                <button onClick={() => setQty(p.id, qty - 1)} aria-label={`Fewer ${p.name}`}>−</button>
                <span>{qty}</span>
                <button onClick={() => setQty(p.id, qty + 1)} disabled={qty >= 10} aria-label={`More ${p.name}`}>+</button>
              </div>
            </div>
          ))}
        </div>
        {lines.length > 0 && (
          <div className={s.drawerFoot}>
            <div className={s.sumRow}><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className={s.sumRow}><span>Shipping</span><span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span></div>
            <div className={s.sumTotal}><span>Total</span><span>${(subtotal + shipping).toFixed(2)}</span></div>
            {error && <p className={s.error}>{error}</p>}
            <button className={`${s.btn} ${s.btnPrimary} ${s.btnBlock}`} onClick={checkout} disabled={loading}>
              {loading ? "Opening secure checkout…" : "Checkout"}
            </button>
            <p className={s.fine}>Free US shipping over ${SHIPPING.freeOver}. Secure checkout by Stripe.</p>
          </div>
        )}
      </aside>
    </>
  );
}

function Shop() {
  const [cat, setCat] = useState("All");
  const [bagOpen, setBagOpen] = useState(false);
  const { bag, add, setQty } = useBag();
  const count = Object.values(bag).reduce((n, q) => n + q, 0);
  const list = useMemo(() => (cat === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat)), [cat]);

  return (
    <div className={s.page}>
      <FlagRule />
      <SiteHeader
        extra={SHOP_OPEN ? (
          <button className={s.bagBtn} onClick={() => setBagOpen(true)}>Bag{count > 0 ? ` (${count})` : ""}</button>
        ) : null}
      />
      <main>
        <PageHero
          eyebrow="The Boutique"
          title={<>Dressed for <em>the night.</em></>}
          intro="Latex, leather, lingerie, heels, rope, restraints and makeover kits, picked by our hosts and shipped in plain packaging."
          image="https://images.unsplash.com/photo-1514689832698-319d3bcac5d5?w=2000&q=75"
          imageAlt="Portrait of a model in a harness under pink and blue neon light"
          imagePosition="center 35%"
        />
        <section className={s.section}>
          <div className={s.wrap}>
            {!SHOP_OPEN && (
              <p className={s.shopNotice}>
                Online ordering opens soon. In the meantime, each piece links to a retailer that carries it.
              </p>
            )}
            <div className={s.chips} role="tablist" aria-label="Categories">
              {["All", ...SHOP_CATEGORIES].map((c) => (
                <button
                  key={c}
                  role="tab"
                  aria-selected={cat === c}
                  className={`${s.chip} ${cat === c ? s.chipActive : ""}`}
                  onClick={() => setCat(c)}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className={s.productGrid}>
              {list.map((p) => (
                <article key={p.id} id={p.id} className={s.productCard}>
                  <div className={s.productMedia}>
                    <Image src={p.image} alt={p.alt} fill sizes="(max-width: 760px) 50vw, (max-width: 980px) 33vw, 280px" className={s.coverImg} />
                  </div>
                  <div className={s.productMeta}>
                    <span className={s.productCat}>{p.category}</span>
                    <h3 className={s.productName} style={{ fontWeight: 400 }}>{p.name}</h3>
                    <span className={s.productPrice}>${p.price}</span>
                  </div>
                  <p className={s.productDesc}>{p.desc}</p>
                  <div className={s.productActions}>
                    {SHOP_OPEN ? (
                      <button className={`${s.btn} ${s.btnGhost} ${s.btnSmall} ${s.btnBlock}`} onClick={() => { add(p.id); setBagOpen(true); }}>
                        Add to bag
                      </button>
                    ) : (
                      <a className={`${s.btn} ${s.btnGhost} ${s.btnSmall} ${s.btnBlock}`} href={p.retailerUrl} target="_blank" rel="noopener noreferrer sponsored">
                        Shop at retailer
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>

            <div className={s.promises}>
              {PROMISES.map(([t, d]) => (
                <div key={t}><strong>{t}</strong><p>{d}</p></div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      {bagOpen && SHOP_OPEN && <Bag bag={bag} setQty={setQty} onClose={() => setBagOpen(false)} />}
    </div>
  );
}

export default function ShopPage() {
  return <AgeGate><Shop /></AgeGate>;
}

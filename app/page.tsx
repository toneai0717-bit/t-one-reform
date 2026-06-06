"use client";

import { useState, useEffect } from "react";

// ── 定数 ─────────────────────────────────────────────────────────────────────

const CONTACT = {
  phone: "090-3626-5470",
  email: "t.one.reform@gmail.com",
  address: "大阪府河内長野市小塩町79-1 ガレージ5",
} as const;

const SERVICES = [
  {
    id: "daiku",
    subtitle: "CARPENTRY",
    title: "大工工事",
    desc: "新築・増改築から日常の修繕まで。木の特性を知り尽くした職人が、丁寧に仕上げます。",
    details: ["新築・増改築工事", "フローリング・床工事", "造作・内装仕上げ", "修繕・補修工事"],
  },
  {
    id: "tatami",
    subtitle: "TATAMI",
    title: "畳リフォーム",
    desc: "畳製作技能士1級を取得した元畳職人が施工。新調・表替えから縁なし畳、フローリングへの変更まで対応。",
    details: ["畳の新調・交換", "表替え・裏返し", "琉球畳・縁なし畳", "フローリングへの変更"],
  },
  {
    id: "kaigo",
    subtitle: "CARE REFORM",
    title: "介護・バリアフリーリフォーム",
    desc: "福祉住環境コーディネーター2級として、住む方の状況に合わせた改修を提案。介護保険の活用もサポート。",
    details: ["手すり設置", "段差解消・スロープ設置", "浴室・トイレ改修", "介護保険活用サポート"],
  },
] as const;

const WORKS_PLACEHOLDER = [
  { cat: "大工工事", label: "床の張り替え" },
  { cat: "大工工事", label: "内装仕上げ" },
  { cat: "畳リフォーム", label: "畳の新調" },
  { cat: "畳リフォーム", label: "縁なし畳（琉球畳）" },
  { cat: "介護リフォーム", label: "手すり設置" },
  { cat: "介護リフォーム", label: "段差解消" },
] as const;

const INQUIRY_TYPES = [
  "大工工事",
  "畳リフォーム",
  "介護・バリアフリーリフォーム",
  "その他",
] as const;

const CERTS = [
  {
    grade: "1級",
    name: "畳製作技能士",
    note: "国家資格",
    desc: "畳の製作・修理に関する高度な技術・知識を証明する国家最高位の資格。素材の目利きから仕上げまで、長年の経験に裏付けられた技術があります。",
  },
  {
    grade: "2級",
    name: "福祉住環境コーディネーター",
    note: "東京商工会議所",
    desc: "高齢者・障がいのある方が安心して暮らせる住環境整備の専門資格。住む方の状況を丁寧にヒアリングし、最適な改修プランを提案します。",
  },
] as const;

// ── SVGアイコン ───────────────────────────────────────────────────────────────

function IconCarpentry() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden>
      <rect x="15" y="4" width="10" height="8" rx="2.5" fill="currentColor" opacity="0.9" />
      <rect x="17" y="11" width="4" height="20" rx="2" fill="currentColor" opacity="0.7" />
      <rect x="5" y="16" width="26" height="3" rx="1.5" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

function IconTatami() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden>
      <rect x="4" y="4" width="28" height="28" rx="3" stroke="currentColor" strokeWidth="2" />
      <line x1="18" y1="4" x2="18" y2="32" stroke="currentColor" strokeWidth="1.5" />
      <line x1="4" y1="18" x2="32" y2="18" stroke="currentColor" strokeWidth="1.5" />
      <rect x="6" y="6" width="10" height="10" rx="1" fill="currentColor" opacity="0.12" />
      <rect x="20" y="20" width="10" height="10" rx="1" fill="currentColor" opacity="0.12" />
    </svg>
  );
}

function IconCare() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden>
      <circle cx="18" cy="9" r="4" fill="currentColor" opacity="0.9" />
      <path d="M11 20 C11 16 25 16 25 20 L25 32 L11 32 Z" fill="currentColor" opacity="0.15" />
      <path d="M11 20 L18 24 L25 20" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none" />
      <line x1="18" y1="24" x2="18" y2="32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="29" x2="24" y2="29" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <path d="M6 2H9L11 7L8.5 8.5C9.5 10.5 11.5 12.5 13.5 13.5L15 11L20 13V16C20 17.1 19.1 18 18 18C10.3 18 4 11.7 4 4C4 2.9 4.9 2 6 2Z"
        stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <rect x="2" y="5" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M2 8L11 13L20 8" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function IconPin() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <path d="M11 2C7.7 2 5 4.7 5 8C5 12 11 20 11 20C11 20 17 12 17 8C17 4.7 14.3 2 11 2Z"
        stroke="currentColor" strokeWidth="1.8" />
      <circle cx="11" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

// ── フック ────────────────────────────────────────────────────────────────────

function useHeaderScroll() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => {
      const hero = document.getElementById("hero");
      const threshold = hero ? hero.offsetHeight * 0.85 : window.innerHeight * 0.85;
      setScrolled(window.scrollY > threshold);
    };
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    window.addEventListener("resize", fn, { passive: true });
    return () => {
      window.removeEventListener("scroll", fn);
      window.removeEventListener("resize", fn);
    };
  }, []);
  return scrolled;
}

// ── ヘッダー ──────────────────────────────────────────────────────────────────

function Header({ scrolled }: { scrolled: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white header-shadow" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-between h-16">
        {/* ロゴ */}
        <a href="#" className="flex items-center gap-3">
          <div className="w-6 h-6 relative">
            <div className="absolute inset-0 border-2 border-current rotate-45" style={{ borderColor: "var(--color-primary)" }} />
            <div className="absolute inset-1 border border-current rotate-45" style={{ borderColor: "var(--color-primary)", opacity: 0.5 }} />
          </div>
          <span
            className="text-sm font-bold tracking-[0.08em]"
            style={{ color: scrolled ? "#1a1410" : "white" }}
          >
            t-one reform
          </span>
        </a>

        {/* PCナビ */}
        <nav className="hidden md:flex items-center gap-8" aria-label="メインナビゲーション">
          {[
            { href: "#services", label: "サービス" },
            { href: "#works", label: "施工事例" },
            { href: "#about", label: "職人紹介" },
            { href: "#contact", label: "お問い合わせ" },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-sm transition-colors"
              style={{ color: scrolled ? "#5a4a3a" : "rgba(255,255,255,0.75)" }}
            >
              {label}
            </a>
          ))}
          <a
            href={`tel:${CONTACT.phone}`}
            className="px-5 py-2 rounded text-sm font-bold transition-colors"
            style={{
              background: "var(--color-primary)",
              color: "white",
            }}
          >
            {CONTACT.phone}
          </a>
        </nav>

        {/* ハンバーガー（SP） */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
        >
          <div className="space-y-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-5 h-0.5 transition-all"
                style={{ background: scrolled ? "#1a1410" : "white" }}
              />
            ))}
          </div>
        </button>
      </div>

      {/* SPメニュー */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-stone-100">
          <nav className="flex flex-col">
            {[
              { href: "#services", label: "サービス" },
              { href: "#works", label: "施工事例" },
              { href: "#about", label: "職人紹介" },
              { href: "#contact", label: "お問い合わせ" },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="px-6 py-4 text-sm text-stone-600 border-b border-stone-50"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
            <a
              href={`tel:${CONTACT.phone}`}
              className="px-6 py-4 text-sm font-bold"
              style={{ color: "var(--color-primary)" }}
            >
              {CONTACT.phone}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

// ── ヒーロー ──────────────────────────────────────────────────────────────────

function Hero() {
  // 畳の目を模した背景パターン
  const tatamiPattern = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect x='1' y='1' width='78' height='78' fill='none' stroke='rgba(255,255,255,0.04)' stroke-width='1'/%3E%3Cline x1='1' y1='40' x2='79' y2='40' stroke='rgba(255,255,255,0.04)' stroke-width='1'/%3E%3C/svg%3E")`;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "#1c1510" }}
      aria-label="t-one reform ヒーロー"
    >
      {/* 畳目パターン背景 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: tatamiPattern, backgroundSize: "80px 80px" }}
        aria-hidden
      />

      {/* 左辺アクセントライン */}
      <div
        className="absolute top-0 bottom-0 left-0 w-[3px] pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, rgba(193,127,36,0.6) 30%, rgba(193,127,36,0.6) 70%, transparent 100%)",
        }}
        aria-hidden
      />

      {/* 下部グラデーション */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(15,10,6,0.6), transparent)" }}
        aria-hidden
      />

      {/* コンテンツ */}
      <div className="relative z-10 w-full px-8 md:px-20 py-32">
        <div className="max-w-3xl">
          <p
            className="hero-rise text-[11px] tracking-[0.45em] mb-6 font-jp-sans"
            style={{ color: "rgba(193,127,36,0.8)", animationDelay: "0.1s" }}
          >
            T-ONE REFORM ── 河内長野の職人
          </p>

          <h1
            className="hero-rise text-white leading-[1.25] mb-6 font-jp-serif"
            style={{
              fontSize: "clamp(2.4rem, 6vw, 5.2rem)",
              textShadow: "0 2px 40px rgba(0,0,0,0.6)",
              animationDelay: "0.22s",
            }}
          >
            畳職人の精度で、
            <br />
            <span style={{ color: "#e8a83a" }}>暮らし</span>を整える。
          </h1>

          <p
            className="hero-rise text-sm md:text-base leading-[1.9] mb-10 font-jp-sans"
            style={{ color: "rgba(255,255,255,0.55)", animationDelay: "0.36s", maxWidth: "36rem" }}
          >
            大工工事・畳リフォーム・介護バリアフリー。
            <br />
            元畳職人の技術と経験で、あなたの住まいに
            <br />
            真摯に向き合います。
          </p>

          <div
            className="hero-rise flex flex-col sm:flex-row gap-3"
            style={{ animationDelay: "0.5s" }}
          >
            <a
              href="#contact"
              className="px-8 py-4 text-sm font-bold rounded tracking-wide text-white transition-colors"
              style={{
                background: "var(--color-primary)",
                boxShadow: "0 4px 24px rgba(193,127,36,0.35)",
              }}
            >
              相談・見積もり（無料）
            </a>
            <a
              href="#services"
              className="px-8 py-4 text-sm rounded text-white transition-colors"
              style={{ border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.7)" }}
            >
              サービスを見る
            </a>
          </div>

          {/* スクロールヒント */}
          <div
            className="hero-rise mt-16 flex items-center gap-3"
            style={{ animationDelay: "0.7s" }}
          >
            <div className="w-8 h-px" style={{ background: "rgba(255,255,255,0.2)" }} />
            <span className="text-[10px] tracking-[0.4em] font-jp-sans" style={{ color: "rgba(255,255,255,0.25)" }}>
              SCROLL
            </span>
          </div>
        </div>

        {/* 右下 エリア表示 */}
        <div className="absolute bottom-8 right-8 text-right hidden md:block" aria-hidden>
          <p className="text-[10px] tracking-[0.3em]" style={{ color: "rgba(255,255,255,0.15)" }}>
            KAWACHINAGANO
          </p>
          <p className="text-[10px] tracking-[0.3em]" style={{ color: "rgba(255,255,255,0.15)" }}>
            OSAKA
          </p>
        </div>
      </div>
    </section>
  );
}

// ── サービス ──────────────────────────────────────────────────────────────────

const SERVICE_ICONS = {
  daiku: <IconCarpentry />,
  tatami: <IconTatami />,
  kaigo: <IconCare />,
};

function Services() {
  return (
    <section id="services" className="py-24 md:py-32" style={{ background: "#faf8f5" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="mb-16 fade-up">
          <p className="text-[11px] tracking-[0.4em] mb-3 font-jp-sans" style={{ color: "var(--color-primary)" }}>
            SERVICES
          </p>
          <h2
            className="font-jp-serif leading-tight"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "#1a1410" }}
          >
            できること
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <div
              key={s.id}
              className={`fade-up fade-up-delay-${i + 1} group`}
            >
              <div className="h-full p-8 bg-white rounded-2xl border border-stone-100 transition-all duration-300 hover:border-amber-200 hover:shadow-lg hover:shadow-amber-50">
                {/* アイコン */}
                <div className="mb-5" style={{ color: "var(--color-primary)" }}>
                  {SERVICE_ICONS[s.id as keyof typeof SERVICE_ICONS]}
                </div>

                <p
                  className="text-[10px] tracking-[0.35em] mb-1.5 font-jp-sans"
                  style={{ color: "rgba(193,127,36,0.55)" }}
                >
                  {s.subtitle}
                </p>
                <h3
                  className="font-jp-serif text-xl mb-3"
                  style={{ color: "#1a1410" }}
                >
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed mb-5 text-stone-500 font-jp-sans">
                  {s.desc}
                </p>

                {/* 詳細リスト */}
                <ul className="space-y-2">
                  {s.details.map((d) => (
                    <li key={d} className="flex items-center gap-2.5 text-sm text-stone-600 font-jp-sans">
                      <div
                        className="w-1 h-1 rounded-full shrink-0"
                        style={{ background: "var(--color-primary)" }}
                      />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* CTAバナー */}
        <div
          className="fade-up fade-up-delay-3 mt-12 p-6 md:p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ background: "#1c1510" }}
        >
          <p className="text-white text-sm md:text-base font-jp-sans">
            相談・見積もりは無料です。まずはお気軽にご連絡ください。
          </p>
          <a
            href="#contact"
            className="shrink-0 px-7 py-3 rounded text-sm font-bold text-white transition-colors whitespace-nowrap"
            style={{ background: "var(--color-primary)" }}
          >
            無料相談はこちら
          </a>
        </div>
      </div>
    </section>
  );
}

// ── 職人紹介 ──────────────────────────────────────────────────────────────────

function About() {
  return (
    <section id="about" className="py-24 md:py-32" style={{ background: "#f3ede5" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* フォトプレースホルダー */}
          <div className="fade-up order-2 md:order-1">
            <div
              className="aspect-[3/4] rounded-2xl flex flex-col items-center justify-center gap-3"
              style={{ background: "#e8ddd0", border: "1px solid rgba(193,127,36,0.15)" }}
            >
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden>
                <rect x="6" y="6" width="36" height="36" rx="5" stroke="rgba(193,127,36,0.3)" strokeWidth="2" />
                <circle cx="24" cy="20" r="6" stroke="rgba(193,127,36,0.3)" strokeWidth="2" />
                <path d="M8 42 Q24 30 40 42" stroke="rgba(193,127,36,0.3)" strokeWidth="2" fill="none" />
              </svg>
              <span
                className="text-xs tracking-widest font-jp-sans"
                style={{ color: "rgba(193,127,36,0.4)" }}
              >
                PHOTO COMING SOON
              </span>
            </div>
          </div>

          {/* テキスト */}
          <div className="order-1 md:order-2">
            <div className="fade-up mb-8">
              <p
                className="text-[11px] tracking-[0.4em] mb-3 font-jp-sans"
                style={{ color: "var(--color-primary)" }}
              >
                ABOUT
              </p>
              <h2
                className="font-jp-serif leading-tight mb-6"
                style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)", color: "#1a1410" }}
              >
                素材と向き合う、<br />
                職人の眼
              </h2>
              <p className="text-sm leading-[1.9] mb-4 text-stone-500 font-jp-sans">
                もともとは畳職人として、畳の製作・施工に長年携わってきました。畳製作技能士1級を取得し、素材の目利きと精緻な手仕事を磨いてきた経験が、現在の大工工事にも確かに生きています。
              </p>
              <p className="text-sm leading-[1.9] text-stone-500 font-jp-sans">
                さらに福祉住環境コーディネーター2級を取得。高齢者・障がいのある方が安心して暮らせる住まいづくりにも力を入れています。住む人の立場に立った、きめ細かい提案が強みです。
              </p>
            </div>

            {/* スペック */}
            <div className="fade-up fade-up-delay-1 grid grid-cols-2 gap-3">
              {[
                { label: "畳製作技能士", value: "1級" },
                { label: "福祉住環境コーディネーター", value: "2級" },
                { label: "相談・見積もり", value: "無料" },
                { label: "対応エリア", value: "河内長野市・南大阪全域" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-4 rounded-xl bg-white"
                  style={{ border: "1px solid rgba(193,127,36,0.12)" }}
                >
                  <p className="text-[10px] text-stone-400 mb-1 font-jp-sans">{item.label}</p>
                  <p className="text-sm font-bold font-jp-sans" style={{ color: "#1a1410" }}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 施工事例 ──────────────────────────────────────────────────────────────────

function Works() {
  return (
    <section id="works" className="py-24 md:py-32" style={{ background: "#faf8f5" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="mb-16 fade-up flex items-end justify-between gap-4">
          <div>
            <p
              className="text-[11px] tracking-[0.4em] mb-3 font-jp-sans"
              style={{ color: "var(--color-primary)" }}
            >
              WORKS
            </p>
            <h2
              className="font-jp-serif"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "#1a1410" }}
            >
              施工事例
            </h2>
          </div>
          <p className="text-xs text-stone-400 mb-2 font-jp-sans">※ 写真は順次追加予定です</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {WORKS_PLACEHOLDER.map((w, i) => (
            <div key={i} className={`fade-up fade-up-delay-${Math.min(i % 3, 3)}`}>
              <div
                className="aspect-square rounded-xl flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:border-amber-300"
                style={{ background: "white", border: "1px solid #e8e0d5" }}
              >
                {/* プレースホルダーアイコン */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: "#faf4ea" }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                    <rect x="1.5" y="3" width="15" height="12" rx="2" stroke="rgba(193,127,36,0.4)" strokeWidth="1.5" />
                    <circle cx="9" cy="8" r="2.5" stroke="rgba(193,127,36,0.4)" strokeWidth="1.5" />
                    <path d="M1.5 14 Q9 10 16.5 14" stroke="rgba(193,127,36,0.4)" strokeWidth="1.5" fill="none" />
                  </svg>
                </div>
                <p
                  className="text-[9px] tracking-widest font-jp-sans"
                  style={{ color: "rgba(193,127,36,0.6)" }}
                >
                  {w.cat}
                </p>
                <p className="text-xs text-stone-400 font-jp-sans">{w.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 資格 ─────────────────────────────────────────────────────────────────────

function Certifications() {
  return (
    <section
      className="py-24 md:py-28"
      style={{ background: "#1c1510" }}
      aria-label="保有資格"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="text-center mb-14 fade-up">
          <p
            className="text-[10px] tracking-[0.45em] mb-3 font-jp-sans"
            style={{ color: "rgba(193,127,36,0.6)" }}
          >
            QUALIFICATIONS
          </p>
          <h2
            className="font-jp-serif text-white"
            style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)" }}
          >
            保有資格
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {CERTS.map((cert, i) => (
            <div
              key={cert.name}
              className={`fade-up fade-up-delay-${i + 1} p-7 rounded-2xl transition-all duration-300`}
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.03)",
              }}
            >
              <div className="flex items-start gap-5">
                {/* グレードバッジ */}
                <div
                  className="shrink-0 w-14 h-14 rounded-full flex flex-col items-center justify-center"
                  style={{ border: "1.5px solid rgba(193,127,36,0.4)" }}
                >
                  <span
                    className="font-jp-serif font-bold text-lg leading-none"
                    style={{ color: "#e8a83a" }}
                  >
                    {cert.grade}
                  </span>
                </div>
                <div>
                  <p
                    className="text-[9px] tracking-widest mb-1 font-jp-sans"
                    style={{ color: "rgba(193,127,36,0.5)" }}
                  >
                    {cert.note}
                  </p>
                  <h3 className="text-white font-jp-serif text-lg mb-2">{cert.name}</h3>
                  <p
                    className="text-xs leading-relaxed font-jp-sans"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    {cert.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── お問い合わせ ──────────────────────────────────────────────────────────────

type FormState = { name: string; phone: string; email: string; message: string };
type SendStatus = "idle" | "loading" | "success" | "error";

const INPUT_CLS =
  "w-full px-4 py-3 rounded-xl text-sm font-jp-sans transition-colors bg-white text-[#1a1410] placeholder-stone-300 outline-none";
const INPUT_STYLE = { border: "1px solid #e8e0d5", fontSize: "14px" };
const LABEL_CLS = "block text-xs font-jp-sans mb-1.5 text-stone-500";

function Contact() {
  const [form, setForm] = useState<FormState>({ name: "", phone: "", email: "", message: "" });
  const [inquiryTypes, setInquiryTypes] = useState<string[]>([]);
  const [status, setStatus] = useState<SendStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function toggleInquiry(type: string) {
    setInquiryTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, inquiryTypes }),
      });
      const data = (await res.json()) as { error?: string };
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", phone: "", email: "", message: "" });
        setInquiryTypes([]);
      } else {
        setStatus("error");
        setErrorMsg(data.error ?? "送信に失敗しました");
      }
    } catch {
      setStatus("error");
      setErrorMsg("通信エラーが発生しました。しばらくしてから再度お試しください。");
    }
  }

  return (
    <section id="contact" className="py-24 md:py-32" style={{ background: "#faf8f5" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* ヘッダー */}
        <div className="mb-14 fade-up">
          <p
            className="text-[11px] tracking-[0.4em] mb-3 font-jp-sans"
            style={{ color: "var(--color-primary)" }}
          >
            CONTACT
          </p>
          <h2
            className="font-jp-serif mb-3"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "#1a1410" }}
          >
            お問い合わせ
          </h2>
          <p className="text-sm text-stone-400 font-jp-sans">
            相談・見積もりは無料です。お気軽にご連絡ください。
          </p>
        </div>

        <div className="grid md:grid-cols-[1fr_300px] gap-10 md:gap-16 items-start">
          {/* ── フォーム ── */}
          <div className="fade-up">
            {status === "success" ? (
              /* 送信完了 */
              <div
                className="p-10 rounded-2xl text-center"
                style={{ background: "#f0faf0", border: "1px solid #a8d8a8" }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: "#d4edda" }}
                >
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
                    <circle cx="14" cy="14" r="13" stroke="#3d8b3d" strokeWidth="1.5" />
                    <path d="M8 14 L12 18 L20 10" stroke="#3d8b3d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="font-jp-serif text-xl mb-2" style={{ color: "#2d6a2d" }}>
                  送信が完了しました
                </h3>
                <p className="text-sm text-stone-500 font-jp-sans leading-relaxed">
                  お問い合わせありがとうございます。
                  <br />
                  内容を確認次第、ご連絡いたします。
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-sm font-jp-sans underline"
                  style={{ color: "var(--color-primary)" }}
                >
                  別のお問い合わせをする
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="p-8 rounded-2xl bg-white"
                style={{ border: "1px solid #ece6dc" }}
              >
                <div className="grid sm:grid-cols-2 gap-5 mb-5">
                  {/* お名前 */}
                  <div className="sm:col-span-2">
                    <label htmlFor="name" className={LABEL_CLS}>
                      お名前
                      <span className="ml-1.5 text-[10px] tracking-wider" style={{ color: "var(--color-primary)" }}>
                        必須
                      </span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="山田 太郎"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={INPUT_CLS}
                      style={INPUT_STYLE}
                    />
                  </div>

                  {/* 電話 */}
                  <div>
                    <label htmlFor="phone" className={LABEL_CLS}>電話番号</label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="090-0000-0000"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className={INPUT_CLS}
                      style={INPUT_STYLE}
                    />
                  </div>

                  {/* メール */}
                  <div>
                    <label htmlFor="email" className={LABEL_CLS}>メールアドレス</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="example@gmail.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={INPUT_CLS}
                      style={INPUT_STYLE}
                    />
                  </div>
                </div>

                {/* 相談の種類 */}
                <div className="mb-5">
                  <p className={LABEL_CLS}>ご相談の種類（複数選択可）</p>
                  <div className="grid grid-cols-2 gap-2.5">
                    {INQUIRY_TYPES.map((type) => {
                      const checked = inquiryTypes.includes(type);
                      return (
                        <label
                          key={type}
                          className="flex items-center gap-2.5 p-3 rounded-xl cursor-pointer transition-colors font-jp-sans text-sm select-none"
                          style={{
                            border: checked ? "1.5px solid rgba(193,127,36,0.6)" : "1px solid #e8e0d5",
                            background: checked ? "#fdf6ea" : "white",
                            color: checked ? "#9a6419" : "#5a4a3a",
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleInquiry(type)}
                            className="sr-only"
                          />
                          <div
                            className="w-4 h-4 rounded shrink-0 flex items-center justify-center"
                            style={{
                              border: checked ? "none" : "1.5px solid #c8b89a",
                              background: checked ? "var(--color-primary)" : "transparent",
                            }}
                          >
                            {checked && (
                              <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden>
                                <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </div>
                          {type}
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* 相談内容 */}
                <div className="mb-6">
                  <label htmlFor="message" className={LABEL_CLS}>
                    ご相談内容
                    <span className="ml-1.5 text-[10px] tracking-wider" style={{ color: "var(--color-primary)" }}>
                      必須
                    </span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="ご相談の内容をできるだけ詳しくお書きください。（例：LDKのフローリング張り替えを検討しています。6畳ほどです。）"
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={INPUT_CLS}
                    style={{ ...INPUT_STYLE, resize: "vertical" }}
                  />
                </div>

                {/* エラー */}
                {status === "error" && (
                  <p className="mb-4 text-sm text-red-600 font-jp-sans">{errorMsg}</p>
                )}

                {/* 送信ボタン */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-4 rounded-xl text-white font-bold font-jp-sans text-sm transition-opacity"
                  style={{
                    background: "var(--color-primary)",
                    boxShadow: "0 4px 20px rgba(193,127,36,0.28)",
                    opacity: status === "loading" ? 0.7 : 1,
                  }}
                >
                  {status === "loading" ? "送信中..." : "送信する →"}
                </button>
              </form>
            )}
          </div>

          {/* ── 直接連絡先 ── */}
          <div className="fade-up fade-up-delay-1 space-y-5">
            <p className="text-xs tracking-widest text-stone-400 font-jp-sans mb-6">DIRECT CONTACT</p>

            {/* 電話 */}
            <a
              href={`tel:${CONTACT.phone}`}
              className="block p-5 rounded-2xl bg-white transition-all hover:shadow-md group"
              style={{ border: "1px solid #ece6dc" }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div style={{ color: "var(--color-primary)" }}><IconPhone /></div>
                <p className="text-[10px] tracking-widest text-stone-400 font-jp-sans">PHONE</p>
              </div>
              <p className="font-bold text-base font-jp-sans" style={{ color: "#1a1410" }}>
                {CONTACT.phone}
              </p>
              <p className="text-xs text-stone-400 mt-1 font-jp-sans">
                8:00〜18:00（土日祝も対応可）
              </p>
            </a>

            {/* メール */}
            <a
              href={`mailto:${CONTACT.email}`}
              className="block p-5 rounded-2xl bg-white transition-all hover:shadow-md"
              style={{ border: "1px solid #ece6dc" }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div style={{ color: "var(--color-primary)" }}><IconMail /></div>
                <p className="text-[10px] tracking-widest text-stone-400 font-jp-sans">EMAIL</p>
              </div>
              <p className="text-sm font-jp-sans break-all" style={{ color: "#1a1410" }}>
                {CONTACT.email}
              </p>
            </a>

            {/* 住所 */}
            <div
              className="p-5 rounded-2xl bg-white"
              style={{ border: "1px solid #ece6dc" }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div style={{ color: "var(--color-primary)" }}><IconPin /></div>
                <p className="text-[10px] tracking-widest text-stone-400 font-jp-sans">ADDRESS</p>
              </div>
              <p className="text-sm leading-relaxed font-jp-sans" style={{ color: "#1a1410" }}>
                {CONTACT.address}
              </p>
            </div>

            {/* 備考 */}
            <p className="text-xs leading-relaxed text-stone-400 font-jp-sans px-1">
              相談・現地確認・見積もりはすべて無料です。河内長野市を中心に南大阪全域に対応しています。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── フッター ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer
      className="py-12 px-6 md:px-12"
      style={{ background: "#1a1410" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-white font-bold text-sm mb-1 font-jp-sans">t-one reform</p>
            <p className="text-xs font-jp-sans" style={{ color: "rgba(255,255,255,0.3)" }}>
              {CONTACT.address}
            </p>
          </div>
          <nav className="flex gap-6" aria-label="フッターナビゲーション">
            {[
              { href: "#services", label: "サービス" },
              { href: "#works", label: "施工事例" },
              { href: "#about", label: "職人紹介" },
              { href: "#contact", label: "お問い合わせ" },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="text-xs transition-colors hover:text-white font-jp-sans"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
        <div
          className="mt-8 pt-6 text-center font-jp-sans"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.2)" }}>
            © {new Date().getFullYear()} t-one reform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ── メインページ ──────────────────────────────────────────────────────────────

export default function Page() {
  const scrolled = useHeaderScroll();

  // スクロールアニメーション（IntersectionObserver）
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".fade-up").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <Header scrolled={scrolled} />
      <main>
        <Hero />
        <Services />
        <About />
        <Works />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

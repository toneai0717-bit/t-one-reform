"use client";

import { useState, useEffect, useRef, useCallback } from "react";

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
    note: "国家技能検定 最高位",
    points: [
      "畳製作・施工に関する国家最高位の資格",
      "素材の目利き・製作・設置まで一貫して対応",
      "フローリングや洋室への変更工事にも技術を活用",
    ],
  },
  {
    grade: "2級",
    name: "福祉住環境コーディネーター",
    note: "東京商工会議所 認定",
    points: [
      "高齢者・障がい者向け住環境整備の専門資格",
      "介護保険を活用したリフォームの提案・申請サポート",
      "手すり設置・段差解消・バリアフリー設計に対応",
    ],
  },
] as const;

// Hero ビフォーアフター写真
const HERO_REVEAL = {
  before: "/images/Japanese-room-before.jpg",
  after:  "/images/Japanese-room-after.jpg",
} as const;

// 施工事例：ビフォーアフターペア
const BEFORE_AFTER_WORKS = [
  {
    id: "bathroom-1",
    cat: "水回り改修",
    label: "バスルーム改修",
    period: "約7〜10日",
    cost: "80〜150万円",
    before: "/images/Barhroom-before_image1.jpeg",
    after:  "/images/Barhroom-after_image1.jpeg",
  },
  {
    id: "bathroom-2",
    cat: "水回り改修",
    label: "バスルーム改修",
    period: "約7〜10日",
    cost: "80〜150万円",
    before: "/images/Barhroom-before_image2.jpeg",
    after:  "/images/Barhroom-after_image2.jpeg",
  },
  {
    id: "washroom",
    cat: "水回り改修",
    label: "洗面所改修",
    period: "約2〜3日",
    cost: "30〜60万円",
    before: "/images/washroom-before_image1.jpg",
    after:  "/images/washroom-after_image1.jpg",
  },
  {
    id: "window",
    cat: "大工工事 / 建具",
    label: "窓・建具改修",
    period: "約1〜2日",
    cost: "15〜40万円",
    before: "/images/window-before.JPG",
    after:  "/images/window-after.JPG",
  },
  {
    id: "tatami",
    cat: "畳リフォーム",
    label: "和室・畳リフォーム",
    period: "約1〜2日",
    cost: "10〜30万円",
    before: "/images/tatami-before.jpg",
    after:  "/images/tatami-after.jpg",
  },
] as const;

// 施工事例：単体写真
const SINGLE_WORKS = [
  { id: "shop",    cat: "大工工事",               label: "店舗新築工事",       period: "約3ヶ月",  cost: "要相談",     src: "/images/Shop-making.JPG" },
  { id: "kitchen", cat: "大工工事 / 内装",        label: "キッチン工事",       period: "約3〜5日", cost: "50〜100万円", src: "/images/kitchen.JPG" },
  { id: "fence",   cat: "大工工事 / エクステリア", label: "ウッドフェンス設置", period: "約1〜2日", cost: "20〜50万円",  src: "/images/wood-fence.JPG" },
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

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fn = () => setReduced(mq.matches);
    fn();
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return reduced;
}

function useHeaderScroll() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => {
      const hero = document.getElementById("hero");
      // Hero が 240vh のスクロールトラックなので、sticky が終わる手前で切り替え
      const threshold = hero
        ? hero.offsetHeight - window.innerHeight - 8
        : 60;
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
          <div className="w-6 h-6 relative shrink-0">
            <div
              className="absolute inset-0 border-2 rotate-45"
              style={{ borderColor: "var(--color-primary)" }}
            />
            <div
              className="absolute inset-1 border rotate-45"
              style={{ borderColor: "var(--color-primary)", opacity: 0.5 }}
            />
          </div>
          <span
            className="text-sm font-bold tracking-[0.08em] transition-colors"
            style={{ color: scrolled ? "#1a1410" : "white" }}
          >
            t-one reform
          </span>
        </a>

        {/* PCナビ */}
        <nav className="hidden md:flex items-center gap-8" aria-label="メインナビゲーション">
          {[
            { href: "#services", label: "サービス" },
            { href: "#works",    label: "施工事例" },
            { href: "#about",    label: "職人紹介" },
            { href: "#contact",  label: "お問い合わせ" },
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
            className="px-5 py-2 rounded text-sm font-bold text-white transition-opacity hover:opacity-80"
            style={{ background: "var(--color-primary)" }}
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

      {/* SP ドロワー */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-stone-100">
          {[
            { href: "#services", label: "サービス" },
            { href: "#works",    label: "施工事例" },
            { href: "#about",    label: "職人紹介" },
            { href: "#contact",  label: "お問い合わせ" },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="block px-6 py-4 text-sm text-stone-600 border-b border-stone-50"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <a
            href={`tel:${CONTACT.phone}`}
            className="block px-6 py-4 text-sm font-bold"
            style={{ color: "var(--color-primary)" }}
          >
            {CONTACT.phone}
          </a>
        </div>
      )}
    </header>
  );
}

// ── Hero: スクロール連動ビフォーアフター ─────────────────────────────────────

function ScrollRevealHero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) { setProgress(1); return; }
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const update = () => {
      const total = track.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-track.getBoundingClientRect().top, 0), total || 1);
      setProgress(total > 0 ? scrolled / total : 0);
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  const p = progress;

  return (
    <section
      ref={trackRef}
      id="hero"
      className="relative h-[240vh]"
      aria-label="施工事例 ビフォーアフター"
    >
      <div className="sticky top-0 h-[100dvh] min-h-[600px] overflow-hidden">

        {/* 画像レイヤー（ズームアニメ付き） */}
        <div
          className="absolute inset-0"
          style={{
            transform: `scale(${1.06 - p * 0.06})`,
            transformOrigin: "center",
            filter: "brightness(1.1) saturate(1.05) contrast(1.02)",
          }}
        >
          {/* After（ベース） */}
          <img
            src={HERO_REVEAL.after}
            alt="施工後のバスルーム"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Before（左からワイプ） */}
          <img
            src={HERO_REVEAL.before}
            alt="施工前のバスルーム"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ clipPath: `inset(0 0 0 ${p * 100}%)` }}
          />
        </div>

        {/* ワイプ境界の光 */}
        <div
          className="absolute top-0 bottom-0 z-10 pointer-events-none"
          style={{
            left: `${p * 100}%`,
            width: "200px",
            transform: "translateX(-50%)",
            opacity: p > 0.012 && p < 0.985 ? 1 : 0,
            background:
              "linear-gradient(to right, transparent 0%, rgba(255,240,205,0) 30%, rgba(255,246,220,0.55) 50%, rgba(255,240,205,0) 70%, transparent 100%)",
            mixBlendMode: "screen",
          }}
          aria-hidden
        />
        <div
          className="absolute top-0 bottom-0 w-[2px] z-10 pointer-events-none"
          style={{
            left: `${p * 100}%`,
            transform: "translateX(-50%)",
            opacity: p > 0.012 && p < 0.985 ? 1 : 0,
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,250,236,0.95) 50%, rgba(255,255,255,0) 100%)",
            boxShadow: "0 0 18px 2px rgba(255,238,200,0.55)",
          }}
          aria-hidden
        />

        {/* グラデーション（左側暗め） */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 40%, transparent 100%)",
          }}
          aria-hidden
        />

        {/* ビネット */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ boxShadow: "inset 0 0 180px 40px rgba(0,0,0,0.45)" }}
          aria-hidden
        />

        {/* フィルムグレイン */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            mixBlendMode: "overlay",
            opacity: 0.08,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "160px 160px",
          }}
          aria-hidden
        />

        {/* コピー */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-20 max-w-3xl">
          <p
            className="hero-rise text-amber-400 text-xs md:text-sm font-bold tracking-[0.3em] mb-5 uppercase font-jp-sans"
            style={{ animationDelay: "0.05s" }}
          >
            T-ONE REFORM ── 河内長野の職人
          </p>
          <h1
            className="hero-rise font-jp-serif text-white leading-tight mb-4"
            style={{
              fontSize: "clamp(2rem, 5.5vw, 4rem)",
              textShadow: "0 2px 32px rgba(0,0,0,0.6)",
              animationDelay: "0.18s",
            }}
          >
            畳職人の精度で、
            <br />
            暮らしを整える。
          </h1>
          <p
            className="hero-rise text-white/70 text-sm md:text-base mb-8 leading-relaxed max-w-md font-jp-sans"
            style={{ animationDelay: "0.32s" }}
          >
            大工工事・畳リフォーム・介護バリアフリー
            <br />
            河内長野で、住まいに向き合います。
          </p>
          <div
            className="hero-rise flex flex-col sm:flex-row gap-3"
            style={{ animationDelay: "0.46s" }}
          >
            <a
              href="#contact"
              className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-white font-bold rounded transition-colors shadow-lg text-sm tracking-wide font-jp-sans"
            >
              無料相談・見積もりはこちら
            </a>
            <a
              href="#services"
              className="px-8 py-4 border-2 border-white/70 text-white font-bold rounded hover:bg-white hover:text-stone-800 transition-colors text-sm backdrop-blur-sm font-jp-sans"
            >
              サービスを見る
            </a>
          </div>
        </div>

        {/* スクロールヒント */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
          style={{ opacity: Math.max(0, 1 - p * 4) }}
          aria-hidden
        >
          <span className="text-white/60 text-xs font-jp-sans">スクロールでビフォーアフター</span>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none" className="animate-bounce">
            <rect x="1" y="1" width="14" height="22" rx="7" stroke="white" strokeOpacity="0.5" strokeWidth="1.5" />
            <circle cx="8" cy="7" r="2" fill="white" />
          </svg>
        </div>
      </div>
    </section>
  );
}

// ── サービス ──────────────────────────────────────────────────────────────────

const SERVICE_ICONS = {
  daiku:  <IconCarpentry />,
  tatami: <IconTatami />,
  kaigo:  <IconCare />,
};

function Services() {
  return (
    <section id="services" className="py-24 md:py-32" style={{ background: "#faf8f5" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="mb-16 fade-up">
          <p className="text-[11px] tracking-[0.4em] mb-3 font-jp-sans" style={{ color: "var(--color-primary)" }}>
            SERVICES
          </p>
          <h2 className="font-jp-serif leading-tight" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "#1a1410" }}>
            できること
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <div key={s.id} className={`fade-up fade-up-delay-${i + 1}`}>
              <div className="h-full p-8 bg-white rounded-2xl border border-stone-100 transition-all duration-300 hover:border-amber-200 hover:shadow-lg hover:shadow-amber-50">
                <div className="mb-5" style={{ color: "var(--color-primary)" }}>
                  {SERVICE_ICONS[s.id as keyof typeof SERVICE_ICONS]}
                </div>
                <p className="text-[10px] tracking-[0.35em] mb-1.5 font-jp-sans" style={{ color: "rgba(193,127,36,0.55)" }}>
                  {s.subtitle}
                </p>
                <h3 className="font-jp-serif text-xl mb-3" style={{ color: "#1a1410" }}>
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed mb-5 text-stone-500 font-jp-sans">{s.desc}</p>
                <ul className="space-y-2">
                  {s.details.map((d) => (
                    <li key={d} className="flex items-center gap-2.5 text-sm text-stone-600 font-jp-sans">
                      <div className="w-1 h-1 rounded-full shrink-0" style={{ background: "var(--color-primary)" }} />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div
          className="fade-up fade-up-delay-3 mt-12 p-6 md:p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ background: "#1c1510" }}
        >
          <p className="text-white text-sm md:text-base font-jp-sans">
            相談・見積もりは無料です。まずはお気軽にご連絡ください。
          </p>
          <a
            href="#contact"
            className="shrink-0 px-7 py-3 rounded text-sm font-bold text-white transition-opacity hover:opacity-80 whitespace-nowrap font-jp-sans"
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
    <section id="about" className="py-16 md:py-24" style={{ background: "#f3ede5" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* 写真プレースホルダー */}
          <div className="fade-up order-2 md:order-1 md:sticky md:top-24">
            <div
              className="aspect-[3/4] rounded-2xl flex flex-col items-center justify-center gap-3"
              style={{ background: "#e8ddd0", border: "1px solid rgba(193,127,36,0.15)" }}
            >
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden>
                <rect x="6" y="6" width="36" height="36" rx="5" stroke="rgba(193,127,36,0.3)" strokeWidth="2" />
                <circle cx="24" cy="20" r="6" stroke="rgba(193,127,36,0.3)" strokeWidth="2" />
                <path d="M8 42 Q24 30 40 42" stroke="rgba(193,127,36,0.3)" strokeWidth="2" fill="none" />
              </svg>
              <span className="text-xs tracking-widest font-jp-sans" style={{ color: "rgba(193,127,36,0.4)" }}>
                PHOTO COMING SOON
              </span>
            </div>
          </div>

          {/* テキスト＋資格 */}
          <div className="order-1 md:order-2 space-y-8">

            {/* プロフィール */}
            <div className="fade-up">
              <p className="text-[11px] tracking-[0.4em] mb-3 font-jp-sans" style={{ color: "var(--color-primary)" }}>
                ABOUT
              </p>
              <h2
                className="font-jp-serif leading-tight mb-4"
                style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)", color: "#1a1410" }}
              >
                素材と向き合う、
                <br />
                職人の眼
              </h2>
              <div className="space-y-3 text-sm leading-[1.85] text-stone-500 font-jp-sans">
                <p>
                  もともとは畳職人として、畳の製作・施工に長年携わってきました。畳製作技能士1級を取得し、素材の目利きと精緻な手仕事を磨いてきた経験が、現在の大工工事にも確かに生きています。
                </p>
                <p>
                  畳は、寸法・素材・張り方のわずかなズレが仕上がりに直結します。その繊細な感覚が、フローリングの張り替えや造作工事にも活かされています。「見えないところを丁寧に」が、長年変わらないこだわりです。
                </p>
                <p>
                  また、福祉住環境コーディネーター2級を取得し、高齢者・障がいのある方が安心して暮らせる住まいづくりにも注力。手すりの位置ひとつにも、住む方の動線や体の状態を考慮した提案を心がけています。
                </p>
              </div>
            </div>

            {/* 保有資格 */}
            <div className="fade-up fade-up-delay-1">
              <p className="text-[10px] tracking-[0.4em] mb-4 font-jp-sans" style={{ color: "var(--color-primary)" }}>
                QUALIFICATIONS
              </p>
              <div className="space-y-3">
                {CERTS.map((cert) => (
                  <div
                    key={cert.name}
                    className="p-5 rounded-xl bg-white"
                    style={{ border: "1px solid rgba(193,127,36,0.18)", borderLeft: "4px solid var(--color-primary)" }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      {/* グレードスタンプ */}
                      <div
                        className="shrink-0 px-3 py-1.5 rounded-lg"
                        style={{ background: "var(--color-primary)" }}
                      >
                        <span className="font-jp-serif font-black text-white text-lg leading-none">
                          {cert.grade}
                        </span>
                      </div>
                      <div>
                        <p className="text-[9px] tracking-widest font-jp-sans mb-0.5" style={{ color: "rgba(193,127,36,0.6)" }}>
                          {cert.note}
                        </p>
                        <p className="font-jp-serif font-bold text-lg leading-tight" style={{ color: "#1a1410" }}>
                          {cert.name}
                        </p>
                      </div>
                    </div>
                    <ul className="space-y-1.5">
                      {cert.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2 text-xs text-stone-500 font-jp-sans leading-relaxed">
                          <div className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: "var(--color-primary)" }} />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* スペック */}
            <div className="fade-up fade-up-delay-2 grid grid-cols-2 gap-3">
              {[
                { label: "対応エリア", value: "関西全域" },
                { label: "受付時間", value: "8:00〜17:00（日・祝休）" },
                { label: "営業形態", value: "個人事業" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-4 rounded-xl bg-white"
                  style={{ border: "1px solid rgba(193,127,36,0.12)" }}
                >
                  <p className="text-[10px] text-stone-400 mb-1 font-jp-sans">{item.label}</p>
                  <p className="text-sm font-bold font-jp-sans" style={{ color: "#1a1410" }}>{item.value}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

// ── ビフォーアフタースライダー ────────────────────────────────────────────────

function BeforeAfterSlider({
  before,
  after,
  label,
  cat,
  period,
  cost,
}: {
  before: string;
  after: string;
  label: string;
  cat: string;
  period: string;
  cost: string;
}) {
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const move = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const { left, width } = el.getBoundingClientRect();
    setPos(Math.min(Math.max(((clientX - left) / width) * 100, 0), 100));
  }, []);

  // マウスドラッグ
  useEffect(() => {
    const onUp   = () => { dragging.current = false; };
    const onMove = (e: MouseEvent) => { if (dragging.current) move(e.clientX); };
    window.addEventListener("mouseup",   onUp);
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mouseup",   onUp);
      window.removeEventListener("mousemove", onMove);
    };
  }, [move]);

  // タッチ（passive: false でスクロール抑制）
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      move(e.touches[0].clientX);
    };
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => el.removeEventListener("touchmove", onTouchMove);
  }, [move]);

  return (
    <div>
      <div
        ref={containerRef}
        className="relative aspect-[4/3] overflow-hidden rounded-2xl select-none"
        style={{ cursor: "col-resize" }}
        onMouseDown={(e) => { dragging.current = true; move(e.clientX); }}
        onTouchStart={(e) => move(e.touches[0].clientX)}
        role="img"
        aria-label={`${label} ビフォーアフター比較（左右にドラッグ）`}
      >
        {/* After（ベース） */}
        <img
          src={after}
          alt={`${label} 施工後`}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
        {/* Before（右からクリップ） */}
        <img
          src={before}
          alt={`${label} 施工前`}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          draggable={false}
        />

        {/* 分割ライン */}
        <div
          className="absolute top-0 bottom-0 z-20 pointer-events-none"
          style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
          aria-hidden
        >
          <div
            className="absolute top-0 bottom-0"
            style={{
              left: "50%",
              width: "2px",
              transform: "translateX(-50%)",
              background: "rgba(255,255,255,0.9)",
              boxShadow: "0 0 8px rgba(0,0,0,0.3)",
            }}
          />
          {/* ハンドル */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white flex items-center justify-center"
            style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.25)" }}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
              <path d="M8 5L3 11L8 17" stroke="#5a4a3a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14 5L19 11L14 17" stroke="#5a4a3a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* BEFORE ラベル */}
        <div
          className="absolute top-3 left-3 z-10 px-2 py-1 text-[10px] tracking-widest text-white font-jp-sans rounded transition-opacity"
          style={{
            background: "rgba(0,0,0,0.5)",
            opacity: pos > 12 ? 1 : 0,
          }}
          aria-hidden
        >
          BEFORE
        </div>
        {/* AFTER ラベル */}
        <div
          className="absolute top-3 right-3 z-10 px-2 py-1 text-[10px] tracking-widest text-white font-jp-sans rounded transition-opacity"
          style={{
            background: "rgba(193,127,36,0.75)",
            opacity: pos < 88 ? 1 : 0,
          }}
          aria-hidden
        >
          AFTER
        </div>
      </div>

      {/* キャプション */}
      <div className="mt-3 px-1">
        <p className="text-[10px] tracking-widest font-jp-sans mb-1" style={{ color: "rgba(193,127,36,0.7)" }}>
          {cat}
        </p>
        <p className="text-sm font-bold font-jp-sans mb-2" style={{ color: "#1a1410" }}>{label}</p>
        <div className="flex gap-3">
          <span className="flex items-center gap-1 text-xs text-stone-400 font-jp-sans">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M6 3.5V6L7.5 7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            工期 {period}
          </span>
          <span className="flex items-center gap-1 text-xs text-stone-400 font-jp-sans">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <rect x="1" y="2.5" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M4 5.5h4M4 7.5h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            {cost}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── 施工事例 ──────────────────────────────────────────────────────────────────

function Works() {
  return (
    <section id="works" className="py-24 md:py-32" style={{ background: "#faf8f5" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="mb-16 fade-up">
          <p className="text-[11px] tracking-[0.4em] mb-3 font-jp-sans" style={{ color: "var(--color-primary)" }}>
            WORKS
          </p>
          <h2 className="font-jp-serif mb-2" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "#1a1410" }}>
            施工事例
          </h2>
          <p className="text-sm text-stone-400 font-jp-sans">
            ドラッグ（スワイプ）してビフォーアフターを確認できます
          </p>
        </div>

        {/* ビフォーアフタースライダー */}
        <div className="grid md:grid-cols-2 gap-8 mb-14">
          {BEFORE_AFTER_WORKS.map((w, i) => (
            <div key={w.id} className={`fade-up fade-up-delay-${i % 2}`}>
              <BeforeAfterSlider
                before={w.before}
                after={w.after}
                label={w.label}
                cat={w.cat}
                period={w.period}
                cost={w.cost}
              />
            </div>
          ))}
        </div>

        {/* 単体写真 */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {SINGLE_WORKS.map((w, i) => (
            <div key={w.id} className={`fade-up fade-up-delay-${i % 3}`}>
              <div className="rounded-2xl overflow-hidden">
                <img
                  src={w.src}
                  alt={w.label}
                  className="w-full aspect-[4/3] object-cover"
                  loading="lazy"
                />
              </div>
              <div className="mt-3 px-1">
                <p className="text-[10px] tracking-widest font-jp-sans mb-1" style={{ color: "rgba(193,127,36,0.7)" }}>
                  {w.cat}
                </p>
                <p className="text-sm font-bold font-jp-sans mb-2" style={{ color: "#1a1410" }}>{w.label}</p>
                <div className="flex gap-3">
                  <span className="flex items-center gap-1 text-xs text-stone-400 font-jp-sans">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                      <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
                      <path d="M6 3.5V6L7.5 7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                    工期 {w.period}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-stone-400 font-jp-sans">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                      <rect x="1" y="2.5" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                      <path d="M4 5.5h4M4 7.5h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                    {w.cost}
                  </span>
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

type FormState  = { name: string; phone: string; email: string; message: string };
type SendStatus = "idle" | "loading" | "success" | "error";

const INPUT_CLS =
  "w-full px-4 py-3 rounded-xl text-sm font-jp-sans transition-colors bg-white text-[#1a1410] placeholder-stone-300 outline-none";
const INPUT_STYLE = { border: "1px solid #e8e0d5", fontSize: "14px" };
const LABEL_CLS  = "block text-xs font-jp-sans mb-1.5 text-stone-500";

function Contact() {
  const [form, setForm]               = useState<FormState>({ name: "", phone: "", email: "", message: "" });
  const [inquiryTypes, setInquiryTypes] = useState<string[]>([]);
  const [status, setStatus]           = useState<SendStatus>("idle");
  const [errorMsg, setErrorMsg]       = useState("");

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
      const res  = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ ...form, inquiryTypes }),
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
        <div className="mb-14 fade-up">
          <p className="text-[11px] tracking-[0.4em] mb-3 font-jp-sans" style={{ color: "var(--color-primary)" }}>
            CONTACT
          </p>
          <h2 className="font-jp-serif mb-3" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "#1a1410" }}>
            お問い合わせ
          </h2>
          <p className="text-sm text-stone-400 font-jp-sans">相談・見積もりは無料です。お気軽にご連絡ください。</p>
        </div>

        <div className="grid md:grid-cols-[1fr_300px] gap-10 md:gap-16 items-start">
          {/* フォーム */}
          <div className="fade-up">
            {status === "success" ? (
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
                    <path d="M8 14L12 18L20 10" stroke="#3d8b3d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="font-jp-serif text-xl mb-2" style={{ color: "#2d6a2d" }}>送信が完了しました</h3>
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
                  <div className="sm:col-span-2">
                    <label htmlFor="name" className={LABEL_CLS}>
                      お名前
                      <span className="ml-1.5 text-[10px] tracking-wider" style={{ color: "var(--color-primary)" }}>必須</span>
                    </label>
                    <input
                      id="name" type="text" placeholder="山田 太郎" required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={INPUT_CLS} style={INPUT_STYLE}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className={LABEL_CLS}>電話番号</label>
                    <input
                      id="phone" type="tel" placeholder="090-0000-0000"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className={INPUT_CLS} style={INPUT_STYLE}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={LABEL_CLS}>メールアドレス</label>
                    <input
                      id="email" type="email" placeholder="example@gmail.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={INPUT_CLS} style={INPUT_STYLE}
                    />
                  </div>
                </div>

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
                            border:     checked ? "1.5px solid rgba(193,127,36,0.6)" : "1px solid #e8e0d5",
                            background: checked ? "#fdf6ea" : "white",
                            color:      checked ? "#9a6419" : "#5a4a3a",
                          }}
                        >
                          <input
                            type="checkbox" checked={checked}
                            onChange={() => toggleInquiry(type)}
                            className="sr-only"
                          />
                          <div
                            className="w-4 h-4 rounded shrink-0 flex items-center justify-center"
                            style={{
                              border:     checked ? "none" : "1.5px solid #c8b89a",
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

                <div className="mb-6">
                  <label htmlFor="message" className={LABEL_CLS}>
                    ご相談内容
                    <span className="ml-1.5 text-[10px] tracking-wider" style={{ color: "var(--color-primary)" }}>必須</span>
                  </label>
                  <textarea
                    id="message" rows={5}
                    placeholder="ご相談の内容をできるだけ詳しくお書きください。（例：LDKのフローリング張り替えを検討しています。6畳ほどです。）"
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={INPUT_CLS}
                    style={{ ...INPUT_STYLE, resize: "vertical" }}
                  />
                </div>

                {status === "error" && (
                  <p className="mb-4 text-sm text-red-600 font-jp-sans">{errorMsg}</p>
                )}

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

          {/* 直接連絡先 */}
          <div className="fade-up fade-up-delay-1 space-y-5">
            <p className="text-xs tracking-widest text-stone-400 font-jp-sans mb-6">DIRECT CONTACT</p>

            <a
              href={`tel:${CONTACT.phone}`}
              className="block p-5 rounded-2xl bg-white transition-all hover:shadow-md"
              style={{ border: "1px solid #ece6dc" }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div style={{ color: "var(--color-primary)" }}><IconPhone /></div>
                <p className="text-[10px] tracking-widest text-stone-400 font-jp-sans">PHONE</p>
              </div>
              <p className="font-bold text-base font-jp-sans" style={{ color: "#1a1410" }}>{CONTACT.phone}</p>
              <p className="text-xs text-stone-400 mt-1 font-jp-sans">8:00〜17:00（日・祝休）</p>
            </a>

            <a
              href={`mailto:${CONTACT.email}`}
              className="block p-5 rounded-2xl bg-white transition-all hover:shadow-md"
              style={{ border: "1px solid #ece6dc" }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div style={{ color: "var(--color-primary)" }}><IconMail /></div>
                <p className="text-[10px] tracking-widest text-stone-400 font-jp-sans">EMAIL</p>
              </div>
              <p className="text-sm font-jp-sans break-all" style={{ color: "#1a1410" }}>{CONTACT.email}</p>
            </a>

            <div className="p-5 rounded-2xl bg-white" style={{ border: "1px solid #ece6dc" }}>
              <div className="flex items-center gap-3 mb-2">
                <div style={{ color: "var(--color-primary)" }}><IconPin /></div>
                <p className="text-[10px] tracking-widest text-stone-400 font-jp-sans">ADDRESS</p>
              </div>
              <p className="text-sm leading-relaxed font-jp-sans" style={{ color: "#1a1410" }}>{CONTACT.address}</p>
            </div>

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
    <footer className="py-12 px-6 md:px-12" style={{ background: "#1a1410" }}>
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
              { href: "#works",    label: "施工事例" },
              { href: "#about",    label: "職人紹介" },
              { href: "#contact",  label: "お問い合わせ" },
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
        <ScrollRevealHero />
        <Services />
        <About />
        <Works />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

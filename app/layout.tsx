import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans_JP({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const notoSerif = Noto_Serif_JP({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "t-one reform | 大工・畳・介護リフォーム | 河内長野",
  description:
    "大工工事・畳リフォーム・介護バリアフリーリフォームは、河内長野の職人「t-one reform」へ。畳製作技能士1級、福祉住環境コーディネーター2級取得。相談・見積もり無料。",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#c17f24",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ja"
      className={`${notoSans.variable} ${notoSerif.variable}`}
    >
      <body className="min-h-full antialiased bg-[#faf8f5] text-[#1a1410]">
        {children}
      </body>
    </html>
  );
}

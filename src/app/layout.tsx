import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: "المُبسّط التقني | Tech Simplifier Workspace",
  description: "تبسيط المفاهيم التقنية بلهجة عربية عامية بمساعدة الذكاء الاصطناعي",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} antialiased selection:bg-cyan-500/30 overflow-x-hidden`}>
        
        <main className="relative min-h-screen z-10">
          {children}
        </main>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "CarePen: Better Clinical Notes. More Time for Patient Care.",
  description:
    "CarePen helps healthcare professionals transform patient conversations into structured clinical documentation, organize patient information, and simplify everyday clinical workflows with intelligent AI assistance.",
  keywords:
    "clinical documentation, AI medical notes, ambient scribe, healthcare workflow, medical documentation software",
  openGraph: {
    title: "CarePen: AI Clinical Documentation Platform",
    description:
      "Transform patient conversations into structured clinical documentation with CarePen.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}

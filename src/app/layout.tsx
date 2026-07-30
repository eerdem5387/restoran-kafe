import type { Metadata, Viewport } from "next";
import { EB_Garamond, Hanken_Grotesk, Montserrat, Yellowtail } from "next/font/google";
import { MotionProvider } from "@/components/motion/MotionProvider";
import "./globals.css";

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

const yellowtail = Yellowtail({
  variable: "--font-yellowtail",
  subsets: ["latin"],
  weight: "400",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "latin-ext"],
  weight: ["700"],
  style: ["italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Berray's",
    template: "%s | Berray's",
  },
  description:
    "El yapımı mutfak gelenekleri, modern bir sığınağın sakin konforuyla buluşuyor. Sofistike sıcaklık için Berray's.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#fcf9f8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${ebGaramond.variable} ${hanken.variable} ${yellowtail.variable} ${montserrat.variable} h-full antialiased`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-full flex-col font-body text-base text-foreground">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}

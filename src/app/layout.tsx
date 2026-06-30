import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Geist_Mono,
  Instrument_Serif,
  Inter,
  Manrope,
} from "next/font/google";
import Script from "next/script";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { siteConfig } from "@/lib/content";
import { absoluteUrl, getSiteJsonLd, siteUrl } from "@/lib/seo";
import { cn } from "@/lib/utils";
import "./globals.css";

const instrumentSerifHeading = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-heading",
});

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Florencia González | Arquitectura e interiores",
    template: "%s | Florencia González",
  },
  description:
    "Arquitecta en San Juan. Proyectos residenciales y comerciales, interiores, visualización 3D, documentación y dirección de obra.",
  alternates: { canonical: absoluteUrl() },
  openGraph: {
    title: "Florencia González | Arquitectura e interiores",
    description:
      "Arquitecta en San Juan. Proyectos residenciales y comerciales, interiores, visualización 3D, documentación y dirección de obra.",
    locale: "es_AR",
    siteName: siteConfig.name,
    type: "website",
    url: absoluteUrl(),
  },
  twitter: {
    card: "summary_large_image",
    title: "Florencia González | Arquitectura e interiores",
    description:
      "Arquitecta en San Juan. Proyectos residenciales y comerciales, interiores, visualización 3D, documentación y dirección de obra.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-AR"
      className={cn(
        "h-full font-sans antialiased",
        manrope.variable,
        cormorant.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
        instrumentSerifHeading.variable,
      )}
    >
      <body className="flex min-h-full flex-col">
        <JsonLd data={getSiteJsonLd()} />
        <Header />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
      <Script id="microsoft-clarity" strategy="afterInteractive">
        {`(function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "xf7vvc0k1v");`}
      </Script>
    </html>
  );
}

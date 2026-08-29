import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/Footer";
import "./globals.css";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono-",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://savedallas.com"),
  title: {
    default: "Save Dallas | Demand Smart Fiscal Stewardship at City Hall",
    template: "%s | Save Dallas",
  },
  description:
    "Save Dallas is a grassroots campaign asking the Dallas City Council to make smart fiscal decisions about City Hall. Register to speak at the September 2 public hearing — in person or by videoconference.",
  keywords: [
    "Save Dallas",
    "Dallas City Hall",
    "Dallas City Council",
    "public hearing",
    "register to speak",
    "Dallas budget",
    "civic engagement",
    "Dallas Texas",
  ],
  authors: [{ name: "Save Dallas" }],
  creator: "Save Dallas",
  publisher: "Save Dallas",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://savedallas.com",
  },
  icons: {
    icon: "/vite.png",
    apple: "/vite.png",
  },
  openGraph: {
    type: "website",
    siteName: "Save Dallas",
    url: "https://savedallas.com",
    title: "Save Dallas | Demand Smart Fiscal Stewardship at City Hall",
    description:
      "Join Dallas residents and business owners demanding smart fiscal stewardship at City Hall. Register to speak at the September 2 public hearing.",
    locale: "en_US",
    images: [
      {
        url: "/vite.png",
        width: 1200,
        height: 630,
        alt: "Save Dallas — a grassroots campaign for Dallas City Hall",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Save Dallas | Demand Smart Fiscal Stewardship at City Hall",
    description:
      "Join Dallas residents and business owners demanding smart fiscal stewardship at City Hall. Register to speak at the September 2 public hearing.",
    images: ["/vite.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Dallas City Council Public Hearing — Save Dallas",
    description:
      "A public hearing where Dallas residents and business owners can register to speak to the City Council about smart fiscal stewardship at City Hall.",
    startDate: "2026-09-02T00:00:00-05:00",
    eventAttendanceMode: "https://schema.org",
    eventStatus: "https://schema.org",
    location: {
      "@type": "Place",
      name: "Dallas City Hall, Council Chambers",
      address: {
        "@type": "PostalAddress",
        streetAddress: "1500 Marilla St., Room 5D",
        addressLocality: "Dallas",
        addressRegion: "TX",
        addressCountry: "US",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "Save Dallas",
      url: "https://savedallas.com/",
    },
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      style={{ colorScheme: "light" }}
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#031C4B" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        <Suspense fallback={null}>
          <ScrollToTop />
          <Navbar />
        </Suspense>
        <main className="flex-1 flex flex-col">
          <Suspense fallback={null}>{children}</Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
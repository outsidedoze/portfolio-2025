import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const SITE_TITLE = "Zach Ardente | One Man. Many Hats";
const SITE_DESCRIPTION = "I swear there's actually cool stuff on this site. Check it out and let me know!";

export const metadata = {
  metadataBase: new URL("https://zachardente.com"),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: "One Man. Many Hats",
    description: SITE_DESCRIPTION,
    url: "https://zachardente.com",
    type: "website",
    images: [{ url: "/images/og-image.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "One Man. Many Hats",
    description: SITE_DESCRIPTION,
    images: ["/images/og-image.jpg"],
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono", 
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://p.typekit.net" crossOrigin="anonymous" />
        <link rel="preload" as="style" href="https://use.typekit.net/xth4wng.css" />
        <link rel="stylesheet" href="https://use.typekit.net/xth4wng.css" />

        {/* Opt-out: browsers that have logged into /dashboard (no_track cookie) and headless/automated
            browsers (navigator.webdriver) are excluded from GA and Clarity before either loads */}
        <Script id="analytics-optout" strategy="beforeInteractive">
          {`
            (function(){
              var skip = /(^|; )no_track=1(;|$)/.test(document.cookie) || navigator.webdriver === true;
              if (skip) { window['ga-disable-G-DZ5PZTG1HK'] = true; window['ga-disable-G-4YT07H4E2F'] = true; window.__noTrack = true; }
            })();
          `}
        </Script>

        {/* Google Analytics — EXACTLY as provided */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DZ5PZTG1HK"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            if (!window.__noTrack) {
              gtag('js', new Date());
              gtag('config', 'G-DZ5PZTG1HK');
            }
          `}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="clarity" strategy="afterInteractive">
          {`
            if (!window.__noTrack) (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "so4ztawika");
          `}
        </Script>

      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
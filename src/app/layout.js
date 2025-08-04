import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

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
        <link rel="stylesheet" href="https://use.typekit.net/xth4wng.css" />

        {/* Google Analytics — EXACTLY as provided */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DZ5PZTG1HK"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DZ5PZTG1HK');
          `}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "so4ztawika");
          `}
        </Script>

        <meta property="og:title" content="One Man. Many Hats" />
        <meta property="og:description" content="I swear there's actually cool stuff on this site. Check it out and let me know!" />
        <meta property="og:image" content="/images/og-image.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zachardente.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="One Man. Many Hats" />
        <meta name="twitter:description" content="I swear there's actually cool stuff on this site. Check it out and let me know!" />
        <meta name="twitter:image" content="/images/og-image.jpg" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
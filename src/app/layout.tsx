// src/app/layout.tsx
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import localFont from "next/font/local";
import LandingHeader from "@/components/landing/LandingHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import TidioChat from "@/components/layout/TidioChat";
import CartToast from "@/components/cart/CartToast";
import CookieConsent from "@/components/layout/CookieConsent";
import "./globals.css";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

// Same file the live site serves at wp-content/uploads/avia_fonts/type_fonts/millar-bold-1/millar bold.ttf
const millar = localFont({
  variable: "--font-millar",
  src: "./fonts/millar-bold.ttf",
  weight: "400",
  display: "swap",
});

// Display serif of the landing redesign (all weights the template uses)
const millarLanding = localFont({
  variable: "--font-millar-landing",
  src: [
    { path: "./fonts/MillarLight.woff2", weight: "300", style: "normal" },
    { path: "./fonts/MillarRegular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/MillarItalic.woff2", weight: "400", style: "italic" },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ARK Equine",
  description: "Equine Feed | Horse Supplements | Horse Care",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${lato.variable} ${millar.variable} ${millarLanding.variable} h-full antialiased`}>
      <head>
        <script
          id="mcjs"
          dangerouslySetInnerHTML={{
            __html: `!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/6df3094962d722680bd8eb679/d458940b52ce96fca8a4a244a.js");`,
          }}
        />
        <meta name="google-site-verification" content="FohaEub8ewMrz3j4-vTu-qHa1Q9VBHNlTz74YDSXy5Y" />
        <meta name="facebook-domain-verification" content="jd4thjmyn6qncuzkugtrg7uyyc0hod" />
        {/* Default consent: deny analytics/ads until the visitor accepts via the cookie banner */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied'
});`,
          }}
        />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-N2DV4WPC');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body className="flex min-h-full flex-col">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N2DV4WPC"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <LandingHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <CartToast />
        <TidioChat />
        <CookieConsent />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { site } from "@/lib/site";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${site.product} — ${site.name}`,
  description: site.description,
  metadataBase: new URL(site.url),
  openGraph: {
    title: `${site.product} — ${site.tagline}`,
    description: site.description,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.product} — ${site.tagline}`,
    description: site.description,
  },
};

// Resolve and apply the theme before first paint to avoid a flash.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className="min-h-full flex flex-col bg-background text-foreground"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <SmoothScroll />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

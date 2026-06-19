import type { Metadata } from 'next';
import Script from 'next/script';
import { Cinzel, Crimson_Pro, JetBrains_Mono } from 'next/font/google';
import { HappySeedsWatermark } from '@/components/HappySeedsWatermark';
import './globals.css';
import GlobalOverlays from '@/components/philosophy/GlobalOverlays';

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  weight: ['400', '600', '700', '900'],
});

const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  variable: '--font-crimson',
  weight: ['400', '600'],
  style: ['normal', 'italic'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: 'Binary vs Taoist Opposition — Laegna & SpiReason',
  description: 'Explore binary, Taoist, and Laegna logic systems applied to socio-political and spiritual oppositions. Based on Tambet Väli\'s SpiReason and Laegna mathematics.',
  keywords: 'Laegna, SpiReason, Taoist logic, binary opposition, game theory, Tambet Väli, philosophy',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cinzel.variable} ${crimsonPro.variable} ${jetbrainsMono.variable}`}>
      <head>
        {process.env.NODE_ENV === 'production' && (
          <Script
            async
            src={process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL}
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
          />
        )}
      </head>
      <body>
        <GlobalOverlays />
        {children}
        <HappySeedsWatermark />
      </body>
    </html>
  );
}

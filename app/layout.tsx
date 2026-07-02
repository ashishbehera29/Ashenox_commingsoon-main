import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://ashenox.com'),
  title: 'ASHENOX — Built in Silence. Revealed with Impact.',
  description: 'Ashenox is crafting the future of branding, design, motion and digital experiences. Something worth the wait.',
  icons: {
    icon: '/fevicon.png',
  },
  openGraph: {
    title: 'ASHENOX — Built in Silence. Revealed with Impact.',
    description: 'Ashenox is crafting the future of branding, design, motion and digital experiences.',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: '#050507' }}>{children}</body>
    </html>
  );
}

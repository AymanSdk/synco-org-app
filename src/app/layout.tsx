// convex imports
import { ConvexAuthNextjsServerProvider } from '@convex-dev/auth/nextjs/server';
import { ConvexClientProvider } from '@/components/ConvexClientProvider';
// Metadata type import & Inter font import
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
// global styles
import './globals.css';

import { Modals } from '@/components/modals';
import { Toaster } from 'sonner';
import { JotaiProvider } from '@/components/jotai-provider';

//! ThemeProvider import
import { ThemeProvider } from '@/components/providers/theme-provider';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Syncro Org',
  description:
    'Syncro Org is a modern team collaboration platform designed to streamline communication and organization. Create workspaces, manage channels, and connect with your team effortlessly. Features include GitHub and Google OAuth integration, intuitive member management.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ConvexClientProvider>
              <JotaiProvider>
                <Toaster richColors position="bottom-right" />
                <Modals />
                {children}
              </JotaiProvider>
            </ConvexClientProvider>
          </ThemeProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}

import type { Metadata } from 'next';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'NoteHub — a simple app for managing personal notes',
};

interface RootLayoutProps {
  children: React.ReactNode;
  // Слот @modal: прев'ю нотатки поверх поточної сторінки
  modal: React.ReactNode;
}

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />
          {children}
          {/* Слот для модалки з деталями нотатки (перехоплення маршруту) */}
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}

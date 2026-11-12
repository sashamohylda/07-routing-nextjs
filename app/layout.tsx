import type { Metadata } from 'next';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'NoteHub — a simple app for managing personal notes',
};

export default function RootLayout({ children, modal }: LayoutProps<'/'>) {
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

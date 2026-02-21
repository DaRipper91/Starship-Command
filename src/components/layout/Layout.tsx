import { ReactNode } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gray-950 font-sans text-gray-100">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main
          id="main-content"
          tabIndex={-1}
          className="relative flex-1 overflow-auto bg-gray-900/50 p-6 outline-none"
        >
          <div className="bg-grid-white/[0.02] absolute inset-0 -z-10" />
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}

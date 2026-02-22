import React, { ReactNode, useState } from "react";
import { Header } from "./layout/Header";
import { Sidebar } from "./layout/Sidebar";
import { Footer } from "./layout/Footer";
import { ModuleList } from "./ModuleList";
import { ModuleConfig } from "./ModuleConfig";
import { ThemeGallery } from "./ThemeGallery";
import { TerminalPreview } from "./TerminalPreview";
import { ErrorBoundary } from "./ErrorBoundary";
import { cn } from "../lib/utils";

interface LayoutProps {
  children?: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [activeView, setActiveView] = useState("modules");

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
        {/* Column 1: Sidebar (Navigation) */}
        <Sidebar
          className="w-64 shrink-0 border-r border-gray-800 bg-gray-900/30"
          activeView={activeView}
          onNavigate={setActiveView}
        />

        {/* Column 2: Module List (Drag & Drop) - Only visible in Editor mode */}
        {activeView === "modules" && (
          <aside className="w-80 shrink-0 border-r border-gray-800 bg-gray-900/20 flex flex-col overflow-hidden animate-in slide-in-from-left-5 fade-in duration-300">
            <div className="p-4 border-b border-gray-800 bg-gray-900/40 backdrop-blur sticky top-0 z-10">
              <h2 className="text-sm font-semibold text-gray-300">Modules</h2>
              <p className="text-xs text-gray-500 mt-1">
                Drag to reorder prompt segments
              </p>
            </div>
            <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-700">
              <ModuleList />
            </div>
          </aside>
        )}

        {/* Column 3: Main Content (Preview + Config) */}
        <main
          id="main-content"
          tabIndex={-1}
          className="relative flex-1 overflow-y-auto bg-gray-900/50 p-6 outline-none scrollbar-thin scrollbar-thumb-gray-700"
        >
          {/* Background Grid Pattern */}
          <div className="bg-grid-white/[0.02] absolute inset-0 -z-10" />

          <ErrorBoundary>
            <div className="flex flex-col gap-8 max-w-5xl mx-auto h-full">
              {/* Terminal Preview - Always visible except maybe in pure gallery mode? keeping it for now */}
              <section className="flex flex-col gap-3 shrink-0">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-200">Live Preview</h2>
                </div>
                <TerminalPreview className="w-full" />
              </section>

              {/* Main Workspace Area */}
              <section className="flex-1 min-h-0 flex flex-col">
                {activeView === "modules" && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <ModuleConfig />
                  </div>
                )}

                {activeView === "gallery" && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full">
                    <ThemeGallery onSelect={() => setActiveView("modules")} />
                  </div>
                )}

                {activeView === "colors" && (
                   <div className="flex items-center justify-center h-64 text-gray-500 border border-dashed border-gray-800 rounded-lg">
                      <p>Global Palette Editor Coming Soon</p>
                   </div>
                )}

                {children}
              </section>
            </div>
          </ErrorBoundary>
        </main>
      </div>

      <Footer />
    </div>
  );
}

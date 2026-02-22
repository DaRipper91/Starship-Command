import React, { useState } from 'react';
import { Sidebar } from './layout/Sidebar';
import { ModuleList } from './ModuleList';
import { ModuleConfig } from './ModuleConfig';
import { TerminalPreview } from './TerminalPreview';
import { ThemeGallery } from './ThemeGallery';
import { ColorPicker } from './ColorPicker';

import { Menu, X } from 'lucide-react';

export function Layout({ children }: { children?: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState<'modules' | 'gallery' | 'colors'>(
    'modules',
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[#121212] text-gray-100 md:flex-row">
      {/* Mobile Header */}
      <div className="flex items-center justify-between border-b border-gray-800 bg-[#1e1e1e] p-4 md:hidden">
        <h1 className="text-lg font-bold text-blue-400">
          Starship Theme Creator
        </h1>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-md p-2 text-gray-400 hover:bg-gray-800 hover:text-white"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:block`}>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Main Content Area */}
      <main className="flex flex-1 flex-col overflow-hidden md:flex-row">
        {/* Left Column: List / Gallery / Colors */}
        <div
          className={`flex w-full flex-col border-r border-gray-800 bg-[#1e1e1e] md:w-80 ${activeTab === 'modules' ? '' : 'md:w-96'}`}
        >
          {activeTab === 'modules' && <ModuleList />}
          {activeTab === 'gallery' && <ThemeGallery />}
          {activeTab === 'colors' && <ColorPicker />}
        </div>

        {/* Center/Right Column: Preview & Config */}
        <div className="flex flex-1 flex-col overflow-y-auto bg-[#121212] p-4 md:p-6">
          {/* Top Half: Terminal Preview */}
          <div className="mb-6 flex-shrink-0">
            <h2 className="mb-3 text-lg font-medium text-gray-300">
              Live Preview
            </h2>
            <div className="overflow-hidden rounded-lg border border-gray-700 bg-[#0d0d0d] shadow-2xl">
              <TerminalPreview />
            </div>
          </div>

          {/* Bottom Half: Configuration (Only shown when Modules tab is active) */}
          {activeTab === 'modules' && (
            <div className="flex-1 overflow-y-auto">
              <ModuleConfig />
            </div>
          )}

          {/* Children (Modals, etc) */}
          {children}
        </div>
      </main>
    </div>
  );
}

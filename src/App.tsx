import { useState, useEffect } from 'react';
import { ToastProvider, useToast } from './contexts/ToastContext';
import { TerminalPreview } from './components/TerminalPreview';
import { ModuleList } from './components/ModuleList';
import { ModuleConfig } from './components/ModuleConfig';
import { ImagePalette } from './components/ImagePalette';
import { ExportImport } from './components/ExportImport';
import { ThemeGallery } from './components/ThemeGallery';
import { useThemeStore } from './stores/theme-store';
import { X } from 'lucide-react';

function AppContent() {
  const {
    currentTheme,
    selectedModule,
    updateMetadata,
    saveTheme,
    resetTheme,
  } = useThemeStore();
  const { addToast } = useToast();
  const [showExportImport, setShowExportImport] = useState<
    'export' | 'import' | null
  >(null);
  const [showGallery, setShowGallery] = useState(false);
  const [themeName, setThemeName] = useState(
    currentTheme.metadata.name || 'My Awesome Theme',
  );

  // Sync local theme name state with store when loaded from somewhere else
  useEffect(() => {
    setThemeName(currentTheme.metadata.name || 'My Awesome Theme');
  }, [currentTheme.metadata.id, currentTheme.metadata.name]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setThemeName(newName);
    updateMetadata({ name: newName });
  };

  const handleSave = () => {
    saveTheme();
    addToast('Theme saved successfully!', 'success');
  };

  const handleNew = () => {
    if (confirm('Create a new theme? Any unsaved changes will be lost.')) {
      resetTheme();
      setThemeName('Untitled Theme');
      addToast('Started a new theme.', 'info');
    }
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#0d1117] font-sans text-gray-100">
      {/* HEADER */}
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-800 bg-[#161b22] px-6 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-xl">🚀</span>
          <h1 className="text-lg font-bold text-gray-200">
            Starship Theme Creator
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={themeName}
            onChange={handleNameChange}
            placeholder="Theme Name"
            className="rounded border border-gray-700 bg-[#0d1117] px-3 py-1.5 text-sm text-gray-300 focus:border-blue-500 focus:outline-none"
          />
          <button
            onClick={handleNew}
            className="rounded bg-gray-800 px-4 py-1.5 text-sm font-medium hover:bg-gray-700"
          >
            New
          </button>
          <button
            onClick={() => setShowGallery(true)}
            className="rounded bg-gray-800 px-4 py-1.5 text-sm font-medium hover:bg-gray-700"
          >
            Gallery
          </button>
          <button
            onClick={handleSave}
            className="rounded bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-500"
          >
            Save
          </button>
          <button
            onClick={() => setShowExportImport('import')}
            className="rounded bg-gray-800 px-4 py-1.5 text-sm font-medium hover:bg-gray-700"
          >
            Import
          </button>
          <button
            onClick={() => setShowExportImport('export')}
            className="rounded bg-gray-800 px-4 py-1.5 text-sm font-medium hover:bg-gray-700"
          >
            Export
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT SIDEBAR */}
        <aside className="flex w-80 shrink-0 flex-col overflow-y-auto border-r border-gray-800 bg-[#161b22]">
          <div className="border-b border-gray-800 p-4">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
              Modules
            </h2>
            <ModuleList />
          </div>
          <div className="border-b border-gray-800 p-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              Colors
            </h2>
            <ImagePalette />
          </div>
        </aside>

        {/* CENTER - TERMINAL */}
        <main className="relative flex flex-1 flex-col overflow-y-auto p-8">
          <div className="bg-grid-white/[0.02] pointer-events-none absolute inset-0 -z-10" />
          <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center">
            <TerminalPreview className="w-full shadow-2xl" />
          </div>
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="flex w-80 shrink-0 flex-col overflow-y-auto border-l border-gray-800 bg-[#161b22] p-4">
          {selectedModule ? (
            <ModuleConfig />
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center rounded border border-dashed border-gray-700 p-8 text-center text-sm text-gray-500">
              <span className="mb-2 text-2xl">⚙️</span>
              Select a module to configure
            </div>
          )}
        </aside>
      </div>

      {/* MODALS */}
      {showExportImport && (
        <ExportImport
          initialTab={showExportImport}
          onClose={() => setShowExportImport(null)}
        />
      )}

      {showGallery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="flex h-[80vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-gray-700 bg-gray-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-800 bg-gray-800/50 p-4">
              <h2 className="text-lg font-bold text-white">Theme Gallery</h2>
              <button
                onClick={() => setShowGallery(false)}
                className="rounded p-1 text-gray-400 hover:bg-gray-700 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <ThemeGallery onSelect={() => setShowGallery(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}

export default App;

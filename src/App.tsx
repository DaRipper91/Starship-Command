import { ToastProvider } from './contexts/ToastContext';
import { TerminalPreview } from './components/TerminalPreview';
import { ModuleList } from './components/ModuleList';
import { ModuleConfig } from './components/ModuleConfig';
import { useThemeStore } from './stores/theme-store';

function App() {
  const { currentTheme, selectedModule } = useThemeStore();

  return (
    <ToastProvider>
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
              defaultValue={currentTheme.metadata.name || 'My Awesome Theme'}
              className="rounded border border-gray-700 bg-[#0d1117] px-3 py-1.5 text-sm text-gray-300 focus:border-blue-500 focus:outline-none"
            />
            <button className="rounded bg-gray-800 px-4 py-1.5 text-sm font-medium hover:bg-gray-700">
              New
            </button>
            <button className="rounded bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-500">
              Save
            </button>
            <button className="rounded bg-gray-800 px-4 py-1.5 text-sm font-medium hover:bg-gray-700">
              Import
            </button>
            <button className="rounded bg-gray-800 px-4 py-1.5 text-sm font-medium hover:bg-gray-700">
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
              <div className="mt-4 rounded border border-dashed border-gray-700 p-8 text-center text-sm text-gray-500">
                Color settings placeholder
              </div>
            </div>
            <div className="p-4">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                Settings
              </h2>
              <div className="mt-4 rounded border border-dashed border-gray-700 p-8 text-center text-sm text-gray-500">
                Global settings placeholder
              </div>
            </div>
          </aside>

          {/* CENTER - TERMINAL */}
          <main className="flex flex-1 flex-col overflow-y-auto p-8">
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
      </div>
    </ToastProvider>
  );
}

export default App;

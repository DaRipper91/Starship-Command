import { ToastProvider } from './contexts/ToastContext';
import { Layout } from './components/layout/Layout';
import { useUIStore } from './stores/ui-store';
import { TerminalPreview } from './components/TerminalPreview';

function App() {
  const { activeView } = useUIStore();

  const renderContent = () => {
    switch (activeView) {
      case 'preview':
        return (
          <div className="flex h-full flex-col p-6">
            <h2 className="mb-6 text-2xl font-bold">Terminal Preview</h2>
            <TerminalPreview className="flex-1" />
          </div>
        );
      case 'colors':
      case 'modules':
      case 'editor':
        return (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="mb-4 rounded-full bg-gray-800 p-4">
              <span className="text-4xl">🚧</span>
            </div>
            <h2 className="mb-2 text-2xl font-bold capitalize">{activeView}</h2>
            <p className="text-gray-400">This module is under construction.</p>
          </div>
        );
      case 'welcome':
      default:
        return (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <h2 className="mb-4 text-3xl font-bold">
              Welcome to Starship Theme Creator
            </h2>
            <p className="max-w-md text-gray-400">
              Start by exploring the modules in the sidebar or check out the
              colors tab.
            </p>
          </div>
        );
    }
  };

  return (
    <ToastProvider>
      <Layout>
        <div role="tabpanel" className="h-full">
          {renderContent()}
        </div>
      </Layout>
    </ToastProvider>
  );
}

export default App;

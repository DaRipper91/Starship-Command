import { Layout } from './components/layout/Layout';
import { TerminalPreview } from './components/TerminalPreview';

function App() {
  return (
    <Layout>
      <div className="flex h-full flex-col gap-6">
        <div className="min-h-0 flex-1">
          <TerminalPreview className="h-full" />
        </div>

        {/* Placeholder for configuration panel */}
        <div className="h-1/3 rounded-lg border border-gray-800 bg-gray-900/50 p-6">
          <h3 className="mb-4 text-lg font-medium text-gray-300">
            Configuration
          </h3>
          <p className="text-sm text-gray-500">
            Select a module from the sidebar to start editing. (Configuration UI
            coming in Checkpoint 4 & 5)
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default App;

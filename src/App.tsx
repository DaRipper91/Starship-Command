import { Layout } from './components/layout/Layout';

function App() {
  return (
    <Layout>
      <div className="flex h-full flex-col items-center justify-center text-center">
        <h2 className="mb-4 text-3xl font-bold">
          Welcome to Starship Theme Creator
        </h2>
        <p className="max-w-md text-gray-400">
          Start by exploring the modules in the sidebar or check out the colors
          tab.
        </p>
      </div>
    </Layout>
  );
}

export default App;

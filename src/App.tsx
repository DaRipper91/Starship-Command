import { TerminalPreview } from './components/TerminalPreview';

function App() {
  return (
    <div className="h-screen w-screen p-8 bg-gray-900 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-white mb-6">Starship Theme Creator</h1>
      <div className="w-full max-w-4xl h-[500px]">
        <TerminalPreview />
      </div>
    </div>
  );
}

export default App;

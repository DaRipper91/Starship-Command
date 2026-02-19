import { Header } from './components/layout/Header';
import { LeftSidebar } from './components/layout/LeftSidebar';
import { RightSidebar } from './components/layout/RightSidebar';
import { TerminalPreview } from './components/TerminalPreview';

function App() {
  return (
    <div className="flex h-screen flex-col bg-gray-950 font-sans text-gray-100">
      <Header />

      <div className="flex flex-1 flex-col overflow-auto md:flex-row md:overflow-hidden">
        {/* Left Sidebar */}
        <LeftSidebar className="h-96 w-full shrink-0 border-b border-gray-800 md:h-full md:w-80 md:border-b-0 md:border-r" />

        {/* Main Content */}
        <main className="flex min-h-[400px] flex-1 flex-col bg-gray-950 p-4 md:p-6">
          <TerminalPreview className="h-full min-h-[300px] w-full" />
        </main>

        {/* Right Sidebar */}
        <RightSidebar className="h-96 w-full shrink-0 border-t border-gray-800 md:h-full md:w-80 lg:border-l lg:border-t-0" />
      </div>
    </div>
  );
}

export default App;

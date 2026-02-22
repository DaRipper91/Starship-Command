import { Layout } from "./components/Layout";
import { ToastProvider } from "./contexts/ToastContext";

function App() {
  return (
    <ToastProvider>
      <Layout>
        {/* Children passed to layout are rendered at the bottom if needed, but main views are handled by Layout state now */}
      </Layout>
    </ToastProvider>
  );
}

export default App;

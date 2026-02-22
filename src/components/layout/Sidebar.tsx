import { cn } from "../../lib/utils";
import { Settings, Palette, Terminal, FileCode, LayoutGrid } from "lucide-react";

interface SidebarProps {
  className?: string;
  activeView?: string;
  onNavigate?: (view: string) => void;
}

export function Sidebar({ className, activeView = "modules", onNavigate }: SidebarProps) {
  const navItems = [
    { id: "modules", icon: Settings, label: "Modules" },
    { id: "gallery", icon: LayoutGrid, label: "Gallery" },
    { id: "colors", icon: Palette, label: "Colors" },
    // { id: "preview", icon: Terminal, label: "Preview" }, // Preview is always visible
  ];

  return (
    <aside
      className={cn(
        "flex w-64 flex-col border-r border-gray-800 bg-gray-900/30",
        className,
      )}
    >
      <nav className="space-y-2 p-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate?.(item.id)}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
              activeView === item.id
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto border-t border-gray-800 p-4">
        <div className="text-xs text-gray-600">v0.1.0 Alpha</div>
      </div>
    </aside>
  );
}

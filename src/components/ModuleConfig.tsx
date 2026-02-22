import React from "react";
import { useThemeStore } from "../stores/theme-store";
import { StarshipConfig } from "../types/starship.types";
import { cn } from "../lib/utils";
import { Info, AlertCircle } from "lucide-react";
import { StyleEditor } from "./StyleEditor";

export function ModuleConfig() {
  const { currentTheme, selectedModule, updateConfig } = useThemeStore();

  if (!selectedModule) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-lg border border-dashed border-gray-700 bg-gray-900/20 p-8 text-center">
        <Info className="mb-3 h-10 w-10 text-gray-500" />
        <h3 className="text-lg font-medium text-gray-300">No Module Selected</h3>
        <p className="mt-1 text-sm text-gray-500">
          Select a module from the list to edit its configuration.
        </p>
      </div>
    );
  }

  // Safe access to module config
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const moduleConfig = (currentTheme.config as any)[selectedModule] || {};

  const handleChange = (key: string, value: string | boolean | number) => {
    updateConfig({
      [selectedModule]: {
        ...moduleConfig,
        [key]: value,
      },
    });
  };

  return (
    <div className="flex flex-col gap-6 rounded-lg border border-gray-700 bg-[#1e1e1e] p-6 shadow-xl">
      <div className="flex items-center justify-between border-b border-gray-700 pb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-100 capitalize">
            {selectedModule.replace(/_/g, " ")}
          </h2>
          <p className="text-sm text-gray-500">Module Configuration</p>
        </div>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={moduleConfig.disabled === true}
              onChange={(e) => handleChange("disabled", e.target.checked)}
              className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
            />
            Disabled
          </label>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Style Configuration */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-300">
            Style
          </label>
          <StyleEditor
            value={moduleConfig.style || ""}
            onChange={(val) => handleChange("style", val)}
          />
        </div>

        {/* Symbol Configuration */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-300">
            Symbol
          </label>
          <input
            type="text"
            value={moduleConfig.symbol || ""}
            onChange={(e) => handleChange("symbol", e.target.value)}
            placeholder="e.g. ❯ "
            className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Format Configuration - Full Width */}
        <div className="col-span-2 space-y-3">
          <label className="block text-sm font-medium text-gray-300">
            Format String
          </label>
          <input
            type="text"
            value={moduleConfig.format || ""}
            onChange={(e) => handleChange("format", e.target.value)}
            placeholder="e.g. [$symbol$version]($style) "
            className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
          />
          <div className="flex items-start gap-2 rounded bg-blue-900/20 p-2 text-xs text-blue-200">
            <Info className="h-4 w-4 shrink-0 mt-0.5" />
            <p>
              Variables: <code className="bg-blue-900/40 px-1 py-0.5 rounded">$symbol</code>, <code className="bg-blue-900/40 px-1 py-0.5 rounded">$style</code>, plus module-specific variables.
            </p>
          </div>
        </div>

        {/* Additional Properties based on Module Type */}
        {selectedModule === "directory" && (
           <div className="col-span-2 space-y-4 pt-4 border-t border-gray-700">
             <h3 className="text-sm font-medium text-gray-400">Directory Options</h3>
             <div className="grid gap-4 md:grid-cols-2">
               <div className="space-y-1">
                 <label className="block text-xs text-gray-500">Truncation Length</label>
                 <input
                   type="number"
                   value={moduleConfig.truncation_length ?? 3}
                   onChange={(e) => handleChange("truncation_length", parseInt(e.target.value))}
                   className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                 />
               </div>
               <div className="flex items-center h-full pt-4">
                 <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer select-none">
                   <input
                     type="checkbox"
                     checked={moduleConfig.truncate_to_repo === true}
                     onChange={(e) => handleChange("truncate_to_repo", e.target.checked)}
                     className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
                   />
                   Truncate to Repo Root
                 </label>
               </div>
             </div>
           </div>
        )}
      </div>
    </div>
  );
}

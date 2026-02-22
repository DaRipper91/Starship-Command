// import React, { useState } from 'react';
// import { useThemeStore } from '../../stores/theme-store';
// import { MODULE_DEFINITIONS } from '../../lib/module-definitions';
// import { Plus, Terminal, Settings, FileText, Type, Info, X } from 'lucide-react';
// import { StyleEditor } from '../StyleEditor';
// import { IconBrowser } from '../IconBrowser';
// import { FormatEditor } from '../FormatEditor';
// import { CustomModuleConfig } from '../../types/starship.types';
// import { cn } from '../../lib/utils';
// import { useToast } from '../../contexts/ToastContext';

// interface CustomModuleCreatorProps {
//   onClose: () => void;
// }

// export function CustomModuleCreator({ onClose }: CustomModuleCreatorProps) {
//   const { updateConfig, currentTheme } = useThemeStore();
//   const { addToast } = useToast();

//   const [moduleId, setModuleId] = useState('');
//   const [displayName, setDisplayName] = useState('');
//   const [description, setDescription] = useState('');
//   const [category, setCategory] = useState(MODULE_DEFINITIONS[0].category);
//   const [icon, setIcon] = useState('');
//   const [command, setCommand] = useState('');
//   const [when, setWhen] = useState('');
//   const [style, setStyle] = useState('white');
//   const [format, setFormat] = useState('$symbol$output');
//   const [shell, setShell] = useState<string[]>([]);
//   const [showIconBrowser, setShowIconBrowser] = useState(false);

//   const handleSave = () => {
//     if (!moduleId || !command) {
//       addToast('Module ID and Command are required.', 'error');
//       return;
//     }

//     const newCustomModule: CustomModuleConfig = {
//       command,
//       when: when || undefined,
//       style: style || undefined,
//       format: format || undefined,
//       shell: shell.length > 0 ? shell : undefined,
//       description: description || undefined,
//       symbol: icon || undefined,
//     };

//     updateConfig({
//       custom: {
//         ...(currentTheme.config.custom || {}),
//         [moduleId]: newCustomModule,
//       },
//     });

//     addToast(`Custom module "${displayName || moduleId}" created!`, 'success');
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
//       <div className="flex w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-gray-700 bg-gray-900 shadow-2xl">
//         <div className="flex items-center justify-between border-b border-gray-800 bg-gray-800/50 p-4">
//           <h2 className="text-lg font-bold text-white">Create Custom Module</h2>
//           <button
//             onClick={onClose}
//             className="rounded p-1 text-gray-400 hover:bg-gray-700 hover:text-white"
//           >
//             <X size={20} />
//           </button>
//         </div>

//         <div className="flex-1 overflow-y-auto p-6">
//           <div className="grid gap-6 md:grid-cols-2">
//             {/* Basic Info */}
//             <div className="space-y-3">
//               <label className="block text-sm font-medium text-gray-300">Module ID (e.g., my_custom_module)</label>
//               <input
//                 type="text"
//                 value={moduleId}
//                 onChange={(e) => setModuleId(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
//                 placeholder="Unique ID (snake_case)"
//                 className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
//               />
//             </div>
//             <div className="space-y-3">
//               <label className="block text-sm font-medium text-gray-300">Display Name</label>
//               <input
//                 type="text"
//                 value={displayName}
//                 onChange={(e) => setDisplayName(e.target.value)}
//                 placeholder="e.g., My Custom Tool"
//                 className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
//               />
//             </div>

//             {/* Description */}
//             <div className="col-span-2 space-y-3">
//               <label className="block text-sm font-medium text-gray-300">Description</label>
//               <textarea
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 placeholder="A short description of what this module does..."
//                 rows={2}
//                 className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-y"
//               />
//             </div>

//             {/* Category and Icon */}
//             <div className="space-y-3">
//               <label className="block text-sm font-medium text-gray-300">Category</label>
//               <select
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value as CustomModuleConfig['category'] || MODULE_DEFINITIONS[0].category)}
//                 className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
//               >
//                 {[...new Set(MODULE_DEFINITIONS.map(m => m.category))].map(cat => (
//                   <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
//                 ))}
//               </select>
//             </div>
//             <div className="relative space-y-3">
//               <label className="block text-sm font-medium text-gray-300">Icon/Symbol</label>
//               <div className="flex gap-2">
//                 <input
//                   type="text"
//                   value={icon}
//                   onChange={(e) => setIcon(e.target.value)}
//                   placeholder="🚀"
//                   className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
//                 />
//                 <button
//                   onClick={() => setShowIconBrowser(!showIconBrowser)}
//                   className="shrink-0 rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700"
//                 >
//                   Browse
//                 </button>
//               </div>
//               {showIconBrowser && (
//                 <div className="absolute left-0 top-full z-50 mt-1 w-full sm:w-[400px]">
//                   <IconBrowser
//                     currentSymbol={icon}
//                     onSelect={(selectedIcon) => {
//                       setIcon(selectedIcon);
//                       setShowIconBrowser(false);
//                     }}
//                   />
//                 </div>
//               )}
//             </div>

//             {/* Command */}
//             <div className="col-span-2 space-y-3">
//               <label className="block text-sm font-medium text-gray-300">Command to execute</label>
//               <textarea
//                 value={command}
//                 onChange={(e) => setCommand(e.target.value)}
//                 placeholder="e.g., echo 'Hello from custom module'"
//                 rows={3}
//                 className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-y font-mono"
//               />
//               <div className="flex items-start gap-2 rounded bg-blue-900/20 p-2 text-xs text-blue-200">
//                 <Info className="mt-0.5 h-4 w-4 shrink-0" />
//                 <p>
//                   This command's `stdout` will be the module's output. Use `$symbol` and `$output` in the format string.
//                 </p>
//               </div>
//             </div>

//             {/* When Condition */}
//             <div className="col-span-2 space-y-3">
//               <label className="block text-sm font-medium text-gray-300">When condition (optional)</label>
//               <input
//                 type="text"
//                 value={when}
//                 onChange={(e) => setWhen(e.target.value)}
//                 placeholder="e.g., git_branch.is_detached"
//                 className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
//               />
//               <div className="flex items-start gap-2 rounded bg-blue-900/20 p-2 text-xs text-blue-200">
//                 <Info className="mt-0.5 h-4 w-4 shrink-0" />
//                 <p>
//                   A condition string that must evaluate to `true` for the module to be shown. Supports Starship's `when` syntax.
//                 </p>
//               </div>
//             </div>

//             {/* Style and Format */}
//             <div className="col-span-2 grid gap-4 md:grid-cols-2">
//               <div className="space-y-3">
//                 <label className="block text-sm font-medium text-gray-300">Default Style</label>
//                 <StyleEditor value={style} onChange={setStyle} />
//               </div>
//               <div className="space-y-3">
//                 <label className="block text-sm font-medium text-gray-300">Format String</label>
//                 <FormatEditor formatString={format} onChange={setFormat} />
//                 <div className="flex items-start gap-2 rounded bg-blue-900/20 p-2 text-xs text-blue-200">
//                   <Info className="mt-0.5 h-4 w-4 shrink-0" />
//                   <p>
//                     Use `$symbol` and `$output` variables. e.g., `[$symbol$output]($style)`
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Shell (optional) */}
//             <div className="col-span-2 space-y-3">
//               <label className="block text-sm font-medium text-gray-300">Shell (optional, space-separated)</label>
//               <input
//                 type="text"
//                 value={shell.join(' ')}
//                 onChange={(e) => setShell(e.target.value.split(' ').filter(s => s))}
//                 placeholder="e.g., bash zsh"
//                 className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
//               />
//               <div className="flex items-start gap-2 rounded bg-blue-900/20 p-2 text-xs text-blue-200">
//                 <Info className="mt-0.5 h-4 w-4 shrink-0" />
//                 <p>
//                   Specify shells where this custom module should run (e.g., `bash`, `zsh`, `fish`).
//                 </p>
//               </div>
//             </div>

//           </div>
//         </div>

//         <div className="flex justify-end gap-3 border-t border-gray-800 bg-gray-800/50 p-4">
//           <button
//             onClick={onClose}
//             className="rounded bg-gray-700 px-4 py-2 text-sm font-medium text-gray-200 hover:bg-gray-600"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSave}
//             className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
//           >
//             Create Module
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

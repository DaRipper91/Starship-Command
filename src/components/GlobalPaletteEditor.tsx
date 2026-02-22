// import React, { useState, useEffect } from 'react';
// import { useThemeStore } from '../stores/theme-store';
// import { ColorPicker } from '../ColorPicker';
// import { ColorPalette } from '../../types/starship.types';
// import { Plus, Trash2, Palette as PaletteIcon } from 'lucide-react';
// import { cn } from '../../lib/utils';

// const DEFAULT_GLOBAL_COLORS: (keyof ColorPalette)[] = [
//   'primary',
//   'secondary',
//   'accent',
//   'background',
//   'foreground',
//   'success',
//   'error',
//   'warning',
// ];

// export function GlobalPaletteEditor() {
//   const { currentTheme, updateConfig } = useThemeStore();
//   const [customColors, setCustomColors] = useState<string[]>([]);

//   // Initialize custom colors from theme config
//   useEffect(() => {
//     const themeGlobalPalette = currentTheme.config.palettes?.global || {};
//     const existingCustomKeys = Object.keys(themeGlobalPalette).filter(
//       (key) => !DEFAULT_GLOBAL_COLORS.includes(key as keyof ColorPalette)
//     );
//     setCustomColors(existingCustomKeys);
//   }, [currentTheme.config.palettes]);

//   const getGlobalColor = (key: keyof ColorPalette | string): string => {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     return (currentTheme.config.palettes?.global as any)?.[key] || '#ffffff';
//   };

//   const handleColorChange = (key: keyof ColorPalette | string, newColor: string) => {
//     updateConfig({
//       palettes: {
//         ...currentTheme.config.palettes,
//         global: {
//           ...currentTheme.config.palettes?.global,
//           [key]: newColor,
//         },
//       },
//     });
//   };

//   const handleAddCustomColor = () => {
//     const newKey = `customColor${customColors.length + 1}`;
//     setCustomColors(prev => [...prev, newKey]);
//     handleColorChange(newKey, '#cccccc'); // Default for new custom color
//   };

//   const handleRemoveCustomColor = (keyToRemove: string) => {
//     setCustomColors(prev => prev.filter(key => key !== keyToRemove));

//     // Remove from theme config as well
//     const newGlobalPalette = { ...currentTheme.config.palettes?.global };
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     delete (newGlobalPalette as any)[keyToRemove];
//     updateConfig({
//       palettes: {
//         ...currentTheme.config.palettes,
//         global: newGlobalPalette,
//       },
//     });
//   };

//   return (
//     <div className="flex flex-col gap-6 p-4">
//       <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
//         <PaletteIcon size={20} className="text-green-500" /> Global Color Palette
//       </h2>

//       <div className="grid grid-cols-2 gap-4">
//         {DEFAULT_GLOBAL_COLORS.map((key) => (
//           <ColorPicker
//             key={key}
//             label={key.charAt(0).toUpperCase() + key.slice(1)}
//             color={getGlobalColor(key)}
//             onChange={(newColor) => handleColorChange(key, newColor)}
//           />
//         ))}
//       </div>

//       {customColors.length > 0 && (
//         <div className="mt-4 flex flex-col gap-4 border-t border-gray-800 pt-4">
//           <h3 className="text-md font-semibold text-gray-300">Custom Colors</h3>
//           <div className="grid grid-cols-2 gap-4">
//             {customColors.map((key) => (
//               <div key={key} className="relative group">
//                 <ColorPicker
//                   label={key.charAt(0).toUpperCase() + key.slice(1)}
//                   color={getGlobalColor(key)}
//                   onChange={(newColor) => handleColorChange(key, newColor)}
//                 />
//                 <button
//                   onClick={() => handleRemoveCustomColor(key)}
//                   className="absolute -right-2 -top-2 rounded-full bg-red-600 p-1 text-white opacity-0 transition-opacity hover:bg-red-500 group-hover:opacity-100"
//                   title="Remove custom color"
//                 >
//                   <Trash2 size={12} />
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       <button
//         onClick={handleAddCustomColor}
//         className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-700 bg-gray-800 py-2 text-sm text-gray-300 hover:bg-gray-700"
//       >
//         <Plus size={16} /> Add Custom Color
//       </button>
//     </div>
//   );
// }

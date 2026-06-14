## 2024-05-13 - [Focus styles & ARIA labels missing from primary header layout buttons]

**Learning:** Found several top-level header buttons in App.tsx (e.g. Menu, Command Palette, Settings, View modes, Undo, Redo) that use icons but lack aria-labels. They also lack explicit `focus-visible` styling which reduces accessibility for keyboard navigation.
**Action:** Will implement proper aria-labels and consider focus-visible styles where appropriate for these highly trafficked buttons.

## 2024-05-13 - [Focus styles & ARIA labels missing from modal instances and sub-components]

**Learning:** Found several close buttons within Modals that lacked aria-labels and explicit `focus-visible` styling which reduces accessibility for keyboard navigation. I also noticed some other icon-only buttons like those in IconBrowser lacking `aria-label`.
**Action:** Will ensure to implement proper aria-labels and focus-visible styles for close buttons on any new modal instance components in the future.

## 2024-05-13 - [Focus styles missing from top-level header buttons in App.tsx]

**Learning:** While reviewing accessibility, I noticed that several icon-only header buttons (Left Sidebar, Command Palette, Right Sidebar, Undo, Redo, Dynamic Theme Settings) and the Theme Gallery close button in `src/App.tsx` lacked explicit `focus-visible` styles, which makes keyboard navigation difficult. The Theme Gallery close button was also missing an `aria-label`.
**Action:** Added `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500` to these buttons and an `aria-label="Close Theme Gallery"` to improve accessibility.

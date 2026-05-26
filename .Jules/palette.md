## 2024-05-26 - Add missing aria-labels to close buttons
**Learning:** Found multiple instances where the icon-only `<X />` close button did not have `aria-label`s set across modal dialogs like ThemeUploadModal, AuthModal and App Theme Gallery.
**Action:** When adding close button or any icon only buttons, always include `aria-label`.

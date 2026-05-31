## 2026-05-31 - Missing aria-labels on Custom Modals

**Learning:** The application implements several custom modals (AuthModal, ThemeUploadModal) that use an icon-only `<X size={20} />` close button. However, while some standardized components like `src/components/ui/Modal.tsx` have `aria-label="Close modal"`, these custom standalone modals omitted the aria-label entirely, creating an accessibility issue for screen readers interacting with modal dialogs.
**Action:** When implementing or reviewing custom modal components that deviate from the standard `ui/Modal`, specifically verify that the close button includes an appropriate `aria-label` attribute.

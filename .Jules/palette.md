## 2024-05-24 - Dynamic Tooltips for Icon Buttons

**Learning:** For icon-only buttons with disabled states (like Undo/Redo), providing dynamic `aria-label` and `title` attributes that change based on the disabled state (e.g. from "Undo (Ctrl+Z)" to "Nothing to undo") is significantly more helpful for accessibility and general UX than a static label. It clearly explains _why_ the button is disabled.
**Action:** Always verify if an icon button has a disabled state. If it does, ensure the tooltip/aria-label dynamically explains both the active action and the reason for being disabled.

## 2024-05-15 - [Added missing ARIA labels to Auth and Upload modals]
**Learning:** [Missing ARIA labels on icon-only close buttons are a common accessibility anti-pattern in React modals that use lucide-react icons, making them invisible to screen readers.]
**Action:** [Always check for missing `aria-label` attributes when using `<X size={20} />` or similar icon-only buttons as close actions across all modal components.]

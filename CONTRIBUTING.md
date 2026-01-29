# Contributing to Mazdoor Connect

We welcome contributions! To keep the codebase clean and consistent, please follow these guidelines.

## 🛠️ Code Style & Standards

### JavaScript vs JSX
- Use `.jsx` for any file containing React components.
- Use `.js` for utility functions, constants, or Redux slices.

### Component Definitions
- Favor **Functional Components** with the `function` keyword.
- **Pages**: Use `export default function PageName()` at the top-level.
- **UI Components**: Use named exports `export function ComponentName()`.

### Imports & Path Aliases
- Always use the `@/` alias for internal imports.
- **Incorrect**: `import Button from '../../components/ui/button'`
- **Correct**: `import { Button } from '@/components/ui/button'`

### State Management
- Use **Redux** for global state (Auth, Bookings).
- Use **React Context** for UI-specific global state (I18n, Theme).
- Use **Local State** (`useState`) for component-specific UI logic (forms, toggles).

## 📁 Directory Structure
- `src/components/ui`: Atomic UI components (Buttons, Inputs).
- `src/components/layout`: Structural components (Header, Footer).
- `src/pages`: Full-page views mapped to routes.
- `src/lib`: Logic, constants, and utilities.
- `src/store`: Redux slices and store configuration.

## 🧪 Testing Your Changes
Before submitting a pull request, ensure the project builds correctly:
```bash
npm run build
```
Check for any console errors in the browser while running:
```bash
npm run dev
```

---

Thank you for helping make Mazdoor Connect better!

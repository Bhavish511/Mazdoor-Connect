# Mazdoor Connect Architecture

This document outlines the technical architecture and design patterns used in the Mazdoor Connect Frontend.

## 🏛️ Core Principles

1.  **Semantic Structure**: Use of HTML5 elements and meaningful component names for SEO and accessibility.
2.  **Centralized State**: Redux is used for cross-component state (auth, bookings), while Context is used for app-wide UI logic (I18n).
3.  **Alias Imports**: All internal paths use the `@/` alias to avoid directory nesting complexity.

## 🔄 State Management

### Redux Toolkit (src/store)
We use Redux for data that persists across many pages:
- **authSlice**: Handles user login state, token (mocked), and profile data.
- **workersSlice**: Manages the list of professionals and filtering logic.
- **bookingsSlice**: Tracks the status of service requests.

### App Context (src/context)
We use `app-context.jsx` for:
- Internationalization (I18n) translation helpers (`t` function).
- Theme and language preferences.
- Global UI triggers.

## 🎨 Styling System
We use **Tailwind CSS v4**. 
- Modern HSL-based color tokens.
- Glassmorphism effects in the Header.
- Responsive grids for mobile-first accessibility on varying devices common in Pakistan.

## 🗺️ Routing
Handled by `react-router-dom`:
- **Public**: Home, Categories, Detail.
- **Auth**: Login, Signup.
- **Protected**: Dashboards (Worker/Customer/Admin).

## 🛠️ Development Patterns
- **Standardized Exports**: All components use `export default function Name()`.
- **Absolute Imports**: Always use `@/components/...`.
- **Mock Implementation**: Currently uses a high-fidelity mock backend in `src/lib/mock-data.js` for rapid prototyping.

---
name: Spring icon direct usage fails React 19 SVG types
description: Why direct <SomeMd .../> usage type-errors in mockup-sandbox and the wrapper fix
---

# Direct Spring-icon JSX usage triggers TS2739 under React 19

Rendering a `@ringcentral/spring-icon` component directly (e.g.
`<ArrowLeftMd width={24} height={24} fill="currentColor" aria-hidden focusable={false} />`)
fails `tsc` with TS2739: missing `onPointerEnterCapture` / `onPointerLeaveCapture`.

**Why:** React 19's `SVGProps` makes those pointer-capture handlers part of the
component's own (stricter) prop type. The icon package's exported component type
requires them, so a literal props object that omits them is rejected.

**How to apply:** Route the icon through a wrapper whose prop type is the looser
`React.ComponentType<React.SVGProps<SVGSVGElement>>` (function-component prop
contravariance makes the assignment legal and the handlers optional):
```tsx
type IconCmp = React.ComponentType<React.SVGProps<SVGSVGElement>>;
const SpringIcon = ({ as: Cmp, size = 20 }: { as: IconCmp; size?: number }) => (
  <Cmp width={size} height={size} fill="currentColor" aria-hidden focusable={false} />
);
// use: <SpringIcon as={ArrowLeftMd} size={24} />
```
Icons rendered via `SpringIcon`/`FeatureIcon` never error; only direct JSX usage does.
Vite/esbuild ignores this (runtime is fine), so it only surfaces under `tsc --noEmit`.

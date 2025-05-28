# Agent Guidelines

## Commands
- **Build**: `npm run build` (production build)
- **Dev**: `npm run dev` (development with turbopack)
- **Lint**: `npm run lint` (ESLint check)
- **Type check**: `npx tsc --noEmit` (TypeScript type checking)
- **Performance test**: `npm run performance:test`
- **Performance analysis**: `npm run performance:analyze`

## Code Style
- **Framework**: Next.js 15 with TypeScript, React 19, Tailwind CSS
- **Path aliases**: Use `@/` for src directory imports
- **Components**: Use React.forwardRef for reusable UI components
- **Styling**: Tailwind CSS with shadcn/ui components, use `cn()` utility for conditional classes
- **Types**: Prefer interfaces over types, use proper TypeScript annotations
- **Props**: Define explicit interface types for component props
- **Error handling**: Use try/catch blocks, return early patterns
- **Client components**: Mark with `'use client'` directive when needed
- **Comments**: JSDoc style for functions, inline for complex logic only
- **Naming**: camelCase for variables/functions, PascalCase for components/types
- **File structure**: Group related files in feature directories under src/
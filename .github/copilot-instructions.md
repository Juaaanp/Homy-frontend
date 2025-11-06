# Homy Frontend — AI agent quickstart

This file gives an immediately actionable surface for code-writing agents to be productive in this repo. Keep edits here short and only add project-discoverable facts.

Key facts
- Stack: Angular 20 using standalone components, Bootstrap 5 for UI, Karma for unit tests. Entry point: `src/main.ts` (bootstraps `App` via `bootstrapApplication`).
- Package manager: pnpm (see `pnpm-lock.yaml`). Preferred scripts: `pnpm start`, `pnpm test`, `pnpm build`.

Important code layout (read before editing)
- Root app files live under `src/app/services/` (nonstandard): `app.ts`, `app.html`, `app.css`, `app.config.ts` (providers), and `app.routes.ts` (central route table).
- Pages: `src/app/pages/<name>/<name>.{ts,html,css}`. Pages are `standalone: true` and listed directly in `app.routes.ts`.
- Shared UI components: `src/app/components/<component>/{*.ts,*.html,*.css}`. Import component classes in a page's `imports` array rather than adding to NgModules.

Patterns to follow (explicit examples)
- Standalone components: every page/component should be `standalone: true` and list dependencies in `imports`. Example: `Home` imports `CommonModule` and `CurrencyPipe`.
- Routing: `app.routes.ts` maps routes directly to components (no NgModules). To add a page: create `src/app/pages/foo/foo.ts` (standalone) and add `{ path: 'foo', component: Foo }` to `app.routes.ts`.
- State: use Angular Signals for simple local state (e.g., `App.title = signal('homy')`). Keep markup in `.html` and styles in `.css`.

Dev workflows & commands
- Install deps: `pnpm install`
- Start dev server: `pnpm start` (runs `ng serve`, dev server at http://localhost:4200)
- Run unit tests: `pnpm test` (Karma)
- Build production: `pnpm build` (output in `dist/`)

Conventions agents must respect
- Keep changes minimal and confined to a feature folder. Preserve existing file layout and naming conventions.
- Use existing shared components (import the component class into `imports`) instead of duplicating UI.
- Prefer editing `app.routes.ts` for route wiring. Do not create or remove global providers in `app.config.ts` without checking `src/main.ts` and `app.config.ts` first.

Where to look for examples
- Routing and app wiring: `src/app/services/app.routes.ts`, `src/app/services/app.config.ts`, `src/main.ts`.
- Page + component patterns: any folder under `src/app/pages/*` and `src/app/components/*` (their `.ts` files show `standalone: true` and `imports`).
- Tests: `tsconfig.spec.json` and Karma configuration in `package.json` / `angular.json`.

Small actionable examples
- Add a route: add `src/app/pages/checkout/checkout.ts` (standalone) and then in `app.routes.ts` add `{ path: 'checkout', component: Checkout }`.
- Use a shared UI component in a page: in `src/app/pages/home/home.ts` add `imports: [CommonModule, ButtonComponent]` and use `<lib-button></lib-button>` in `home.html` (check component `.ts` for the selector).

If unsure: open `src/app/services/app.routes.ts` and a sample page under `src/app/pages/` — those show canonical patterns.

After updating this file: ask a human reviewer to confirm larger architectural changes (providers, global state, route reshapes).

---
If you want this shortened further or to include more examples (add/remove route diff, sample standalone component), tell me which area to expand.

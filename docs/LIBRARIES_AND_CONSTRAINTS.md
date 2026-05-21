# Nexa Web — Libraries and Constraints

Inventory of dependencies and hard project rules.

**See also:** [AI_RULES.md](./AI_RULES.md) (master conventions) · [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) · [README.md](./README.md)

---

## Libraries

Prefer libraries already wired in the feature you touch. Do not add new UI frameworks.

| Category | Package | Use in nexa-web |
|----------|---------|-----------------|
| **Framework** | `@angular/*` ^21.2 | Standalone app; `bootstrapApplication`; `@angular/build:application` |
| **CDK** | `@angular/cdk` | Available; use only if existing patterns do (no new CDK-heavy UI without need) |
| **State** | `@ngrx/store`, `@ngrx/effects` ^21 | **Only** `customers/` and `wallets/` `state/` |
| **Auth** | `@auth0/auth0-angular` | Login, guards, HTTP token interceptor for `environemnt.apiUrl/*` |
| **UI** | `primeng`, `primeicons`, `@primeuix/themes` | Primary component library; theme via `appThemePreset` in `ng-prime.theme.ts` |
| **CSS** | `tailwindcss`, `@tailwindcss/postcss`, `@tailwindcss/typography` | Global utilities in templates; entry `src/styles/styles.scss` |
| **i18n** | `@ngx-translate/core`, `@ngx-translate/http-loader` | Runtime strings: `src/assets/i18n/en.json`; separate from `@angular/localize` polyfill |
| **Icons** | `@ng-icons/core`, `@ng-icons/heroicons`, `@ng-icons/feather-icons`, `lucide-angular` | Template icons; import per component |
| **Forms / phone** | `google-libphonenumber`, `libphonenumber-js` | `shared/components/phone-input` validator |
| **Forms / phone** | `ngx-intl-tel-input` | In package.json; prefer existing custom `PhoneInput` unless extending tel UX |
| **Payments** | `@stripe/stripe-js` | `features/banks/services/stripe.service.ts` |
| **KYC** | ComplyCube (global CSS/JS in `angular.json`) | `features/onboarding/services/comply-cube.service.ts` |
| **Bootstrap** | `ngx-bootstrap` | Listed in package.json; **not referenced in `src/`** — do not introduce without explicit request |
| **RxJS** | `rxjs` ~7.8 | Services, effects, guards |
| **Test (dev)** | `vitest`, `@analogjs/vite-plugin-angular`, `@testing-library/angular`, `jsdom` | `ng test`; `vitest-base.config.ts`, `src/test-setup.ts` |

### Angular patterns (with above libraries)

- **Angular 21** — standalone components, signals, `loadComponent` routing
- **TypeScript 5.9** — see Constraints below
- Signals + `inject()` preferred for new smart code; PrimeNG modules imported per component
- **Prettier** — see Formatting below

---

## Constraints

### TypeScript (`tsconfig.json`)

- `strict: true`, `strictNullChecks`
- `strictPropertyInitialization: false` (allows uninitialized class fields)
- `noImplicitOverride`, `noImplicitReturns`, `noFallthroughCasesInSwitch`
- `target: ES2022`, `module: preserve`

### Angular compiler (`tsconfig.json` → `angularCompilerOptions`)

- `strictInjectionParameters: true`
- `strictInputAccessModifiers: true`
- `strictTemplates: true`
- `enableI18nLegacyMessageIdFormat: false`

### Angular build (`angular.json`)

- Component prefix: `app`
- Default style: `scss` (per-component `styleUrl`)
- Production bundle budgets:
  - Initial: 500kB warning / 1MB error
  - Any component style: 4kB warning / 8kB error
- Polyfill: `@angular/localize/init` (build-time i18n, not ngx-translate)

### Formatting (`.prettierrc`, `.editorconfig`)

- 2 spaces, UTF-8, final newline, trim trailing whitespace
- TypeScript: single quotes
- Prettier: `printWidth: 80`, `semi: true`, `trailingComma: all`, `arrowParens: avoid`, `singleAttributePerLine: true`, `bracketSameLine: true`, Angular HTML parser for `*.html`

### Architecture (must follow)

- Standalone components only; no NgModules
- Feature-first under `src/app/features/`; routable features need `*.feature.ts` + routing + `app.config.ts` registration
- NgRx limited to **customers** and **wallets**
- Wallets: no routes; embed via containers (dashboard)
- HTTP: `environemnt.apiUrl`; interceptors `errorHandlerInterceptorFn` + `authHttpInterceptorFn`
- Auth0 + `customerGuardFn` on PublicLayout routes (`/`, `/customer`, `/transfers`, `/banks`)
- Minimal diffs; preserve known typos unless asked to fix

### Preserve unless asked to fix

- `environemnt` (env file and imports)
- `CUSTOMER_KEY_FEAUTRE`
- `pips/` folder in banks (not `pipes/`)
- Duplicate `provideHttpClient()` in `app.config.ts`
- Mixed `constructor` vs `inject()` in existing files
- Service names like `transfer-service.service.ts`

### Do not add (unless user requests)

- New state management libraries
- NgModules
- Alternate CSS/UI frameworks (e.g. Material, Bootstrap components)
- Fixing duplicate `provideHttpClient()` or other legacy quirks

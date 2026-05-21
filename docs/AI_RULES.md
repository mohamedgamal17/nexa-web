# Nexa Web — AI Rules and Conventions

Master reference for AI assistants and contributors. Detailed structure and libraries are split into linked docs below.

| Topic | Document |
|-------|----------|
| Folder layout, routes, features | [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) |
| Dependencies and hard constraints | [LIBRARIES_AND_CONSTRAINTS.md](./LIBRARIES_AND_CONSTRAINTS.md) |

---

## General principles

1. Match feature-first structure for new domain code
2. Minimal diffs; follow patterns in touched files
3. NgRx only for customer/wallet state extensions
4. Format with Prettier before finishing edits
5. Prefer libraries already wired in the feature you touch; do not add new UI frameworks

---

## Components

1. **Standalone only** — `@Component({ imports: [...] })`, selector prefix `app-`, no NgModules
2. **File naming** — no `.component.ts` suffix: `login-page.ts` + `.html`, `.scss`, `.spec.ts`
3. **Class naming** — PascalCase matching file stem (`LoginPage`, `WalletCard`)
4. **Prefer** `inject()`, `signal()`, `computed()`, `effect()`, `toSignal()`, `input()`, `output()`, `model()`
5. **Templates** — `@if` / `@else` (not `*ngIf` in new code)
6. **Styling** — Tailwind utilities in HTML; component rules in `styleUrl: './….scss'`
7. **PrimeNG** — import modules per component (`ButtonModule`, `CardModule`, etc.)
8. **i18n** — `TranslateModule` in imports; `| translate` in templates; `TranslateService.instant()` in TS
9. Optional `*-test-ids.ts` for `data-testid` constants

---

## NgRx (customers + wallets only)

- **Actions:** `createActionGroup({ source: '[Entity]', events: { 'Human Name': props<...>() } })`
- **Reducers:** `{entity}.reducer.ts` — `*_FEATURE_KEY`, `createReducer` + `on()`
- **Effects:** `XEffects` class, `providedIn: 'root'`, `inject(Actions)` + services
- **Selectors:** `select*` naming in `{entity}.selectors.ts`
- Other features: signals + services (no NgRx)

---

## Services and HTTP

- `@Injectable({ providedIn: 'root' })`
- Base URL: `environemnt.apiUrl + '/resource'` (keep typo `environemnt` as in codebase)
- `Observable<T>` from `HttpClient`
- Query params: `mapObjectToHttpParam` from `core/mappers/http.mapper.ts`
- Errors: `error-handler.interceptor.ts` → `ErrorModel`; global UI via `ErrorService`

---

## Routing

- Root `app.routes.ts` is minimal; routes registered via feature `provideRouter()` in `app.config.ts`
- Lazy pages: `loadComponent: () => import('...').then(m => m.PageName)`
- Layouts: eager `AuthLayout` / `PublicLayout` as parent `component`
- Guards: `authGuardFn` + `customerGuardFn` (redirects to `/onboarding` if no customer)
- Loading: `RouterLoadingService` + `RoutingGlobalLoader` at app root

| Path | Layout | Guards |
|------|--------|--------|
| `/auth` | AuthLayout | none |
| `/onboarding` | AuthLayout | auth |
| `/`, `/customer`, `/transfers`, `/banks` | PublicLayout | auth + customer |

---

## App bootstrap (`app.config.ts`)

- `provideHttpClient(withInterceptors([errorHandlerInterceptorFn, authHttpInterceptorFn]))`
- Feature providers: `provideAuthFeature()`, `provideOnboardingFeature()`, `provideCustomers()`, etc.
- `provideStore` + `provideEffects` for customer/wallet slices only

---

## Testing

- Colocated `*.spec.ts` beside source
- `TestBed.configureTestingModule({ imports: [StandaloneComponent], providers: [mocks] })`
- Vitest: `vi.fn()`, `vi.mock()`; RxJS `of` / `throwError` for service mocks
- Utilities: `src/testing/` (dom-helpers, ng-prime-test.utilities, translate mocks)
- Setup: `src/test-setup.ts` mocks PrimeNG overlays

---

## Translations

- Add keys to `src/assets/i18n/en.json`
- Validation keys: `errors.validation.*` pattern in `core/constants/error.map.ts`

---

## Structure rules

1. New routed features: `{name}.feature.ts`, `{name}.routing.ts`, register in `app.config.ts`
2. Wallets stay route-less; embed via containers in pages
3. Cross-cutting UI → `shared/`; infra → `core/`; shells → `layouts/`
4. NgRx `state/` only under `customers/` and `wallets/`
5. Dashboard integrates wallet + recent transfers — check landing and both feature containers

---

## Do not change unless asked

- `environemnt` typo (env file and imports)
- `CUSTOMER_KEY_FEAUTRE` typo
- `pips/` folder name in banks feature
- Duplicate `provideHttpClient()` in `app.config.ts`
- Mixed `constructor` vs `inject()` in existing files
- Service names like `transfer-service.service.ts`
- `transfer.feature.ts`, `banks.features.ts`, `onbaording-address-step/`, `recive-funds-modal`

---

## Do not add (unless user requests)

- New state management libraries
- NgModules
- Alternate CSS/UI frameworks
- Fixing duplicate `provideHttpClient()` or other legacy quirks
- `ngx-bootstrap` (not used in `src/`)

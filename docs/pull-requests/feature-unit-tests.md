## Summary

- Expand unit test coverage across app features (auth, banks, customers, landing, onboarding, transfers, wallets, layouts, shared).
- Add shared Vitest/TestBed helpers in `src/testing/test-providers.ts` and improve `src/test-setup.ts`.
- Tests assert **component class behavior only** (signals, methods, outputs, NgRx dispatch, mocked services)—no DOM/template assertions.
- Fix two template issues found during testing: `alert-error.html` malformed `p-button`, `wallet-container.html` stray `[]` on `app-transfer-modal`.
- Add project docs for AI/contributor conventions (`.cursor/rules`, `docs/`).

## Test infrastructure

| File | Purpose |
|------|---------|
| `src/testing/test-providers.ts` | `mockAuthService`, default NgRx store slices, `createMockRouterLoadingService` |
| `src/test-setup.ts` | PrimeNG mocks, `matchMedia`, `BrowserTestingModule` init |
| `vitest-base.config.ts` | Vitest setup path |

## Feature coverage (high level)

| Area | Specs updated/added | Focus |
|------|---------------------|--------|
| **global / app** | `app.spec.ts`, shell loaders, `not-found` | Service injection, navigation helpers |
| **layouts** | `auth-layout`, `public-layout`, `public-navbar` | Create + navbar logout / customer status |
| **auth** | `login-page`, `login-hero` | Login flow, loading state |
| **banks** | `bank-card`, skeletons, `index-page` | rxResource errors, `connectToBank` chain |
| **customers** | `profile-page`, `profile-hero`, `profile-document` | Form submit, KYC helpers, status badges |
| **landing** | `dashboard-page`, `quick-action-item` | Signals / inputs |
| **onboarding** | `onboarding-page` | Load onboard customer |
| **transfers** | list, container, `index-page` | Service mocks, copy transfer, list behavior |
| **wallets** | container, list, search, items | `loadWallets` dispatch, CVA, search errors |
| **shared** | `phone-input`, `input-error`, `form-error`, data-loader family, `alert-error`, `spinner` | CVA, `buildErrors$()`, outputs |

## Testing approach

- Vitest + Angular `TestBed`, `provideMockStore`, `TranslateModule.forRoot()` where needed.
- `overrideComponent({ template: '' })` for heavy pages/containers to avoid PrimeNG/toast side effects.
- `@ViewChild` host wrappers for form-hosted components (`input-error`, `wallet-search`) without DOM assertions.

## Production code notes

- `refactor(banks): Add debug logging in connectToBank flow` — includes temporary `console.log`/`tap` in `index-page.ts`; consider removing before merge to production if not intended.

## Test plan

- [x] `npx ng test --watch=false` — 193 tests passing (58 spec files)
- [ ] Smoke-test banks connect flow if removing debug logs
- [ ] Review profile/onboarding flows unchanged

## Commits

Grouped by feature scope (`test(<scope>): ...` convention). See branch history from `docs(global)` through `test(shared)`.

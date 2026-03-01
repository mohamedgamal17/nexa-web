// loading.service.ts
import {
  Injectable,
  signal,
  computed,
  inject,
} from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  GuardsCheckStart,
  GuardsCheckEnd,
  ResolveStart,
  ResolveEnd,
} from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, merge, scan } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RouterLoadingService {
  private router = inject(Router);

  // Granular phase tracking
  private readonly _phase = signal<
    'idle' | 'navigating' | 'guards' | 'resolving' | 'activating'
  >('navigating');

  private readonly _loadingRoute = signal<string>('');

  private readonly _manualLoaders = signal<Map<string, boolean>>(new Map());

  readonly phase = this._phase.asReadonly();
  readonly loadingRoute = this._loadingRoute.asReadonly();

  readonly isNavigating = computed(() => this._phase() !== 'idle');

  readonly phaseMessage = computed(() => {
    switch (this._phase()) {
      case 'guards':
        return 'Checking permissions...';
      case 'resolving':
        return 'Loading data...';
      case 'navigating':
        return 'Navigating...';
      case 'activating':
        return 'Preparing view...';
      default:
        return '';
    }
  });

  readonly isLoading = computed(() => {
    if (this._phase() !== 'idle') return true;
    return [...this._manualLoaders().values()].some(Boolean);
  });

  constructor() {
    this.trackRouterEvents();
  }

  private trackRouterEvents(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this._phase.set('navigating');
        this._loadingRoute.set(event.url);
      }

      if (event instanceof GuardsCheckStart) {
        this._phase.set('guards');
      }

      if (event instanceof GuardsCheckEnd) {
        // Guards done, might go to resolvers next
      }

      if (event instanceof ResolveStart) {
        this._phase.set('resolving');
      }

      if (event instanceof ResolveEnd) {
        this._phase.set('activating');
      }

      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this._phase.set('idle');
        this._loadingRoute.set('');
      }
    });
  }

  startLoading(key: string): void {
    this._manualLoaders.update((m) => {
      const copy = new Map(m);
      copy.set(key, true);
      return copy;
    });
  }

  stopLoading(key: string): void {
    this._manualLoaders.update((m) => {
      const copy = new Map(m);
      copy.delete(key);
      return copy;
    });
  }

  isKeyLoading(key: string): boolean {
    return this._manualLoaders().get(key) ?? false;
  }
}
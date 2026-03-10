import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { customerGuardFn } from './customer-guard';

export {customerGuardFn} from "./customer-guard"

describe('customerCreateGuardFnGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() =>
      customerGuardFn(...guardParameters),
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

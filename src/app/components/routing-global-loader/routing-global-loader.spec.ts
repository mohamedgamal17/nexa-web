import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutingGlobalLoader } from './routing-global-loader';

describe('RoutingGlobalLoader', () => {
  let component: RoutingGlobalLoader;
  let fixture: ComponentFixture<RoutingGlobalLoader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutingGlobalLoader],
    }).compileComponents();

    fixture = TestBed.createComponent(RoutingGlobalLoader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

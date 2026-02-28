import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFormErrors } from './app-form-errors';

describe('AppFormErrors', () => {
  let component: AppFormErrors;
  let fixture: ComponentFixture<AppFormErrors>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppFormErrors],
    }).compileComponents();

    fixture = TestBed.createComponent(AppFormErrors);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

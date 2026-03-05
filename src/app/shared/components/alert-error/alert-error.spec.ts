import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertError } from './alert-error';

describe('AlertError', () => {
  let component: AlertError;
  let fixture: ComponentFixture<AlertError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertError],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertError);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

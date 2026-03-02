import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputError } from './Input-error';

describe('AppInputError', () => {
  let component: InputError;
  let fixture: ComponentFixture<InputError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputError],
    }).compileComponents();

    fixture = TestBed.createComponent(InputError);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputError } from './Input-error';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';

@Component({
  imports: [ReactiveFormsModule, InputError, TranslateModule],
  template: `
    <form [formGroup]="form">
      <app-input-error [control]="form.get('email')" field="Email" />
    </form>
  `,
})
class TestHostComponent {
  form = new FormGroup({
    email: new FormControl('', { validators: [Validators.required] }),
  });

  @ViewChild(InputError) inputError!: InputError;
}

describe('InputError', () => {
  let host: TestHostComponent;
  let component: InputError;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    host = fixture.componentInstance;
    component = host.inputError;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return empty errors when control is valid', async () => {
    const errors = await firstValueFrom(component.buildErrors$());
    expect(errors).toEqual([]);
  });

  it('should return mapped errors when control is invalid and touched', async () => {
    host.form.get('email')?.setErrors({ required: true });
    host.form.get('email')?.markAsTouched();
    const errors = await firstValueFrom(component.buildErrors$());
    expect(errors.length).toBeGreaterThan(0);
    expect(host.form.get('email')?.invalid).toBe(true);
  });
});

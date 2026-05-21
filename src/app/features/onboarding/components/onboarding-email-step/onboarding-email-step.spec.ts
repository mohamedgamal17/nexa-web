import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OnboardingEmailStep } from './onboarding-email-step';
import { describe, beforeEach, vi } from 'vitest';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';


describe('OnboardingEmailStep', () => {
  let component: OnboardingEmailStep;
  let fixture: ComponentFixture<OnboardingEmailStep>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        OnboardingEmailStep,
        ReactiveFormsModule,
        InputTextModule,
        TranslateModule.forRoot({}),
      ],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(OnboardingEmailStep);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event submit after form submited', () => {
    const spyOnSumbited = vi.spyOn(component.submited, 'emit');

    component.emailForm.patchValue({
      email: 'sampletest@example.com',
    });

    component.handleSubmit(new Event('sumbit') as any);

    expect(spyOnSumbited).toHaveBeenCalledOnce();
  });
});

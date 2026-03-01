import { Component, input, OnInit, output } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule} from "primeng/button";
import { CardModule } from 'primeng/card';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { AppFormErrors } from "../../../../shared/components/app-form-errors/app-form-errors";
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-onboarding-email-step',
  imports: [InputTextModule, ButtonModule, CardModule, AppFormErrors, ReactiveFormsModule,TranslateModule],
  standalone:true,
  templateUrl: './onboarding-email-step.html',
  styleUrl: './onboarding-email-step.scss',
})
export class OnboardingEmailStep implements OnInit  {

  email = input("")
  loading = input<boolean>(false)

  submited = output<{email : string}>()

  emailForm : FormGroup

  constructor(
    private fb : FormBuilder,

  ){

  }
  ngOnInit(): void {
    this.emailForm = this.fb.group({
      email : [this.email() , [Validators.required, Validators.maxLength(256), Validators.email]]
    })

    console.log(this.email())
  }
  
  handleSubmit($event : any){
    $event.preventDefault()

    if(!this.emailForm.valid){
      this.emailForm.markAllAsTouched()
      this.emailForm.markAllAsDirty();
    }
    if(this.emailForm.valid){
      this.submited.emit(this.emailForm.value)
    }
  }
}

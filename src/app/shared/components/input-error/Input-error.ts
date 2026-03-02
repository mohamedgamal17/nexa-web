import { Component, Input, input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { CommonModule } from '@angular/common';
import { ValidationErrorService } from '../../../core/services/validation-error.service';

type NewType = OnInit;

@Component({
  selector: 'app-input-error',
  imports: [CommonModule],

  templateUrl: './input-error.html',
  styleUrl: './input-error.scss',
})
export class InputError implements NewType {
  @Input() control: AbstractControl | null;
  @Input() form: FormGroup | null;
  @Input() fieldKey: string = '';
  errors$: Observable<string[]>;
  constructor(private validationErrorService: ValidationErrorService) {}
  ngOnInit(): void {
    this.errors$ = this.validationErrorService.getAllErrors$(this.control, this.form, this.fieldKey);
  }
}

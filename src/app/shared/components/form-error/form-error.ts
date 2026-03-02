import { Component, input } from '@angular/core';
import { MessageModule } from 'primeng/message';
import { ErrorModel } from '../../../core/models/error-model.interface';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherAlertTriangle } from '@ng-icons/feather-icons';

@Component({
  selector: 'app-form-error',
  imports: [MessageModule, NgIcon],
  templateUrl: './form-error.html',
  styleUrl: './form-error.scss',
  viewProviders: [provideIcons({ featherAlertTriangle })],
})
export class FormError {
  error = input<ErrorModel | null>();

  getObjectKeys(obj: any) {
    return Object.keys(obj);
  }
}

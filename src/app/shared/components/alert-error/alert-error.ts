import { Component, input } from '@angular/core';
import { ErrorModel } from '../../../core/models/error-model.interface';
import { CardModule } from 'primeng/card';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroExclamationCircle } from '@ng-icons/heroicons/outline';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-alert-error',
  imports: [CardModule, NgIcon, Button],
  templateUrl: './alert-error.html',
  styleUrl: './alert-error.scss',
  viewProviders: [provideIcons({ heroExclamationCircle })],
})
export class AlertError {
  error = input<ErrorModel>();
}

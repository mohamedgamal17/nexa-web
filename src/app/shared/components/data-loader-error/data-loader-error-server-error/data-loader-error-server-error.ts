import { Component, output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherAlertTriangle } from '@ng-icons/feather-icons';
import { heroExclamationCircle } from '@ng-icons/heroicons/outline';
import { TranslateModule } from '@ngx-translate/core';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-data-loader-error-server-error',
  imports: [NgIcon, Button, TranslateModule],
  templateUrl: './data-loader-error-server-error.html',
  styleUrl: './data-loader-error-server-error.scss',
  viewProviders: [provideIcons({ featherAlertTriangle })]

})
export class DataLoaderErrorServerError {
  refresh = output<void>()

  back = output<void>()

}

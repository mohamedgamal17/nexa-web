import { Component, input, output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherSearch } from '@ng-icons/feather-icons';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { ErrorModel } from '../../../../core/models/error-model.interface';

@Component({
  selector: 'app-data-loader-error-not-found',
  imports: [NgIcon, ButtonModule, TranslateModule],
  templateUrl: './data-loader-error-not-found.html',
  styleUrl: './data-loader-error-not-found.scss',
  viewProviders: [provideIcons({ featherSearch })]
})
export class DataLoaderErrorNotFound {
  error = input<ErrorModel>()
  back = output<void>()
}

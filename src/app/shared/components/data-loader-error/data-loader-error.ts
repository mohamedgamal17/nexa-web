import { Component, input, output } from '@angular/core';
import { ErrorModel, ErrorType } from '../../../core/models/error-model.interface';
import { CardModule } from 'primeng/card';
import { DataLoaderErrorConnection } from './data-loader-error-connection/data-loader-error-connection';
import { DataLoaderErrorServerError } from './data-loader-error-server-error/data-loader-error-server-error';
import { DataLoaderErrorNotFound } from './data-loader-error-not-found/data-loader-error-not-found';
import { Location } from '@angular/common';

@Component({
  selector: 'app-data-loader-error',
  imports: [CardModule, DataLoaderErrorConnection, DataLoaderErrorServerError, DataLoaderErrorNotFound],
  templateUrl: './data-loader-error.html',
  styleUrl: './data-loader-error.scss',
})
export class DataLoaderError {
  error = input<ErrorModel>();

  refresh = output<void>();

  constructor(private location: Location) {}

  handleGoBack() {
    this.location.back();
  }

  handleRefresh() {
    this.refresh.emit();
  }
}

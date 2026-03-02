import { Component, output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherWifiOff } from '@ng-icons/feather-icons';
import { heroWifi } from '@ng-icons/heroicons/outline';
import { TranslateModule } from '@ngx-translate/core';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-data-loader-error-connection',
  imports: [NgIcon, Button, TranslateModule],
  templateUrl: './data-loader-error-connection.html',
  styleUrl: './data-loader-error-connection.scss',
  viewProviders: [provideIcons({ heroWifi, featherWifiOff })]

})
export class DataLoaderErrorConnection {
  refresh = output<void>()
  back = output<void>()
 }

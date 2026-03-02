import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RoutingGlobalLoader } from "./components/routing-global-loader/routing-global-loader";
import { RouterLoadingService } from './core/services/routing-loading.service';
import { DataLoaderError } from "./shared/components/data-loader-error/data-loader-error";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RoutingGlobalLoader, DataLoaderError],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('nexa-web');

  constructor(public routerLoadingService : RouterLoadingService){
    
  }
}

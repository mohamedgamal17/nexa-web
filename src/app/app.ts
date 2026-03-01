import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RoutingGlobalLoader } from "./components/routing-global-loader/routing-global-loader";
import { RouterLoadingService } from './core/services/routing-loading.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RoutingGlobalLoader],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('nexa-web');

  constructor(public routerLoadingService : RouterLoadingService){
    
  }
}

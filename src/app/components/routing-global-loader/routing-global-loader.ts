import { Component } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RouterLoadingService } from '../../core/services/routing-loading.service';
import { ProgressBar } from "primeng/progressbar";

@Component({
  selector: 'app-routing-global-loader',
  imports: [ProgressSpinnerModule, ProgressBar],
  templateUrl: './routing-global-loader.html',
  styleUrl: './routing-global-loader.scss',
})
export class RoutingGlobalLoader  {


  constructor(public routerLoadingService : RouterLoadingService){
    
  }

  getCurrentProgress(){

    if(this.routerLoadingService.phase() === 'guards'){
      return 30;
    }else if(this.routerLoadingService.phase() === 'resolving'){
      return 60;
    }
    else if(this.routerLoadingService.phase() === 'activating'){
      return 90;
    }else{
      return 100;
    }

   
   
  }
}

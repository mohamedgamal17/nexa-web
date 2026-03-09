import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PublicNavbar } from './components/public-navbar/public-navbar';

@Component({
  selector: 'app-public-layout',
  imports: [RouterModule, PublicNavbar],
  templateUrl: './public-layout.html',
})
export class PublicLayout {}

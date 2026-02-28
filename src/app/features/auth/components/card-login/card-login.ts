import { Component, input, output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-card-login',
  imports: [CardModule, ButtonModule, CommonModule],
  templateUrl: './card-login.html',
  styleUrl: './card-login.scss',
})
export class CardLogin {
  
  loading = input<boolean>(false)
  loginRequested = output<void>()

  handleButtonClick(){
    this.loginRequested.emit()
  }
}

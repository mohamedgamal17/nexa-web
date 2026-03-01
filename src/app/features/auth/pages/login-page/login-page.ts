import { Component, OnInit, signal } from '@angular/core';
import { LoginHero } from "../../components/login-hero/login-hero";
import { CardLogin } from "../../components/card-login/card-login";
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login',
  imports: [LoginHero, CardLogin],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {

  loginLoading = signal(false)

  constructor(private authService: AuthService) {

  }


  handleLogin() {
    this.loginLoading.set(true)
    this.authService.loginWithRedirect({
      authorizationParams: {
        redirect_uri: window.location.origin +"/auth/callback"
      }
    })
      .subscribe(() => this.loginLoading.set(false))

  }
}

import { Component } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  loggedIn = false;

  constructor(private authService: AuthService) {
    authService.loggedIn$.subscribe((loggedIn: boolean) => {
      this.loggedIn = loggedIn;
    });
  }

  login(): void {
    this.authService.login(this.username, this.password).subscribe();
  }

  logout(): void {
    this.authService.logout();
  }

}



import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../auth.service';

import {MatTabsModule} from '@angular/material/tabs';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [ MatTabsModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, NgIf ],
})
export class LoginComponent {
  name: string = '';
  username = '';
  password = '';
  confirmPassword: string = '';
  loggedIn = false;

  constructor(
    private router: Router,
    private authService: AuthService
    ) {
    authService.loggedIn$.subscribe((loggedIn: boolean) => {
      this.loggedIn = loggedIn;
    });
  }

  login(): void {
    this.authService.login(this.username, this.password).subscribe();
    this.router.navigate(['admin']);
  }

  logout(): void {
    this.authService.logout();
  }

  novaConta(): void {
    
  }

}



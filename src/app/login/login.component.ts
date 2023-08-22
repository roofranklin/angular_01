import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

import {MatTabsModule} from '@angular/material/tabs';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [ MatTabsModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, NgIf, MatSnackBarModule ],
})
export class LoginComponent {
  name: string = '';
  username = '';
  password = '';
  confirmPassword: string = '';

  loggedIn = false;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar,
    private authService: AuthService
    ) {
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

  novaConta(): void {
    const novoUsuario = {
      name: this.name,
      username: this.username,
      password: this.password,
      confirmPassword: this.confirmPassword
    };

    if (this.password === this.confirmPassword) {

      this.http.post(' http://localhost:3000/usuarios', novoUsuario)
        .subscribe(
          (response) => {
            this._snackBar.open('Usuário cadastrado com sucesso!', 'Fechar', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 5000
            });
            setTimeout(() => {
              window.location.reload();
            }, 5000);
          },
          (error) => {
            console.error('Erro ao cadastrar usuário:', error);
            this._snackBar.open('Erro ao cadastrar usuário!', 'Fechar', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 5000
            });
          }
      );
    }
    else {
      this._snackBar.open('Os campos senha e confirmação de senha não conferem!', 'Fechar', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 5000
      });
    }
  }
}

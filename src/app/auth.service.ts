import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  usuarios: any[] = [];
  name: string;
  username: string;
  password: string;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

  private loggedInSubject = new BehaviorSubject<boolean>(false);
  
  loggedIn$: Observable<boolean> = this.loggedInSubject.asObservable();

  login(username: string, password: string): Observable<boolean> {

    this.http.get<any[]>('http://localhost:3000/usuarios')
        .subscribe(
          (response) => {
            this.usuarios = response;
            const usuarioEncontrado = this.usuarios.find(user => user.username === username && user.password === password);
            if (usuarioEncontrado) {
              this.loggedInSubject.next(true);
              this._snackBar.open('Login realizado com sucesso!', 'Fechar', {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 5000
              }); 
              this.router.navigate(['admin']);
            } else {
              this._snackBar.open('Usuário ou senha incorretos!', 'Fechar', {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 5000
              });
            }
      },
      (error) => {
        console.error('Erro ao buscar usuários:', error);
      }
    );

    return this.loggedIn$;
  
  }

  logout(): void {
    this.loggedInSubject.next(false);
  }
}


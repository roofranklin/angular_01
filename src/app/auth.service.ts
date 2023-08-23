import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  
  loggedIn$: Observable<boolean> = this.loggedInSubject.asObservable();

  login(username: string, password: string): Observable<boolean> {
    // Aqui ainda vamos implementar um login via API
    const isAuthenticated = username === 'user' && password === 'password';

    if (isAuthenticated) {
      this.loggedInSubject.next(true);
    }

    return this.loggedIn$;
  }

  logout(): void {
    this.loggedInSubject.next(false);
  }
}


import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

    isLoggedIn(): boolean {
        const token = localStorage.getItem('auth-token');

        if (token != null)
            return true;
        return false;
    }
}

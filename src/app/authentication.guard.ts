import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router ){}


  canActivate(): boolean {
    if (this.authService.getToken() === undefined){
      this.router.navigate(["auth/login"]);
    }
    return true;
  }  
}

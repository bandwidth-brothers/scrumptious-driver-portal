import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  readonly Login_URL = environment.BASE_AUTH_URL + "/login";
  readonly STORAGE_KEY = 'AUTH_DATA';

  constructor(private http: HttpClient) { }


  login(username: string, password: string){
    return this.http.post(this.Login_URL, {username, password});
  }

  saveAuthData(data:any){
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  getToken(){
    return localStorage.getItem("AUTH_DATA")? JSON.parse(localStorage.getItem("AUTH_DATA")!).token : undefined;
  }

  removeAuthData(){
    localStorage.removeItem(this.STORAGE_KEY);
  }

  isLogin(){
    return this.getToken() !== undefined;
  }


}



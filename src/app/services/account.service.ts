import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RegisterDto } from '../entities/registerDto';
import { Driver } from '../entities/driver';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  readonly Driver_URL = environment.BASE_CUSTOMER_URL;

  constructor(private http: HttpClient) { }

  createAccount(registerDto: RegisterDto) {
    return this.http.post(this.Driver_URL, registerDto);
  }

}

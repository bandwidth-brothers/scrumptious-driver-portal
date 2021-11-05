import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMsg?: string = undefined;
  isLoading = false;
  hide = true;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(localStorage.getItem('savedUserEmail'), [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    rememberMe: new FormControl(localStorage.getItem('savedUserEmail') !== null)
  });


  constructor(
    private authServices: AuthService,
    private router: Router,
    private notificateService: NotificationService
  ) { }

  ngOnInit(): void {
  }

  login() {
    console.log("form submit");
    const email = this.loginForm.get("email")?.value;
    const password = this.loginForm.get("password")?.value;
    console.log("email: " + email);
    console.log("password: " + password);

    this.authServices.login(email, password).subscribe(
      (res) => {
        console.log(res);
        this.authServices.saveAuthData(res);
        this.router.navigate(['/home'])
      }, (err: HttpErrorResponse) => {
        this.notificateService.openSnack("Login Failed");
        console.log("err: " + err.status + " : " + err.message);
      }
    );
  }

}

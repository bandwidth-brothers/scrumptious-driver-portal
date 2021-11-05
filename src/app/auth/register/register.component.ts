import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { trimStringLength } from 'src/app/shared/validators';
import { Address } from 'src/app/entities/address';
import { RegisterDto } from 'src/app/entities/registerDto';
import { AccountService } from 'src/app/services/account.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  maxDate = new Date();
  errorMsg?: string = undefined;
  isLoading = false;
  hide = true;
  hide2 = true;
  states: string[] = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DC", "DE", "FL", "GA",
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
  registrationForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, trimStringLength(1)]),
    lastName: new FormControl('', [Validators.required, trimStringLength(1)]),
    phone: new FormControl('', [Validators.required, trimStringLength(1)]),
    dob: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email, trimStringLength(1)]),
    licenseNo: new FormControl('', [Validators.required, trimStringLength(1)]),
    password: new FormControl('', [Validators.required, trimStringLength(1)]),
    confirmPassword: new FormControl('', [Validators.required, trimStringLength(1)]),

  });

  addressForm = new FormGroup({
    line1: new FormControl('', [Validators.required, trimStringLength(1)]),
    line2: new FormControl(''), //NOT required
    city: new FormControl('', [Validators.required, trimStringLength(1)]),
    state: new FormControl('', [Validators.required]),
    zip: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{5}(?:[-\s]\d{4})?$/),
    ]),
  })


  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  onPasswordInput() {
    console.log("password");
  }

  register() {
    const address: Address = {
      line1: this.addressForm.get('line1')?.value,
      line2: this.addressForm.get('line2')?.value,
      city: this.addressForm.get('city')?.value,
      state: this.addressForm.get('state')?.value,
      zip: this.addressForm.get('zip')?.value
    }

    const registerDto: RegisterDto = {
      firstName: this.registrationForm.get('firstName')?.value,
      lastName: this.registrationForm.get('lastName')?.value,
      email: this.registrationForm.get('email')?.value,
      dob: this.registrationForm.get('dob')?.value,
      licenseNo: this.registrationForm.get('licenseNo')?.value,
      phone: this.updatePhoneNumberFormat(),
      password: this.registrationForm.get('password')?.value,
      address: address,
    }

    console.log(registerDto);
    this.accountService.createAccount(registerDto).subscribe(
      (res) => {
        console.log(res);
      },
      (err: HttpErrorResponse) => {
        console.log(err.status + " : " + err.message);
      });
  }

  //save number as 555-555-5555 for the backend
  updatePhoneNumberFormat(): string {
    const control = this.registrationForm.get('phone');
    if (control && control.valid) {
      const val = control.value.replaceAll(/\D/g, '');
      return val.slice(0, 3) + '-' + val.slice(3, 6) + '-' + val.slice(6, 11);
    }
    return '';
  }
}

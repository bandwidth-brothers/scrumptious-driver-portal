import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CustomMaterialModule } from 'src/app/custom-material/custom-material.module';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from './login.component';



describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, CustomMaterialModule, BrowserAnimationsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = fixture.debugElement.injector.get(Router);
    authService = fixture.debugElement.injector.get(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to homePage if login succeeds', () => {
    const navigate = spyOn(router, 'navigate');

    component.loginForm.setValue({ 'email': 'dave@a.com', "password": 'dave', "rememberMe": 'true' });
    const email = component.loginForm.get('email')?.value;
    const password = component.loginForm.get('password')?.value;
    const login = spyOn(authService, 'login').and.returnValue(of({ userId: 'some-uuid', token: 'some token', expiresAt: 5 }));

    component.login();
    expect(login).toHaveBeenCalledWith(email, password);
    expect(navigate).toHaveBeenCalledWith(['/home']);
  });

});

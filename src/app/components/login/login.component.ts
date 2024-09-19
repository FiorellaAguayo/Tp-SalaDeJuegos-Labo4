import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user: User = { name: '', password: '' };
  errorMessage: string = '';
  successMessage: string = '';
  loginForm: FormGroup;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async login() {
    this.user.name = this.loginForm.value.name;
    this.user.password = this.loginForm.value.password;

    if (await this.userService.login(this.user)) {
      this.successMessage = `¡Bienvenido, ${this.user.name}!`;
      this.errorMessage = '';

      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 2000);
    } else {
      this.errorMessage = 'Usuario o contraseña incorrectos.';
      this.successMessage = '';
    }
  }

  cancel() {
    this.router.navigate(['/home']);
  }
}
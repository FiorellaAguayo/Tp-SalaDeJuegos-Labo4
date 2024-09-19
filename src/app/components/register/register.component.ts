import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  user: User = { name: '', password: '' };
  successMessage: string = '';
  errorMessage: string = '';
  registerForm: FormGroup;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async register() {
    const user: User = {
      name: this.registerForm.value.name,
      password: this.registerForm.value.password,
    };
  
    try {
      const success = await this.userService.registerDatabase(user);
      if (success) {
        this.successMessage = 'Usuario registrado con éxito.';
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 2000);
      } else {
        this.errorMessage = 'Error al registrar el usuario.';
      }
    } catch (error) {
      console.error(error);
      this.errorMessage = 'Ocurrió un error durante el registro.';
    }
  }

  cancel() {
    this.router.navigate(['/home']);
  }
}
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  loginForm = this.formBuilder.group({
    email: [
      '',
      {
        validators: [Validators.required],
      },
    ],
    password: [
      '',
      {
        validators: [Validators.required],
      },
    ]
  });

  submit() {
    if (!this.loginForm.valid) {
      alert(
        'Información incompleta en el formulario por favor revise nuevamente'
      );
      return;
    }

    this.authService.login(this.loginForm.value)
  }
}

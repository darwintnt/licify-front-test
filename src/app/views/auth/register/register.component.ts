import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  registerForm = this.formBuilder.group({
    role: [
      '',
      {
        validators: [Validators.required],
      },
    ],
    name: [
      '',
      {
        validators: [Validators.required],
      },
    ],
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
    if (!this.registerForm.valid) {
      alert(
        'Información incompleta en el formulario por favor revise nuevamente'
      );
      return;
    }

    this.authService.register(this.registerForm.value).subscribe({
      next: (data) => {
        alert('Usuario creado, por favor ingrese al sistema con los datos creados');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        alert(
          `${error.message}: El email ya se encuentra registrado en el sistema`
        );
      },
    });
  }

}

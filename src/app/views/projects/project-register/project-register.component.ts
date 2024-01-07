import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterOutlet, RouterModule],
  templateUrl: './project-register.component.html',
  styleUrl: './project-register.component.scss',
})
export class ProjectRegisterComponent {
  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private router: Router
  ) {}

  get items() {
    return this.projectForm.get('items') as FormArray;
  }

  projectForm = this.formBuilder.group({
    user_id: [
      localStorage.getItem('user'),
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
    init_date: [
      '',
      {
        validators: [Validators.required],
      },
    ],
    end_date: [
      '',
      {
        validators: [Validators.required],
      },
    ],
    items: this.formBuilder.array([]),
  });

  addItem() {
    const itemsFormGroup = this.formBuilder.group({
      description: [
        '',
        {
          validators: [Validators.required],
        },
      ],
      value: [
        '',
        {
          validators: [Validators.required],
        },
      ],
    });

    this.items.push(itemsFormGroup);
  }

  removeItem(idx: number) {
    this.items.removeAt(idx);
  }

  submit() {
    if (!this.projectForm.valid) {
      alert(
        'Información incompleta en el formulario por favor revise nuevamente'
      );
      return;
    }

    this.projectService.addProject(this.projectForm.value).subscribe({
      next: (data) => {
        alert('Proyecto creado');
        this.router.navigate(['/constructor/projects']);
      },
      error: (error) => {
        alert(
          `${error.message}: El proyecto del mismo nombre ya se encuentra registrado en el sistema`
        );
      },
    });
  }
}

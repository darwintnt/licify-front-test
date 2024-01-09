import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ProjectService } from '../project.service';
import { FileUploadModule } from 'primeng/fileupload';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterModule,
    FileUploadModule,
  ],
  templateUrl: './project-register.component.html',
  styleUrl: './project-register.component.scss',
})
export class ProjectRegisterComponent {
  selectedFiles?: FileList;
  message: string[] = [];
  previews: string[] = [];
  imageInfos?: Observable<any>;
  files?: Array<string> = [];

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private router: Router
  ) {}

  get items() {
    return this.projectForm.get('items') as FormArray;
  }

  get images() {
    return this.projectForm.get('images') as FormArray;
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
    images: this.files,
  });

  validateImages(control: AbstractControl): ValidationErrors | null {
    const fileList: File[] = control.value;

    if (!fileList || fileList.length === 0) {
      return { noImages: 'Debe seleccionar al menos una imagen.' };
    }

    return null;
  }

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

  selectFiles(event: any): void {
    this.message = [];
    this.selectedFiles = event.target.files;

    this.previews = [];

    if (this.selectedFiles && this.selectedFiles.length > 0) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }

    this.uploadFiles();
  }

  submit() {
    if (!this.projectForm.valid) {
      alert(
        'Información incompleta en el formulario por favor revise nuevamente'
      );
      return;
    }

    if (this.files && this.files?.length > 0) {
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

  uploadFiles(): void {
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles?.length; i++) {
        const form = new FormData();
        form.append('file', this.selectedFiles[i]);
        this.projectService.uploadFile(form).subscribe({
          next: (res) => {
            console.log(res);
            this.files?.push(res.data.fileName);
          },
          error: (error) => {
            console.log(error);
          },
        });
      }
    }

    this.projectForm.get('images')?.setValue(this.files);
  }
}

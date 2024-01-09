import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { ProjectService } from '../project.service';
import { Item } from '../interfaces/project';

@Component({
  selector: 'app-apply',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterOutlet, RouterModule],
  templateUrl: './apply.component.html',
  styleUrl: './apply.component.scss',
})
export class ApplyComponent implements OnInit {
  projectForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.projectForm = this.formBuilder.group({
      user_id: [
        '',
        {
          validators: [Validators.required],
        },
      ],
      project_id: [
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

    this.route.queryParams.subscribe((params) => {
      const id = params['project'];
      this.projectForm.get('project_id')?.setValue(id)
      this.getProjectData(id);
    });
  }

  get items() {
    return this.projectForm.get('items') as FormArray;
  }

  addItem() {
    const newItem = this.formBuilder.group({
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
      offered_value: [
        '',
        {
          validators: [Validators.required],
        },
      ],
    });

    this.items.push(newItem);
  }

  getProjectData(id: string) {
    this.projectService.getProjectById(id).subscribe((res: any) => {
      this.projectForm?.patchValue({
        ...res.data,
        user_id: localStorage.getItem('user'),
        init_date: this.datePipe.transform(res.data.init_date, 'dd/MM/yyyy'),
        end_date: this.datePipe.transform(res.data.end_date, 'dd/MM/yyyy'),
      });

      const proposalItems: Array<Item> = res.data.items;

      proposalItems.forEach((item) => {
        const elemento = this.formBuilder.group({
          description: [item.description, Validators.required],
          value: [item.value, Validators.required],
          offered_value: ['', Validators.required],
        });
        this.items.push(elemento);
      });
    });
  }

  submit() {
    if (!this.projectForm.valid) {
      alert(
        'Información incompleta en el formulario por favor revise nuevamente'
      );
      return;
    }

    this.projectService.applyToProject(this.projectForm.value).subscribe({
      next: (data) => {
        alert('Felicidades!! Has aplicado al proyecto, brindaremos una pronta respuesta a esta solicitud.');
        this.router.navigate(['/provider/active']);
      },
      error: (error) => {
        alert(
          `${error.message}: El proyecto del mismo nombre ya se encuentra registrado en el sistema`
        );
      },
    });
  }
}

import { Component } from '@angular/core';
import { CardComponent } from '../../../components/card/card.component';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ProjectService } from '../project.service';
import { Project } from '../interfaces/project';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-project-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, CardComponent, TooltipModule],
  templateUrl: './project-home.component.html',
  styleUrl: './project-home.component.scss',
})
export class ProjectHomeComponent {
  projects?: Project[] = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    const id = localStorage.getItem('user') ?? '';
    this.projectService
      .getProjectsById(id)
      .subscribe((res: any) => this.projects = res.data);
  }
}

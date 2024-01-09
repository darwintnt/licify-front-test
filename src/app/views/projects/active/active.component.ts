import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../../components/card/card.component';
import { ProjectService } from '../project.service';
import { Project } from '../interfaces/project';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-active',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './active.component.html',
  styleUrl: './active.component.scss',
})
export class ActiveComponent implements OnInit {
  projects?: Project[] = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService
      .getProjects()
      .subscribe((res: any) => this.projects = res.data);
  }
}

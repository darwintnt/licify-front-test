import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ProjectService } from '../project.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-application',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './application.component.html',
  styleUrl: './application.component.scss',
})
export class ApplicationComponent {
  applications!: any[];

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    const id = localStorage.getItem('user') ?? '';

    this.projectService.getApplyProjects(id).subscribe((res:any) => {
      this.applications = res.data;
    });
  }

  handleTotalProject(items: any): number {
    return items.reduce(
      (accumulator: number, obj: any) => accumulator + obj.value,
      0
    );
  }

  handleTotalOfferedValueProject(items: any): number {
    return items.reduce(
      (accumulator: number, obj: any) => accumulator + obj.offered_value,
      0
    );
  }
}

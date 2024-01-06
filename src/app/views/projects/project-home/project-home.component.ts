import { Component } from '@angular/core';
import { CardComponent } from '../../../components/card/card.component';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-project-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, CardComponent],
  templateUrl: './project-home.component.html',
  styleUrl: './project-home.component.scss',
})
export class ProjectHomeComponent {}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../views/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  collapseShow = 'hidden';

  constructor(private authService: AuthService) {}

  toggleCollapseShow(classes: any) {
    this.collapseShow = classes;
  }

  isConstructor(): boolean {
    return this.authService.isConstructorUser
  }

  exit(): void {
    this.authService.logout();
  }
}

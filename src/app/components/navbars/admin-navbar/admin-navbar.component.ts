import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { createPopper } from '@popperjs/core';
import { AuthService } from '../../../views/auth/auth.service';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.scss',
})
export class AdminNavbarComponent implements AfterViewInit {
  dropdownPopoverShow = false;

  @ViewChild('btnDropdownRef', { static: false })
  btnDropdownRef!: ElementRef;

  @ViewChild('popoverDropdownRef', { static: false })
  popoverDropdownRef!: ElementRef;

  constructor(private authService: AuthService) {}

  ngAfterViewInit() {
    createPopper(
      this.btnDropdownRef.nativeElement,
      this.popoverDropdownRef.nativeElement,
      {
        placement: 'bottom-start',
      }
    );
  }

  toggleDropdown(event: any) {
    event.preventDefault();
    if (this.dropdownPopoverShow) {
      this.dropdownPopoverShow = false;
    } else {
      this.dropdownPopoverShow = true;
    }
  }

  exit(): void {
    this.authService.logout();
  }
}

import { Component, Input } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';
import { CommonModule } from '@angular/common';
import { NavigationExtras, Router } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, CarouselComponent, TooltipModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() data: any;
  @Input() activeApply: boolean = false;
  @Input() activeShow: boolean = false;

  constructor(private router: Router) {}

  apply(id: string): void {
    const navigationExtras: NavigationExtras = {
      queryParams: { project: id },
    };
    this.router.navigate([`/provider/apply`], navigationExtras);
  }

  handleTotalProject(items: any): number {
    return items.reduce(
      (acumulador: number, objeto: any) => acumulador + objeto.value,
      0
    );
  }
}

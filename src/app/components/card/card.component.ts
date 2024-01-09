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
      (accumulator: number, obj: any) => accumulator + obj.value,
      0
    );
  }

  getImages(): any {
    if (this.data.images && this.data.images.length > 0) {
      return this.data.images;
    }

    return ['../../../assets/img/noimageavailable.png'];
  }
}

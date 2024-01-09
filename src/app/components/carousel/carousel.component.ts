import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, CarouselModule],
  templateUrl: './carousel.component.html',
})
export class CarouselComponent {
  @Input() images: Array<string> = [];
  @Input() id: string = 'default-carousel';
  @Input() duration: number = 5000;

  circular: boolean = false;

  isSlider(): boolean {
    if (this.images && this.images.length > 1) {
      this.circular = true;
      return this.circular;
    }

    return false;
  }
}

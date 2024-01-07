import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
})
export class CarouselComponent implements OnInit {
  @Input() images: Array<string> | undefined;
  @Input() duration: number = 1000;
  @Input() mode: string = 'static'; // slide o static

  ngOnInit(): void {
    this.images = [
      'https://licify-images.s3.amazonaws.com/house_1.jpg',
      'https://licify-images.s3.amazonaws.com/house_2.jpg',
      'https://licify-images.s3.amazonaws.com/house_3.jpg',
      'https://licify-images.s3.amazonaws.com/house_2.jpg',
      'https://licify-images.s3.amazonaws.com/house_3.jpg',
    ]
  }
}

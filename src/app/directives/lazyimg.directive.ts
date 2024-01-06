import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: 'img',
  standalone: true,
})
export class LazyimgDirective {
  constructor({ nativeElement }: ElementRef<HTMLImageElement>) {
    const supports = 'loading' in HTMLImageElement.prototype;

    if (supports) {
      nativeElement.setAttribute('loading', 'lazy');
    }
  }
}

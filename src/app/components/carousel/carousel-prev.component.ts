import { Component, Input } from '@angular/core';
import { CarouselService } from './carousel.component';

@Component({
  selector: 'app-carousel-prev',
  standalone: true,
  template: `<button class="carousel-prev" [disabled]="!ctx.canScrollPrev" (click)="ctx.scrollPrev()"><ng-content>‹</ng-content></button>`,
  styles: [`.carousel-prev { position: absolute; left: -48px; top: 50%; transform: translateY(-50%); border: 0; background: transparent; cursor: pointer; }`]
})
export class CarouselPrevComponent {
  @Input() className = '';
  constructor(public ctx: CarouselService) {}
}

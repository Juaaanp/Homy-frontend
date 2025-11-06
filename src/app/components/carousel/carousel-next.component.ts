import { Component, Input } from '@angular/core';
import { CarouselService } from './carousel.component';

@Component({
  selector: 'app-carousel-next',
  standalone: true,
  template: `<button class="carousel-next" [disabled]="!ctx.canScrollNext" (click)="ctx.scrollNext()"><ng-content>›</ng-content></button>`,
  styles: [`.carousel-next { position: absolute; right: -48px; top: 50%; transform: translateY(-50%); border: 0; background: transparent; cursor: pointer; }`]
})
export class CarouselNextComponent {
  @Input() className = '';
  constructor(public ctx: CarouselService) {}
}

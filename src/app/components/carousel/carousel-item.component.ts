import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-carousel-item',
  standalone: true,
  template: `<div class="carousel-item" [class.horizontal]="orientation === 'horizontal'" [class.vertical]="orientation === 'vertical'" [className]="className"><ng-content></ng-content></div>`,
  styles: [`.carousel-item { min-width: 100%; flex: 0 0 auto; } .carousel-item.vertical { min-height: 100%; }`]
})
export class CarouselItemComponent {
  @Input() className = '';
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
}

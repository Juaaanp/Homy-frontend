import { Component, Input, HostListener, Injectable } from '@angular/core';

/** Simple Carousel service used as local context provider */
@Injectable()
export class CarouselService {
  orientation: 'horizontal' | 'vertical' = 'horizontal';
  container?: HTMLElement | null = null;

  canScrollPrev = false;
  canScrollNext = false;

  setContainer(el: HTMLElement | null) {
    this.container = el;
    this.update();
    if (!el) return;
    el.addEventListener('scroll', this.updateBound);
    window.addEventListener('resize', this.updateBound);
  }

  private updateBound = this.update.bind(this);

  update() {
    const el = this.container;
    if (!el) {
      this.canScrollPrev = false;
      this.canScrollNext = false;
      return;
    }

    if (this.orientation === 'horizontal') {
      this.canScrollPrev = el.scrollLeft > 0;
      this.canScrollNext = el.scrollLeft + el.clientWidth < el.scrollWidth - 1;
    } else {
      this.canScrollPrev = el.scrollTop > 0;
      this.canScrollNext = el.scrollTop + el.clientHeight < el.scrollHeight - 1;
    }
  }

  scrollPrev() {
    const el = this.container;
    if (!el) return;
    if (this.orientation === 'horizontal') {
      el.scrollBy({ left: -el.clientWidth, behavior: 'smooth' });
    } else {
      el.scrollBy({ top: -el.clientHeight, behavior: 'smooth' });
    }
  }

  scrollNext() {
    const el = this.container;
    if (!el) return;
    if (this.orientation === 'horizontal') {
      el.scrollBy({ left: el.clientWidth, behavior: 'smooth' });
    } else {
      el.scrollBy({ top: el.clientHeight, behavior: 'smooth' });
    }
  }

  destroy() {
    if (this.container) {
      this.container.removeEventListener('scroll', this.updateBound);
      window.removeEventListener('resize', this.updateBound);
    }
  }
}

@Component({
  selector: 'app-carousel',
  standalone: true,
  providers: [CarouselService],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';

  constructor(private ctx: CarouselService) {
    // nothing
  }

  ngOnInit() {
    this.ctx.orientation = this.orientation;
  }

  ngOnDestroy() {
    this.ctx.destroy();
  }

  @HostListener('keydown', ['$event'])
  handleKey(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.ctx.scrollPrev();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.ctx.scrollNext();
    }
  }
}

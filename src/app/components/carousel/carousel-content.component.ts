import { Component, ElementRef, Input, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselService } from './carousel.component';

@Component({
  selector: 'app-carousel-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel-content.component.html',
  styleUrls: ['./carousel-content.component.css']
})
export class CarouselContentComponent implements AfterViewInit {
  @Input() className = '';

  constructor(private host: ElementRef<HTMLElement>, private ctx: CarouselService) {}

  ngAfterViewInit(): void {
    const el = this.host.nativeElement.querySelector('.carousel-viewport') as HTMLElement | null;
    this.ctx.setContainer(el);
  }
}

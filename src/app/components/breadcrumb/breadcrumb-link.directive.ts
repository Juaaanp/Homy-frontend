import { Directive, ElementRef, Input, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appBreadcrumbLink]'
})
export class BreadcrumbLinkDirective implements OnInit {
  @Input('appBreadcrumbLink') className = '';

  constructor(private el: ElementRef<HTMLElement>, private rd: Renderer2) {}

  ngOnInit(): void {
    const host = this.el.nativeElement;
    // add base classes
    rdAddClass(this.rd, host, 'breadcrumb-link');
    if (this.className) {
      this.className.split(' ').filter(Boolean).forEach(c => rdAddClass(this.rd, host, c));
    }
  }
}

function rdAddClass(rd: Renderer2, el: HTMLElement, c: string) {
  try { rd.addClass(el, c); } catch { /* noop */ }
}

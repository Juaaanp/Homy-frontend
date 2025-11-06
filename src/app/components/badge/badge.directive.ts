import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';

@Directive({
  selector: '[appBadge]'
})
export class BadgeDirective implements OnInit {
  @Input('appBadge') variant: BadgeVariant | '' = '';
  @Input() className = '';

  private baseClass = 'badge';

  constructor(private el: ElementRef<HTMLElement>, private rd: Renderer2) {}

  ngOnInit(): void {
    const host = this.el.nativeElement;
    // add base class
    this.rd.addClass(host, this.baseClass);

  // add variant class mapped to Bootstrap
  const v = this.variant || 'default';
  const bsClass = this.mapVariant(v);
  bsClass.split(' ').forEach(c => this.rd.addClass(host, c));

    // add any additional classes
    if (this.className) {
      this.className.split(' ').filter(Boolean).forEach(c => this.rd.addClass(host, c));
    }
  }

  private mapVariant(v: BadgeVariant): string {
    switch (v) {
      case 'secondary':
        return 'text-bg-secondary';
      case 'destructive':
        return 'text-bg-danger';
      case 'outline':
        return 'border border-secondary text-secondary bg-transparent';
      case 'default':
      default:
        return 'text-bg-primary';
    }
  }
}

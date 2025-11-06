import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';

type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

@Directive({
  selector: '[appButton]'
})
export class ButtonDirective implements OnInit {
  @Input('appButton') variant: ButtonVariant | '' = '';
  @Input() size: ButtonSize | '' = '';
  @Input() className = '';

  constructor(private el: ElementRef<HTMLElement>, private rd: Renderer2) {}

  ngOnInit(): void {
    const host = this.el.nativeElement;
    this.rd.addClass(host, 'btn');

    const v = (this.variant || 'default') as string;
    this.rd.addClass(host, `btn--${v}`);

    if (this.size) this.rd.addClass(host, `btn--${this.size}`);

    if (this.className) {
      this.className.split(' ').filter(Boolean).forEach(c => this.rd.addClass(host, c));
    }
  }
}

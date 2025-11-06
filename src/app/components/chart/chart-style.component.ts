import { Component, Input } from '@angular/core';

const THEMES: Record<string, string> = { light: '', dark: '.dark' };

@Component({
  selector: 'app-chart-style',
  standalone: true,
  template: `<style *ngIf="cssText" [innerHTML]="cssText"></style>`
})
export class ChartStyleComponent {
  @Input() id = '';
  @Input() config: Record<string, any> | null = null;

  get cssText(): string | null {
    if (!this.config) return null;

    const colorConfig = Object.entries(this.config).filter(([, c]) => c.theme || c.color);
    if (!colorConfig.length) return null;

    const blocks = Object.entries(THEMES).map(([theme, prefix]) => {
      const inner = colorConfig
        .map(([key, itemConfig]) => {
          const color = itemConfig.theme?.[theme] ?? itemConfig.color;
          return color ? `  --color-${key}: ${color};` : null;
        })
        .filter(Boolean)
        .join('\n');

      return `${prefix} [data-chart=${this.id}] {\n${inner}\n}`;
    });

    return blocks.join('\n');
  }
}

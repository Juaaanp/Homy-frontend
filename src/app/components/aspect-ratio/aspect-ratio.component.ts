import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aspect-ratio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aspect-ratio.component.html',
  styleUrls: ['./aspect-ratio.component.css']
})
export class AspectRatioComponent {
  /** Accepts a ratio as number (e.g. 16/9 -> 1.777...) or string (e.g. '16/9' or '1.777') */
  @Input() ratio: string | number = '16/9';

  /** computed padding-top percentage used by the CSS shim */
  get paddingTop(): string {
    const r = this._parseRatio(this.ratio);
    const pt = (1 / r) * 100;
    return `${pt}%`;
  }

  private _parseRatio(value: string | number): number {
    if (typeof value === 'number') {
      return value > 0 ? value : 16 / 9;
    }

    const s = (value || '').toString().trim();
    if (s.includes('/')) {
      const parts = s.split('/').map(p => Number(p.trim()));
      if (parts.length === 2 && parts[0] > 0 && parts[1] > 0) {
        return parts[0] / parts[1];
      }
    }

    const n = Number(s);
    if (!isNaN(n) && n > 0) return n;

    // fallback
    return 16 / 9;
  }
}

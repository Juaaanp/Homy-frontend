import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getPayloadConfigFromPayload } from './utils';

@Component({
  selector: 'app-chart-tooltip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chart-tooltip.component.html',
  styleUrls: ['./chart-tooltip.component.css']
})
export class ChartTooltipComponent {
  @Input() active = false;
  @Input() payload: any[] | null = null;
  @Input() label: any = null;
  @Input() hideLabel = false;
  @Input() hideIndicator = false;
  @Input() indicator: 'line' | 'dot' | 'dashed' = 'dot';
  @Input() nameKey?: string;
  @Input() labelKey?: string;
  @Input() className = '';
  @Input() labelFormatter?: (value: any, payload?: any[]) => any;
  @Input() formatter?: (value: any, name?: any, payload?: any, index?: number) => any;
  @Input() config: Record<string, any> | null = null;

  trackByIndex(index: number) { return index; }

  getTooltipLabel(itemPayload: any) {
    if (this.hideLabel || !this.payload?.length) return null;

    const item = this.payload[0];
    const key = `${this.labelKey || item?.dataKey || item?.name || 'value'}`;
    const itemConfig = getPayloadConfigFromPayload(this.config || {}, item, key);
    const value = itemConfig?.label;

    if (this.labelFormatter) return this.labelFormatter(value, this.payload as any[]);
    return value;
  }
}

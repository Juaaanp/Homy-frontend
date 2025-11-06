import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getPayloadConfigFromPayload as _getPayloadConfigFromPayload, ChartConfig } from './utils';

@Component({
  selector: 'app-chart-legend',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chart-legend.component.html',
  styleUrls: ['./chart-legend.component.css']
})
export class ChartLegendComponent {
  @Input() payload: any[] | null = null;
  @Input() hideIcon = false;
  @Input() verticalAlign: 'top' | 'bottom' | 'middle' = 'bottom';
  @Input() nameKey?: string;
  @Input() config: Record<string, any> | null = null;

  // Provide a method usable from the template without AOT issues
  getPayloadConfigFromPayload(config: ChartConfig | null, payload: unknown, key: string) {
    return _getPayloadConfigFromPayload(config ?? {}, payload, key);
  }
}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartStyleComponent } from './chart-style.component';

@Component({
  selector: 'app-chart-container',
  standalone: true,
  imports: [CommonModule, ChartStyleComponent],
  templateUrl: './chart-container.component.html',
  styleUrls: ['./chart-container.component.css']
})
export class ChartContainerComponent {
  private static _idCounter = 0;

  @Input() id?: string;
  @Input() config: Record<string, any> | null = null;

  get chartId(): string {
    if (this.id) return this.id;
    ChartContainerComponent._idCounter += 1;
    return `chart-${Date.now().toString(36)}-${ChartContainerComponent._idCounter}`;
  }
}

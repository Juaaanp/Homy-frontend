import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

type Mode = 'single' | 'range';

function startOfMonth(d: Date) { return new Date(d.getFullYear(), d.getMonth(), 1); }
function endOfMonth(d: Date) { return new Date(d.getFullYear(), d.getMonth() + 1, 0); }
function addMonths(d: Date, n: number) { return new Date(d.getFullYear(), d.getMonth() + n, 1); }
function isSameDay(a: Date, b: Date) { return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); }

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  /** Show days from previous/next months */
  @Input() showOutsideDays = true;

  /** mode: 'single' or 'range' */
  @Input() mode: Mode = 'single';

  /** currently displayed month */
  @Input() month: Date = startOfMonth(new Date());

  /** selected value: Date for single, { from, to } for range */
  @Input() selected: Date | { from: Date | null; to: Date | null } | null = null;
  @Output() selectedChange = new EventEmitter<any>();

  private _today = new Date();

  prevMonth() { this.month = addMonths(this.month, -1); }
  nextMonth() { this.month = addMonths(this.month, 1); }

  selectDay(day: Date) {
    if (this.mode === 'single') {
      this.selected = day;
      this.selectedChange.emit(day);
      return;
    }

    // range mode
    if (!this.selected || !('from' in this.selected)) {
      this.selected = { from: day, to: null };
      this.selectedChange.emit(this.selected);
      return;
    }

    const range = this.selected as { from: Date | null; to: Date | null };
    if (!range.from || (range.from && range.to)) {
      this.selected = { from: day, to: null };
      this.selectedChange.emit(this.selected);
      return;
    }

    // set to if day >= from, otherwise start new range
    if (range.from && day >= range.from) {
      this.selected = { from: range.from, to: day };
    } else {
      this.selected = { from: day, to: range.from };
    }
    this.selectedChange.emit(this.selected);
  }

  weeks(): Date[][] {
    const start = startOfMonth(this.month);
    const end = endOfMonth(this.month);
    // start from Sunday (0) to Saturday (6)
    const startDay = new Date(start);
    startDay.setDate(start.getDate() - start.getDay());

    const weeks: Date[][] = [];
    let cursor = new Date(startDay);
    while (cursor <= end || cursor.getDay() !== 0) {
      const week: Date[] = [];
      for (let i = 0; i < 7; i++) {
        week.push(new Date(cursor));
        cursor.setDate(cursor.getDate() + 1);
      }
      weeks.push(week);
      // stop if we've passed the end and are at the start of next week
      if (cursor > end && cursor.getDay() === 0) break;
    }
    return weeks;
  }

  isToday(d: Date) { return isSameDay(d, this._today); }

  isSelected(d: Date) {
    if (!this.selected) return false;
    if (this.mode === 'single') {
      return isSameDay(d, this.selected as Date);
    }
    const r = this.selected as { from: Date | null; to: Date | null };
    if (r.from && r.to) {
      return d >= r.from && d <= r.to;
    }
    if (r.from) return isSameDay(d, r.from);
    return false;
  }

  isOutside(d: Date) {
    return d.getMonth() !== this.month.getMonth();
  }

  formatMonth(d: Date) {
    return d.toLocaleString(undefined, { month: 'long', year: 'numeric' });
  }

  weekdays(): string[] {
    const base = new Date(1970, 0, 4); // Sunday
    return Array.from({ length: 7 }).map((_, i) => base.setDate(base.getDate() + (i === 0 ? 0 : 1)) || '').map((v, idx) => {
      const day = new Date(1970, 0, 4 + idx);
      return day.toLocaleString(undefined, { weekday: 'short' });
    });
  }
}

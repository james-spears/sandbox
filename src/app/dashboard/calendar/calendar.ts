import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { YearView } from './year-view/year-view';
import { MonthView } from './month-view/month-view';
import { WeekView } from './week-view/week-view';
import { DayView } from './day-view/day-view';
import { CalendarView } from './calendar-service';

@Component({
  selector: 'app-calendar',
  imports: [YearView, MonthView, WeekView, DayView],
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Calendar {
  view = signal<CalendarView>('month');
}

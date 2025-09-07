import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, inject, Output } from '@angular/core';
import { CalendarService, CalendarView } from '../calendar-service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-year-view',
  imports: [DatePipe],
  templateUrl: './year-view.html',
  styleUrl: './year-view.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class YearView {
  @Output() viewChange: EventEmitter<CalendarView> = new EventEmitter();
  calendarService: CalendarService = inject(CalendarService);

  ngOnInit(): void {
    this.calendarService.setYearMonths();
  }
}

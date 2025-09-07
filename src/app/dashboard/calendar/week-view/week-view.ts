import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  inject,
  OnInit,
  Output,
} from '@angular/core';
import { CalendarDate, CalendarService, CalendarView } from '../calendar-service';

@Component({
  selector: 'app-week-view',
  imports: [],
  templateUrl: './week-view.html',
  styleUrl: './week-view.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WeekView implements OnInit {
  @Output() viewChange: EventEmitter<CalendarView> = new EventEmitter();
  calendarService: CalendarService = inject(CalendarService);

  ngOnInit(): void {
    this.calendarService.setWeekDays();
  }

  isToday(day: CalendarDate) {
    const isToday = day.date === this.calendarService.todaysDate();
    const isThisMonth = day.month === this.calendarService.thisMonth();
    const isThisYear = day.year === this.calendarService.thisYear();
    return isToday && isThisMonth && isThisYear ? true : null;
  }
}

import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  inject,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { CalendarService, CalendarView } from '../calendar-service';

@Component({
  selector: 'app-month-view',
  imports: [],
  templateUrl: './month-view.html',
  styleUrl: './month-view.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MonthView implements OnInit {
  @Output() viewChange: EventEmitter<CalendarView> = new EventEmitter();
  calendarService: CalendarService = inject(CalendarService);

  ngOnInit(): void {
    this.calendarService.setMonthDays();
  }
}

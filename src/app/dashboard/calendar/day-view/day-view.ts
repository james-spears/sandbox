import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  inject,
  OnInit,
  Output,
} from '@angular/core';
import { CalendarService, CalendarView } from '../calendar-service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-day-view',
  imports: [DatePipe],
  templateUrl: './day-view.html',
  styleUrl: './day-view.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DayView implements OnInit {
  @Output() viewChange: EventEmitter<CalendarView> = new EventEmitter();
  calendarService: CalendarService = inject(CalendarService);
  daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  ngOnInit(): void {}
}

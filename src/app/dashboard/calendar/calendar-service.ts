import { computed, Injectable, signal } from '@angular/core';

export type CalendarView = 'year' | 'month' | 'week' | 'day';

export interface CalendarDate {
  value: Date;
  locale: string;
  date: number;
  day: number;
  month: number;
  year: number;
  events: unknown[];
}

export interface CalendarMonth {
  name: string;
  month: number;
  days: CalendarDate[];
}

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  now = computed(() => new Date());
  todaysDate = computed(() => this.now().getDate());
  thisMonth = computed(() => this.now().getMonth());
  thisYear = computed(() => this.now().getFullYear());
  selectedDate = signal<Date>(new Date());
  selectedStartOfWeek = computed(
    () =>
      new Date(
        this.selectedDate().getFullYear(),
        this.selectedDate().getMonth(),
        this.selectedDate().getDate() - this.selectedDate().getDay(),
      ),
  );
  selectedEndOfWeek = computed(
    () =>
      new Date(
        this.selectedStartOfWeek().getFullYear(),
        this.selectedStartOfWeek().getMonth(),
        this.selectedStartOfWeek().getDate() + 7,
      ),
  );
  selectedMonth = computed(() => this.selectedDate().getMonth());
  selectedMonthLocale = computed(() =>
    this.selectedDate().toLocaleString('default', { month: 'long' }),
  );
  selectedYearLocale = computed(() =>
    this.selectedDate().toLocaleString('default', { year: 'numeric' }),
  );
  weekViewDays = signal<CalendarDate[]>([]);
  monthViewDays = signal<CalendarDate[]>([]);
  yearViewMonths = signal<CalendarMonth[]>([]);

  createDateSpan(from: [number, number, number], to = from): CalendarDate[] {
    const dateArray = new Array<Date>();
    const currentDate = new Date(...from);
    const stopDate = new Date(...to);
    while (currentDate < stopDate) {
      dateArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray.map((date) => ({
      locale: date.toLocaleDateString('en-CA'),
      value: date,
      date: date.getDate(),
      day: date.getDay(),
      month: date.getMonth(),
      year: date.getFullYear(),
      events: [],
    }));
  }

  goToToday() {
    this.selectedDate.set(this.now());
    console.log('date', this.selectedDate());
  }

  incrementDay() {
    this.selectedDate.set(
      new Date(
        this.selectedDate().getFullYear(),
        this.selectedDate().getMonth(),
        this.selectedDate().getDate() + 1,
      ),
    );
    console.log('date', this.selectedDate());
    this.setMonthDays();
  }

  decrementDay() {
    this.selectedDate.set(
      new Date(
        this.selectedDate().getFullYear(),
        this.selectedDate().getMonth(),
        this.selectedDate().getDate() - 1,
      ),
    );
    console.log('date', this.selectedDate());
    this.setMonthDays();
  }

  incrementMonth() {
    this.selectedDate.set(
      new Date(
        this.selectedDate().getFullYear(),
        this.selectedDate().getMonth() + 1,
        this.selectedDate().getDate(),
      ),
    );
    console.log('date', this.selectedDate());
    this.setMonthDays();
  }

  decrementMonth() {
    this.selectedDate.set(
      new Date(
        this.selectedDate().getFullYear(),
        this.selectedDate().getMonth() - 1,
        this.selectedDate().getDate(),
      ),
    );
    console.log('date', this.selectedDate());
    this.setMonthDays();
  }

  generateMonthDays(date: Date) {
    console.log('date', date);
    const precedingDays = date.getDay() - 1;
    const trailingDays =
      6 * 7 - new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() - precedingDays;
    const from: [number, number, number] = [date.getFullYear(), date.getMonth(), -precedingDays];
    const to: [number, number, number] = [date.getFullYear(), date.getMonth() + 1, trailingDays];
    return this.createDateSpan(from, to);
  }

  setMonthDays() {
    const date = new Date(this.selectedDate().getFullYear(), this.selectedDate().getMonth(), 1);
    this.monthViewDays.set(this.generateMonthDays(date));
    console.log(this.monthViewDays());
  }

  setYearMonths() {
    let yearViewMonths = [];
    for (let i = 0; i < 12; i++) {
      const date = new Date(this.selectedDate().getFullYear(), i, 1);
      yearViewMonths.push({
        name: date.toLocaleString('default', { month: 'long' }),
        month: date.getMonth(),
        days: this.generateMonthDays(date),
      });
    }
    this.yearViewMonths.set(yearViewMonths);
  }

  incrementWeek() {
    this.selectedDate.set(
      new Date(
        this.selectedDate().getFullYear(),
        this.selectedDate().getMonth(),
        this.selectedDate().getDate() + 7,
      ),
    );
    console.log('date', this.selectedDate());
    this.setWeekDays();
  }

  decrementWeek() {
    this.selectedDate.set(
      new Date(
        this.selectedDate().getFullYear(),
        this.selectedDate().getMonth(),
        this.selectedDate().getDate() - 7,
      ),
    );
    console.log('date', this.selectedDate());
    this.setWeekDays();
  }

  setWeekDays() {
    console.log('date', this.selectedDate());
    const from: [number, number, number] = [
      this.selectedStartOfWeek().getFullYear(),
      this.selectedStartOfWeek().getMonth(),
      this.selectedStartOfWeek().getDate(),
    ];
    const to: [number, number, number] = [
      this.selectedEndOfWeek().getFullYear(),
      this.selectedEndOfWeek().getMonth(),
      this.selectedEndOfWeek().getDate(),
    ];
    this.weekViewDays.set(this.createDateSpan(from, to));
  }
}

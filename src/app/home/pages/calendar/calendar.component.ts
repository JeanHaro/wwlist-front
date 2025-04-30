import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'home-calendar',
  standalone: false,

  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent {

}

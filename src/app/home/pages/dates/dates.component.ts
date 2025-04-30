import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'home-dates',
  standalone: false,

  templateUrl: './dates.component.html',
  styleUrl: './dates.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatesComponent {

}

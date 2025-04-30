import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'home-dates',
  standalone: true,
  imports: [
    CommonModule
  ],

  templateUrl: './dates.component.html',
  styleUrl: './dates.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatesComponent {

}

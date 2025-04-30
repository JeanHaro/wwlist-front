import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-nopagefound',
  standalone: false,

  templateUrl: './nopagefound.component.html',
  styleUrl: './nopagefound.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NopagefoundComponent {

}

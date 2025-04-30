import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'home-layout',
  standalone: false,

  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent {

}

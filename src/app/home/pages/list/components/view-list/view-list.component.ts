import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'home-view-list',
  standalone: false,

  templateUrl: './view-list.component.html',
  styleUrl: './view-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewListComponent {

}

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-edit-list',
  standalone: false,

  templateUrl: './edit-list.component.html',
  styleUrl: './edit-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditListComponent {

}

import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-create-list',
  standalone: false,

  templateUrl: './create-list.component.html',
  styleUrl: './create-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateListComponent {

}

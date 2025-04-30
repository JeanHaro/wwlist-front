import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-edit-gallery',
  standalone: false,

  templateUrl: './edit-gallery.component.html',
  styleUrl: './edit-gallery.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditGalleryComponent {

}

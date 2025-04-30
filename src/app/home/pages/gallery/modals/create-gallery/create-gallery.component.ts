import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'home-create-gallery',
  standalone: false,

  templateUrl: './create-gallery.component.html',
  styleUrl: './create-gallery.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateGalleryComponent {

}

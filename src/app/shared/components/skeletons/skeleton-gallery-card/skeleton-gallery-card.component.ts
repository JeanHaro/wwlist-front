import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'skeleton-gallery-card',
  standalone: false,
  templateUrl: './skeleton-gallery-card.component.html',
  styleUrl: './skeleton-gallery-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonGalleryCardComponent { }

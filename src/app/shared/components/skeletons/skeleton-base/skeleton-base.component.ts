import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'shared-skeleton-base',
  standalone: false,
  templateUrl: './skeleton-base.component.html',
  styleUrl: './skeleton-base.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonBaseComponent {
  width = input<string>('100%');
  height = input<string>('20px');
  margin = input<string>('0');
  borderRadius = input<string>('4px');
}

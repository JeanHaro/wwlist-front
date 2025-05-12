import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes
// --> Skeleton
import { SkeletonBaseComponent } from './components/skeletons/skeleton-base/skeleton-base.component';
import { SkeletonGalleryCardComponent } from './components/skeletons/skeleton-gallery-card/skeleton-gallery-card.component';
import { SkeletonGalleryContainerComponent } from './components/skeletons/skeleton-gallery-container/skeleton-gallery-container.component';

// Modulos
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    SkeletonBaseComponent,
    SkeletonGalleryCardComponent,
    SkeletonGalleryContainerComponent
  ],
  imports: [
    CommonModule,
    FaIconComponent,
  ],
  exports: [
    FaIconComponent,
    SkeletonGalleryContainerComponent,
  ]
})
export class SharedModule { }

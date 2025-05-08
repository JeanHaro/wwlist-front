import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonGalleryContainerComponent } from './skeleton-gallery-container.component';

describe('SkeletonGalleryContainerComponent', () => {
  let component: SkeletonGalleryContainerComponent;
  let fixture: ComponentFixture<SkeletonGalleryContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SkeletonGalleryContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonGalleryContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

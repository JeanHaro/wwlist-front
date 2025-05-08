import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonGalleryCardComponent } from './skeleton-gallery-card.component';

describe('SkeletonGalleryCardComponent', () => {
  let component: SkeletonGalleryCardComponent;
  let fixture: ComponentFixture<SkeletonGalleryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SkeletonGalleryCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonGalleryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGalleryCardComponent } from './view-gallery-card.component';

describe('ViewGalleryCardComponent', () => {
  let component: ViewGalleryCardComponent;
  let fixture: ComponentFixture<ViewGalleryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewGalleryCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewGalleryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

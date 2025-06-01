import { TestBed } from '@angular/core/testing';

import { GalleryModalService } from './gallery-modal.service';

describe('GalleryModalService', () => {
  let service: GalleryModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GalleryModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

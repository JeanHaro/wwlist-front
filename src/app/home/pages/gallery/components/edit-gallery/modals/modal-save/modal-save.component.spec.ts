import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSaveComponent } from './modal-save.component';

describe('ModalSaveComponent', () => {
  let component: ModalSaveComponent;
  let fixture: ComponentFixture<ModalSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalSaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

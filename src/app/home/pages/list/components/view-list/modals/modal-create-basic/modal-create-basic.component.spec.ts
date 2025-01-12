import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateBasicComponent } from './modal-create-basic.component';

describe('ModalCreateBasicComponent', () => {
  let component: ModalCreateBasicComponent;
  let fixture: ComponentFixture<ModalCreateBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalCreateBasicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCreateBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

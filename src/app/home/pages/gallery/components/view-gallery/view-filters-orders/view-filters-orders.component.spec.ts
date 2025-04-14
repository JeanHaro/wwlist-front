import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFiltersOrdersComponent } from './view-filters-orders.component';

describe('ViewFiltersOrdersComponent', () => {
  let component: ViewFiltersOrdersComponent;
  let fixture: ComponentFixture<ViewFiltersOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewFiltersOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewFiltersOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

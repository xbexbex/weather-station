import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationPointComponent } from './observation-point.component';

describe('ObservationPointComponent', () => {
  let component: ObservationPointComponent;
  let fixture: ComponentFixture<ObservationPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservationPointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservationPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

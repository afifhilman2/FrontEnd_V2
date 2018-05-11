import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JualTripComponent } from './jual-trip.component';

describe('JualTripComponent', () => {
  let component: JualTripComponent;
  let fixture: ComponentFixture<JualTripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JualTripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JualTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

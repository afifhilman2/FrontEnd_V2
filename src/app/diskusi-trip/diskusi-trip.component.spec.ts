import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiskusiTripComponent } from './diskusi-trip.component';

describe('DiskusiTripComponent', () => {
  let component: DiskusiTripComponent;
  let fixture: ComponentFixture<DiskusiTripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiskusiTripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiskusiTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

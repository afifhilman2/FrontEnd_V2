import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaftarTripComponent } from './daftar-trip.component';

describe('DaftarTripComponent', () => {
  let component: DaftarTripComponent;
  let fixture: ComponentFixture<DaftarTripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaftarTripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaftarTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

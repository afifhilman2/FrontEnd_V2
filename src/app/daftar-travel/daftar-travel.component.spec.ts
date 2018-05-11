import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaftarTravelComponent } from './daftar-travel.component';

describe('DaftarTravelComponent', () => {
  let component: DaftarTravelComponent;
  let fixture: ComponentFixture<DaftarTravelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaftarTravelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaftarTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

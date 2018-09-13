import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalinTripComponent } from './salin-trip.component';

describe('SalinTripComponent', () => {
  let component: SalinTripComponent;
  let fixture: ComponentFixture<SalinTripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalinTripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalinTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JualTripContentComponent } from './jual-trip-content.component';

describe('JualTripContentComponent', () => {
  let component: JualTripContentComponent;
  let fixture: ComponentFixture<JualTripContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JualTripContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JualTripContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

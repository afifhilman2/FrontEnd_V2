import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JualTripContent2Component } from './jual-trip-content2.component';

describe('JualTripContent2Component', () => {
  let component: JualTripContent2Component;
  let fixture: ComponentFixture<JualTripContent2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JualTripContent2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JualTripContent2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

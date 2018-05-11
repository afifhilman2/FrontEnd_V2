import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtalaseTravelComponent } from './etalase-travel.component';

describe('EtalaseTravelComponent', () => {
  let component: EtalaseTravelComponent;
  let fixture: ComponentFixture<EtalaseTravelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtalaseTravelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtalaseTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

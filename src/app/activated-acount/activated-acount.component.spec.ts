import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedAcountComponent } from './activated-acount.component';

describe('ActivatedAcountComponent', () => {
  let component: ActivatedAcountComponent;
  let fixture: ComponentFixture<ActivatedAcountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivatedAcountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivatedAcountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

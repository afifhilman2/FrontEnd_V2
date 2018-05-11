import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProsesBayar2Component } from './proses-bayar2.component';

describe('ProsesBayar2Component', () => {
  let component: ProsesBayar2Component;
  let fixture: ComponentFixture<ProsesBayar2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProsesBayar2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProsesBayar2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

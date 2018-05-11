import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProsesBayarComponent } from './proses-bayar.component';

describe('ProsesBayarComponent', () => {
  let component: ProsesBayarComponent;
  let fixture: ComponentFixture<ProsesBayarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProsesBayarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProsesBayarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

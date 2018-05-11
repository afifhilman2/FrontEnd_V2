import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UbahKataSandiComponent } from './ubah-kata-sandi.component';

describe('UbahKataSandiComponent', () => {
  let component: UbahKataSandiComponent;
  let fixture: ComponentFixture<UbahKataSandiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UbahKataSandiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UbahKataSandiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LupaKataSandiComponent } from './lupa-kata-sandi.component';

describe('LupaKataSandiComponent', () => {
  let component: LupaKataSandiComponent;
  let fixture: ComponentFixture<LupaKataSandiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LupaKataSandiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LupaKataSandiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

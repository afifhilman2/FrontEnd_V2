import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EksternalComponent } from './eksternal.component';

describe('EksternalComponent', () => {
  let component: EksternalComponent;
  let fixture: ComponentFixture<EksternalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EksternalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EksternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

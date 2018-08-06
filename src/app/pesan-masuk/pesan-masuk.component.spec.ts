import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PesanMasukComponent } from './pesan-masuk.component';

describe('PesanMasukComponent', () => {
  let component: PesanMasukComponent;
  let fixture: ComponentFixture<PesanMasukComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PesanMasukComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesanMasukComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

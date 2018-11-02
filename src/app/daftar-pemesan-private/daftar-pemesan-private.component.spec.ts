import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaftarPemesanPrivateComponent } from './daftar-pemesan-private.component';

describe('DaftarPemesanPrivateComponent', () => {
  let component: DaftarPemesanPrivateComponent;
  let fixture: ComponentFixture<DaftarPemesanPrivateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaftarPemesanPrivateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaftarPemesanPrivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

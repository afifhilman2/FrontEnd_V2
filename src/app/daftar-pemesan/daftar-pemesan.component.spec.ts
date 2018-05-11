import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaftarPemesanComponent } from './daftar-pemesan.component';

describe('DaftarPemesanComponent', () => {
  let component: DaftarPemesanComponent;
  let fixture: ComponentFixture<DaftarPemesanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaftarPemesanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaftarPemesanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

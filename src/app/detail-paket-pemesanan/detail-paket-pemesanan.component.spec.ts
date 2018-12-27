import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPaketPemesananComponent } from './detail-paket-pemesanan.component';

describe('DetailPaketPemesananComponent', () => {
  let component: DetailPaketPemesananComponent;
  let fixture: ComponentFixture<DetailPaketPemesananComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPaketPemesananComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPaketPemesananComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

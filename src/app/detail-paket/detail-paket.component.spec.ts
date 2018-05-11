import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPaketComponent } from './detail-paket.component';

describe('DetailPaketComponent', () => {
  let component: DetailPaketComponent;
  let fixture: ComponentFixture<DetailPaketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPaketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPaketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProsesPemesananComponent } from './proses-pemesanan.component';

describe('ProsesPemesananComponent', () => {
  let component: ProsesPemesananComponent;
  let fixture: ComponentFixture<ProsesPemesananComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProsesPemesananComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProsesPemesananComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

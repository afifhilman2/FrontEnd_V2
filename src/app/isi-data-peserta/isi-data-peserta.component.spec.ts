import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsiDataPesertaComponent } from './isi-data-peserta.component';

describe('IsiDataPesertaComponent', () => {
  let component: IsiDataPesertaComponent;
  let fixture: ComponentFixture<IsiDataPesertaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsiDataPesertaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsiDataPesertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

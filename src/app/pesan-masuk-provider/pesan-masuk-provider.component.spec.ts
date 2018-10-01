import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PesanMasukProviderComponent } from './pesan-masuk-provider.component';

describe('PesanMasukProviderComponent', () => {
  let component: PesanMasukProviderComponent;
  let fixture: ComponentFixture<PesanMasukProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PesanMasukProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesanMasukProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

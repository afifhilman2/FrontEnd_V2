import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UbahProfilTravelComponent } from './ubah-profil-travel.component';

describe('UbahProfilTravelComponent', () => {
  let component: UbahProfilTravelComponent;
  let fixture: ComponentFixture<UbahProfilTravelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UbahProfilTravelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UbahProfilTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

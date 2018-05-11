import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UbahProfilComponent } from './ubah-profil.component';

describe('UbahProfilComponent', () => {
  let component: UbahProfilComponent;
  let fixture: ComponentFixture<UbahProfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UbahProfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UbahProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

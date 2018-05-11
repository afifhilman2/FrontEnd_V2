import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarAkunProfilComponent } from './sidebar-akun-profil.component';

describe('SidebarAkunProfilComponent', () => {
  let component: SidebarAkunProfilComponent;
  let fixture: ComponentFixture<SidebarAkunProfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarAkunProfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarAkunProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

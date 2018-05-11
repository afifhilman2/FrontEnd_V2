import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritUserComponent } from './favorit-user.component';

describe('FavoritUserComponent', () => {
  let component: FavoritUserComponent;
  let fixture: ComponentFixture<FavoritUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoritUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

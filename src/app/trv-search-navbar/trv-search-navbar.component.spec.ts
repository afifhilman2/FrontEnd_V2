import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrvSearchNavbarComponent } from './trv-search-navbar.component';

describe('TrvSearchNavbarComponent', () => {
  let component: TrvSearchNavbarComponent;
  let fixture: ComponentFixture<TrvSearchNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrvSearchNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrvSearchNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

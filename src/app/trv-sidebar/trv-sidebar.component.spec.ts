import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrvSidebarComponent } from './trv-sidebar.component';

describe('TrvSidebarComponent', () => {
  let component: TrvSidebarComponent;
  let fixture: ComponentFixture<TrvSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrvSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrvSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

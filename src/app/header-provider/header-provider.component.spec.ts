import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderProviderComponent } from './header-provider.component';

describe('HeaderProviderComponent', () => {
  let component: HeaderProviderComponent;
  let fixture: ComponentFixture<HeaderProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

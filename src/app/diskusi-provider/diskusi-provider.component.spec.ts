import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiskusiProviderComponent } from './diskusi-provider.component';

describe('DiskusiProviderComponent', () => {
  let component: DiskusiProviderComponent;
  let fixture: ComponentFixture<DiskusiProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiskusiProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiskusiProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

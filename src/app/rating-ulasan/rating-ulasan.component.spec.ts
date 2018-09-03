import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingUlasanComponent } from './rating-ulasan.component';

describe('RatingUlasanComponent', () => {
  let component: RatingUlasanComponent;
  let fixture: ComponentFixture<RatingUlasanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingUlasanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingUlasanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

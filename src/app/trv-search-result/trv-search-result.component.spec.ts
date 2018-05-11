import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrvSearchResultComponent } from './trv-search-result.component';

describe('TrvSearchResultComponent', () => {
  let component: TrvSearchResultComponent;
  let fixture: ComponentFixture<TrvSearchResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrvSearchResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrvSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

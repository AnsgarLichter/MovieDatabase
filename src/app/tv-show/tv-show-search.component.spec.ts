import { ComponentFixture, TestBed } from '@angular/core/testing';

import {TVShowSearchComponent} from "./tv-show-search.component";
describe('TVShowSearchComponent', () => {
  let component: TVShowSearchComponent;
  let fixture: ComponentFixture<TVShowSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TVShowSearchComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TVShowSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

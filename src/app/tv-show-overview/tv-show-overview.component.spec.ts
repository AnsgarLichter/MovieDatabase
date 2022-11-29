import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvShowOverviewComponent } from './tv-show-overview.component';

describe('TvShowOverviewComponent', () => {
  let component: TvShowOverviewComponent;
  let fixture: ComponentFixture<TvShowOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TvShowOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvShowOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

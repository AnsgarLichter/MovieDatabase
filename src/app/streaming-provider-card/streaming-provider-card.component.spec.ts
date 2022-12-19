import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamingProviderCardComponent } from './streaming-provider-card.component';

describe('StreamingProviderCardComponent', () => {
  let component: StreamingProviderCardComponent;
  let fixture: ComponentFixture<StreamingProviderCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamingProviderCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StreamingProviderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

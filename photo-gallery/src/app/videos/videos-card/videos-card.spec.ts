import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosCard } from './videos-card';

describe('VideosCard', () => {
  let component: VideosCard;
  let fixture: ComponentFixture<VideosCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideosCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideosCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosDetail } from './videos-detail';

describe('VideosDetail', () => {
  let component: VideosDetail;
  let fixture: ComponentFixture<VideosDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideosDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideosDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

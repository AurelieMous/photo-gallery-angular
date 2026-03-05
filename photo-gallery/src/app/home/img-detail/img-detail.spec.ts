import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgDetail } from './img-detail';

describe('ImgDetail', () => {
  let component: ImgDetail;
  let fixture: ComponentFixture<ImgDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImgDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImgDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

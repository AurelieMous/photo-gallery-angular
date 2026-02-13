import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgList } from './img-list';

describe('ImgList', () => {
  let component: ImgList;
  let fixture: ComponentFixture<ImgList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImgList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImgList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

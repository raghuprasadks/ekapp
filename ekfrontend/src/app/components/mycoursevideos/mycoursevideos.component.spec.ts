import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MycoursevideosComponent } from './mycoursevideos.component';

describe('MycoursevideosComponent', () => {
  let component: MycoursevideosComponent;
  let fixture: ComponentFixture<MycoursevideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MycoursevideosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MycoursevideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

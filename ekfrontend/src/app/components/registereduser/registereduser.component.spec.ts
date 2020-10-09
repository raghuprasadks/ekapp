import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistereduserComponent } from './registereduser.component';

describe('RegistereduserComponent', () => {
  let component: RegistereduserComponent;
  let fixture: ComponentFixture<RegistereduserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistereduserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistereduserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

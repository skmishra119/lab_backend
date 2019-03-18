import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsEditComponent } from './doctors-edit.component';

describe('DoctorsEditComponent', () => {
  let component: DoctorsEditComponent;
  let fixture: ComponentFixture<DoctorsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

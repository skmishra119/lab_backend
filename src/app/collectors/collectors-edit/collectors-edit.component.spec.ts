import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectorsEditComponent } from './collectors-edit.component';

describe('CollectorsEditComponent', () => {
  let component: CollectorsEditComponent;
  let fixture: ComponentFixture<CollectorsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectorsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectorsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersFinalComponent } from './orders-final.component';

describe('OrdersFinalComponent', () => {
  let component: OrdersFinalComponent;
  let fixture: ComponentFixture<OrdersFinalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersFinalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

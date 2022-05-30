import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceNotPayedComponent } from './invoice-not-payed.component';

describe('InvoiceNotPayedComponent', () => {
  let component: InvoiceNotPayedComponent;
  let fixture: ComponentFixture<InvoiceNotPayedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceNotPayedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceNotPayedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

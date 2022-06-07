import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VatNotPayedComponent } from './vat-not-payed.component';

describe('VatNotPayedComponent', () => {
  let component: VatNotPayedComponent;
  let fixture: ComponentFixture<VatNotPayedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VatNotPayedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VatNotPayedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

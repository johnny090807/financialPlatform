import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountancyComponent } from './accountancy.component';

describe('InvoiceComponent', () => {
  let component: AccountancyComponent;
  let fixture: ComponentFixture<AccountancyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountancyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

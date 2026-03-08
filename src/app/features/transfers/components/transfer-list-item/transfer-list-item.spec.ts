import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferListItem } from './transfer-list-item';

describe('TransferListItem', () => {
  let component: TransferListItem;
  let fixture: ComponentFixture<TransferListItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferListItem],
    }).compileComponents();

    fixture = TestBed.createComponent(TransferListItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

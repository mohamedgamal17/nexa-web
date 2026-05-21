import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransferListItemSkeleton } from './transfer-list-item-skeleton';

describe('TransferListItemSkeleton', () => {
  let component: TransferListItemSkeleton;
  let fixture: ComponentFixture<TransferListItemSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferListItemSkeleton],
    }).compileComponents();

    fixture = TestBed.createComponent(TransferListItemSkeleton);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

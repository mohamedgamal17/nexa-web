import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransferListItem } from './transfer-list-item';
import { TransferType } from '../../enums/transfer-type.enum';
import { TransferStatus } from '../../enums/transfer-status.enum';
import { TransferDirection } from '../../enums/transfer-direction.enum';

describe('TransferListItem', () => {
  let component: TransferListItem;
  let fixture: ComponentFixture<TransferListItem>;

  const networkTransfer = {
    type: TransferType.network,
    status: TransferStatus.completed,
    direction: TransferDirection.depit,
    amount: 100,
  } as import('../../interfaces/transfer.interface').Transfer;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferListItem],
    }).compileComponents();

    fixture = TestBed.createComponent(TransferListItem);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('transfer', networkTransfer);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return heroArrowUpRight for network transfer icon', () => {
    expect(component.getIcon(networkTransfer)).toBe('heroArrowUpRight');
  });

  it('should return pending tag text for pending status', () => {
    const pending = {
      ...networkTransfer,
      status: TransferStatus.pending,
    } as import('../../interfaces/transfer.interface').Transfer;
    expect(component.getTagText(pending)).toBe('pending');
  });

  it('should emit clicked output', () => {
    const emitSpy = vi.spyOn(component.clicked, 'emit');
    component.clicked.emit();
    expect(emitSpy).toHaveBeenCalled();
  });
});

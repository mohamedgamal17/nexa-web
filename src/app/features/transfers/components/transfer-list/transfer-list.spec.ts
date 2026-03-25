import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferList } from './transfer-list';
import { ClipboardModule } from '@angular/cdk/clipboard';
describe('TransferList', () => {
  let component: TransferList;
  let fixture: ComponentFixture<TransferList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferList , ClipboardModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TransferList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WalletSearch } from './wallet-search';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Component, ViewChild } from '@angular/core';

@Component({
  imports: [ReactiveFormsModule, WalletSearch],
  template: `
    <form [formGroup]="form">
      <app-wallet-search formControlName="wallet" />
    </form>
  `,
})
class TestHostComponent {
  form = new FormGroup({ wallet: new FormControl(null) });

  @ViewChild(WalletSearch) walletSearch!: WalletSearch;
}

describe('WalletSearch', () => {
  let component: WalletSearch;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    component = fixture.componentInstance.walletSearch;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit walletNumberChange on search', () => {
    const emitSpy = vi.spyOn(component.walletNumberChange, 'emit');
    component.search({ query: '123' } as never);
    expect(emitSpy).toHaveBeenCalledWith('123');
  });

  it('should write value via ControlValueAccessor', () => {
    const wallet = {
      id: '1',
      number: '99',
      balance: 0,
      userId: 'u',
      customerId: 'c',
    };
    component.writeValue(wallet as never);
    expect(component.selectedWallet()).toEqual(wallet);
  });
});

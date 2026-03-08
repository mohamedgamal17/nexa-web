import { BankAccountNumberPipe } from './bank-account-number-pipe';

describe('BankAccountNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new BankAccountNumberPipe();
    expect(pipe).toBeTruthy();
  });
});

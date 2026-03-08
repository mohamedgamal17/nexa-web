import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bankAccountNumber',
})
export class BankAccountNumberPipe implements PipeTransform {
  transform(value: string | undefined | null): string {
    if (!value) {
      return '';
    }

    return `**** ${value}`;
  }
}

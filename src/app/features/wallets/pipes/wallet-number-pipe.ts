import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'walletNumber',
})
export class WalletNumberPipe implements PipeTransform {
  transform(value: string | number | null | undefined): unknown {
    if (!value) return '';

    const cleaned = value.toString().replace(/\s+/g, '');

    return cleaned.replace(/(.{4})/g, '$1 ').trim();
  }
}

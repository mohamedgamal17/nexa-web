import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'translate' })
export class TranslateMockedPipe implements PipeTransform {
  keys: string[] = []; 

  transform(value: string, ...args: any[]): string {
    this.keys.push(value); 
    return value;          
  }
}
import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-bank-select-skeleton',
  imports: [CommonModule, SkeletonModule],
  templateUrl: './bank-select-skeleton.html',
  styleUrl: './bank-select-skeleton.scss',
})
export class BankSelectSkeleton {
  size = input<number>();

  dummy = Array(3);
}

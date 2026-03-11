import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-bank-card-skeleton',
  imports: [CardModule , SkeletonModule],
  templateUrl: './bank-card-skeleton.html',
  styleUrl: './bank-card-skeleton.scss',
})
export class BankCardSkeleton {}

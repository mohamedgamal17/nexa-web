import { Component, computed, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { LucideAngularModule } from 'lucide-angular';
import { Building2, ShieldCheck, CircleAlert } from 'lucide-angular';
import { BankCardSkeleton } from '../../components/bank-card-skeleton/bank-card-skeleton';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { BankService } from '../../services/bank.service';
import { ErrorModel } from '../../../../core/models/error-model.interface';
import { SkeletonModule } from 'primeng/skeleton';
import { BankCard } from '../../components/bank-card/bank-card';
@Component({
  selector: 'app-index-page',
  imports: [ButtonModule, CardModule, LucideAngularModule, BankCardSkeleton , SkeletonModule , BankCard],
  templateUrl: './index-page.html',
  styleUrl: './index-page.scss',
})
export class IndexPage {
  private bankService = inject(BankService);

  bankResource = rxResource({
    stream: () => this.bankService.getAllBanks({ skip: 0, length: 10 }),
  });

  error = computed(() =>
    this.bankResource.error()?.cause
      ? (this.bankResource.error()?.cause as ErrorModel)
      : null,
  );

  bankSkeltonSize = signal(4)

  bankSkeltonArray = computed(()=> Array(this.bankSkeltonSize()))

  Building2 = Building2;
  ShieldCheck = ShieldCheck;
  CircleAlert = CircleAlert;


}

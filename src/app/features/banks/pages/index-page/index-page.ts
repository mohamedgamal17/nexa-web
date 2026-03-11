import {
  Component,
  computed,
  inject,
  linkedSignal,
  signal,
} from '@angular/core';
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
import { BankModal } from '../../components/bank-modal/bank-modal';
import { Bank } from '../../interfaces/bank.interface';
import { BankingTokenService } from '../../services/banking-token.service';
import { mergeMap } from 'rxjs';
import { StripeService } from '../../services/stripe.service';
import { StripeError } from '@stripe/stripe-js';
import { LinkedBankState } from '../../interfaces/linked-bank-state.interface';
@Component({
  selector: 'app-index-page',
  imports: [
    ButtonModule,
    CardModule,
    LucideAngularModule,
    BankCardSkeleton,
    SkeletonModule,
    BankCard,
    BankModal,
  ],
  templateUrl: './index-page.html',
  styleUrl: './index-page.scss',
})
export class IndexPage {
  private bankService = inject(BankService);
  private bankTokenService = inject(BankingTokenService);
  private stripeService = inject(StripeService);

  bankResource = rxResource({
    stream: () => this.bankService.getAllBanks({ skip: 0, length: 10 }),
  });

  error = computed(() =>
    this.bankResource.error()?.cause
      ? (this.bankResource.error()?.cause as ErrorModel)
      : null,
  );

  bankSkeltonSize = signal(4);

  bankSkeltonArray = computed(() => Array(this.bankSkeltonSize()));

  bankLinkVisible = signal(false);

  linkedBankState = linkedSignal<boolean, LinkedBankState>({
    source: () => this.bankLinkVisible(),
    computation: (source, previous) => {
      if (!source) {
        return { progress: 'Destroyed' };
      }
      return  { progress: 'Pending' };
    },
  });

  linkProgress = linkedSignal<
    boolean,
    'Pending' | 'Processing' | 'Completed' | 'Error'
  >({
    source: () => this.bankLinkVisible(),
    computation: (source, previous) => {
      if (!source) {
        return 'Pending';
      }
      return previous?.value ?? 'Pending';
    },
  });

  Building2 = Building2;
  ShieldCheck = ShieldCheck;
  CircleAlert = CircleAlert;

  connectToBank() {
    this.linkedBankState.set({progress: 'Processing' });
    this.bankTokenService
      .create({})
      .pipe(
        mergeMap(value => this.stripeService.collectBankAccount(value.token)),
        mergeMap(resp => this.bankTokenService.complete({ token: resp.id })),
      )
      .subscribe({
        next: value => {
          this.linkedBankState.set({ bank: value, progress: 'Completed' });
        },
        error: (err: ErrorModel | any) => {
          console.log(err)
          this.linkedBankState.set({ error: err, progress: 'Error' });

          console.log(this.linkedBankState())
        },
      });

    console.log(this.linkProgress());
  }
}

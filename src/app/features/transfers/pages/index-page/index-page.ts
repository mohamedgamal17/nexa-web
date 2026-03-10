import { Component, computed, effect, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { TransferServiceService } from '../../services/transfer-service.service';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import {
  selectActiveWallet,
  selectIsWalletsLoading,
  selectIsWalletStateLoaded,
  selectWalletError,
} from '../../../wallets/state/wallet.selectors';
import { Transfer } from '../../interfaces/transfer.interface';
import { PagingResponse } from '../../../../core/models/paging-response.interface';
import { of } from 'rxjs';
import { WalletNumberPipe } from '../../../wallets/pipes/wallet-number-pipe';
import { SkeletonModule } from 'primeng/skeleton';
import { TransferList } from '../../components/transfer-list/transfer-list';
import { walletActions } from '../../../wallets/state/wallet.actions';
import { Paginator, PaginatorModule, PaginatorState } from 'primeng/paginator';
import { DataLoaderError } from '../../../../shared/components/data-loader-error/data-loader-error';
import { ErrorModel } from '../../../../core/models/error-model.interface';

@Component({
  selector: 'app-index-page',
  imports: [
    WalletNumberPipe,
    SkeletonModule,
    TransferList,
    PaginatorModule,
    DataLoaderError,
  ],
  templateUrl: './index-page.html',
  styleUrl: './index-page.scss',
})
export class IndexPage {
  private store = inject(Store);

  private transferService = inject(TransferServiceService);

  walletLoaded = toSignal(this.store.select(selectIsWalletStateLoaded));

  walletLoading = toSignal(this.store.select(selectIsWalletsLoading));

  activeWallet = toSignal(this.store.select(selectActiveWallet));

  walletError = toSignal(this.store.select(selectWalletError));

  pagingLength = signal(10);

  transferSkip = signal(0);

  transferResource = rxResource({
    params: () => ({
      activeWallet: this.activeWallet(),
      skip: this.transferSkip(),
      length: this.pagingLength(),
    }),
    stream: params => {
      if (params.params.activeWallet) {
        return this.transferService.getAllTransfers({
          walletId: params.params!.activeWallet?.id,
          skip: params.params.skip,
          length: params.params.length,
        });
      }
      return of(<PagingResponse<Transfer>>{
        data: [],
        info: {
          skip: 0,
          length: 0,
          totalCount: 0,
        },
      });
    },
  });

  transfers = computed(() => this.transferResource.value()?.data ?? []);

  transferLoading = computed(
    () => this.walletLoading() || this.transferResource.isLoading(),
  );

  transferPaging = computed(() => this.transferResource.value()?.info);

  error = computed(
    () =>
      this.walletError() ||
      (this.transferResource.error()?.cause as ErrorModel),
  );

  constructor() {
    effect(() => {
      if (!this.walletLoaded()) {
        this.store.dispatch(
          walletActions.loadWallets({
            paging: { skip: 0, length: 10 },
          }),
        );
      }
    });
  }

  onPageChange($event: PaginatorState) {
    this.transferSkip.set($event.first ?? 0);
    this.pagingLength.set($event.rows ?? 0);
  }

  refresh() {}
}

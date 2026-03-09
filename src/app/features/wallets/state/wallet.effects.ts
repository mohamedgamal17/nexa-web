import { inject, Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
  ROOT_EFFECTS_INIT,
} from '@ngrx/effects';
import { walletActions } from './wallet.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { UserWalletService } from '../services/user-wallet-service.service';

@Injectable({
  providedIn: 'root',
})
export class WalletEffects {
  private actions = inject(Actions);
  private userWalletService = inject(UserWalletService);

  loadWallets = createEffect(() => {
    return this.actions.pipe(
      ofType(walletActions.loadWallets),
      mergeMap(({ paging }) =>
        this.userWalletService
          .getAllWallets({
            skip: paging?.skip ?? 0,
            length: paging?.length ?? 10,
          })
          .pipe(
            map(resp =>
              walletActions.loadWalletsSuccess({
                wallets: resp.data,
                paging: resp.info,
              }),
            ),
            catchError(err =>
              of(walletActions.loadWalletsFailure({ error: err })),
            ),
          ),
      ),
    );
  });
}

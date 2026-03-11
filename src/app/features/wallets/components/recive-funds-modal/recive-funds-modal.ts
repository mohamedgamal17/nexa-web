import { Component, inject, input, model } from '@angular/core';
import { Blocks, LucideAngularModule } from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Wallet } from '../../interfaces/wallet.interface';
import { WalletNumberPipe } from "../../pipes/wallet-number-pipe";
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { selectShowReciveFundsModal } from '../../state/wallet.selectors';
import { walletCardActions } from '../../state/wallet.actions';
import { MessageService } from 'primeng/api';
import { Clipboard } from '@angular/cdk/clipboard'; 
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-recive-funds-modal',
  imports: [DialogModule, ButtonModule, LucideAngularModule, WalletNumberPipe],
  templateUrl: './recive-funds-modal.html',
  styleUrl: './recive-funds-modal.scss',
})
export class ReciveFundsModal {
  private store = inject(Store)
  private messageService = inject(MessageService)
  private clipboard = inject(Clipboard)
  private translateService = inject(TranslateService)

  wallet= input<Wallet | null>()
  visible = toSignal(this.store.select(selectShowReciveFundsModal), {initialValue : false})
  Blocks = Blocks


  toggleReciveFundsModal(){
    this.store.dispatch(walletCardActions.toggleReciveFundsModal())
  }

  copyWalletNumber(){
    this.clipboard.copy(this.wallet()!.number)
    this.messageService.add({
      summary : this.translateService.instant('toast.walletCopied.message'),
      severity : 'success',
      icon :'pi pi-check-circle'
    })
  }
}

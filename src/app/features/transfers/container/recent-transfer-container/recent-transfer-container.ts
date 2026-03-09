import { Component, computed, inject, OnInit } from '@angular/core';
import { TransferList } from '../../components/transfer-list/transfer-list';
import { TransferServiceService } from '../../services/transfer-service.service';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ErrorModel } from '../../../../core/models/error-model.interface';
import { SkeletonModule } from 'primeng/skeleton';
import { AlertError } from '../../../../shared/components/alert-error/alert-error';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-recent-transfer-container',
  imports: [TransferList, SkeletonModule, AlertError, RouterModule],
  templateUrl: './recent-transfer-container.html',
  styleUrl: './recent-transfer-container.scss',
})
export class RecentTransferContainer {
  private transferService = inject(TransferServiceService);

  transfersResource = rxResource({
    stream: () => this.transferService.getAllTransfers({ skip: 0, length: 5 }),
  });

  transfers = computed(() => this.transfersResource.value()?.data ?? []);

  paging = computed(() => this.transfersResource.value()?.info);

  loading = computed(() => this.transfersResource.isLoading());

  error = computed(
    () => this.transfersResource.error() as ErrorModel | undefined,
  );
}

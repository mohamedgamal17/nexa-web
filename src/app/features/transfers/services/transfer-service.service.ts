import { Injectable } from '@angular/core';
import { environemnt } from '../../../../environments/environemnt';
import { TransferListRequest } from '../interfaces/transfer-list-request.interface';
import { Observable } from 'rxjs';
import { Wallet } from '../../wallets/interfaces/wallet.interface';
import { HttpClient } from '@angular/common/http';
import { Transfer } from '../interfaces/transfer.interface';
import { NetworkTrasnferRequest } from '../interfaces/network-transfer-request.interface';
import { BankTransfer as BankTransferRequest } from '../interfaces/bank-transfer-request.interface';
import { PagingResponse } from '../../../core/models/paging-response.interface';
import { mapObjectToHttpParam } from '../../../core/mappers/http.mapper';

@Injectable({
  providedIn: 'root',
})
export class TransferServiceService {
  private apiUrl = environemnt.apiUrl + '/user/transfers';

  constructor(private readonly httpClinet: HttpClient) {}

  getAllTransfers(req: TransferListRequest = { skip: 0, length: 10 }): Observable<PagingResponse<Transfer>> {
    return this.httpClinet.get<PagingResponse<Transfer>>(this.apiUrl, { params: mapObjectToHttpParam(req) });
  }

  getTransfer(id: string): Observable<Transfer> {
    return this.httpClinet.get<Transfer>(this.apiUrl + '/' + id);
  }

  createBankTransfer(req: BankTransferRequest) {
    return this.httpClinet.post<Transfer>(this.apiUrl + '/' + 'bank', req);
  }

  createNetworkTransfer(req: NetworkTrasnferRequest) {
    return this.httpClinet.post<Transfer>(this.apiUrl + '/' + 'network', req);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WalletListRequest } from '../interfaces/wallet-reqeust.interface';
import { Observable } from 'rxjs';
import { Wallet } from '../interfaces/wallet.interface';
import { environemnt } from '../../../../environments/environemnt';
import { mapObjectToHttpParam } from '../../../core/mappers/http.mapper';
import { PagingResponse } from '../../../core/models/paging-response.interface';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private apiUrl = environemnt.apiUrl + '/wallets';
  constructor(private httpClient: HttpClient) {}

  getAllWallets(req: WalletListRequest): Observable<PagingResponse<Wallet>> {
    return this.httpClient.get<PagingResponse<Wallet>>(this.apiUrl, { params: mapObjectToHttpParam(req) });
  }

  getWalletById(id: string): Observable<Wallet> {
    return this.httpClient.get<Wallet>(this.apiUrl + '/' + id);
  }
}

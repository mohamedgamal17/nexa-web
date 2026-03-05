import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environemnt } from '../../../../environments/environemnt';
import { Observable } from 'rxjs';
import { Wallet } from '../interfaces/wallet.interface';
import { PagingResponse } from '../../../core/models/paging-response.interface';
import { PagingRequest } from '../../../core/models/paging-request.interface';
import { mapObjectToHttpParam } from '../../../core/mappers/http.mapper';

@Injectable({
  providedIn: 'root',
})
export class UserWalletService {
  private apiUrl = environemnt.apiUrl + '/user/wallets';
  constructor(private readonly httpClient: HttpClient) {}

  getAllWallets(req: PagingRequest = { skip: 0, length: 10 }): Observable<PagingResponse<Wallet>> {
    return this.httpClient.get<PagingResponse<Wallet>>(this.apiUrl, { params: mapObjectToHttpParam(req) });
  }

  getWalletById(id: string): Observable<Wallet> {
    return this.httpClient.get<Wallet>(this.apiUrl + '/' + id);
  }
}

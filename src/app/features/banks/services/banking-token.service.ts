import { Injectable } from '@angular/core';
import { environemnt } from '../../../../environments/environemnt';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bank } from '../interfaces/bank.interface';

@Injectable({
  providedIn: 'root',
})
export class BankingTokenService {
  private apiUrl = environemnt.apiUrl + '/banking/tokens';

  constructor(private httpClient: HttpClient) {}

  create(req: { redirectUri?: string }): Observable<{ token: string }> {
    return this.httpClient.post<{ token: string }>(this.apiUrl, req);
  }

  complete(req: { token: string }): Observable<Bank> {
    return this.httpClient.post<Bank>(this.apiUrl + '/complete', req);
  }
}

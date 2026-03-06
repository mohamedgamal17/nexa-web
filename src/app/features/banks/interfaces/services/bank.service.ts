import { Observable } from 'rxjs';
import { PagingRequest } from '../../../../core/models/paging-request.interface';
import { PagingResponse } from '../../../../core/models/paging-response.interface';
import { HttpClient } from '@angular/common/http';
import { environemnt } from '../../../../../environments/environemnt';
import { Injectable } from '@angular/core';
import { Bank } from '../bank.interface';
import { mapObjectToHttpParam } from '../../../../core/mappers/http.mapper';

@Injectable({
  providedIn: 'root',
})
export class BankService {
  private apiUrl = environemnt.apiUrl + '/user/banks';

  constructor(private httpClient: HttpClient) {}

  getAllBanks(req: PagingRequest): Observable<PagingResponse<Bank>> {
    return this.httpClient.get<PagingResponse<Bank>>(this.apiUrl, { params: mapObjectToHttpParam(req) });
  }

  getBankById(id: string): Observable<Bank> {
    return this.httpClient.get<Bank>(this.apiUrl + '/' + id);
  }
}

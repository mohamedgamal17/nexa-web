import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../interfaces/customer.interface';
import { environemnt } from '../../../../environments/environemnt';
import { CustomerInfo } from '../interfaces/customer-info.interface';
import { Address } from '../interfaces/address.interface';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private readonly apiUrl = environemnt.apiUrl + '/user/customer';

  constructor(private readonly httpClient: HttpClient) {}

  getCustomer() {
    return this.httpClient.get<Customer>(this.apiUrl);
  }

  updateDocument(req: { kycDocumentId?: string; issuingCountry?: string; type?: DocumentType }) {
    return this.httpClient.post<Customer>(this.apiUrl + '/document', req);
  }

  updateEmail(req: { emailAddress: string }) {
    return this.httpClient.post<Customer>(this.apiUrl + '/email', req);
  }

  updatePhone(req: { phoneNumber: string }) {
    return this.httpClient.post<Customer>(this.apiUrl + '/phone', req);
  }

  updateInfo(req: CustomerInfo) {
    return this.httpClient.post<Customer>(this.apiUrl + '/info', req);
  }

  updateAddress(req: Address) {
    return this.httpClient.post<Customer>(this.apiUrl + '/address', req);
  }
}

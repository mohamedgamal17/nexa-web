import { Injectable } from "@angular/core";
import { environemnt } from "../../../../environments/environemnt";
import { catchError, Observable, throwError } from "rxjs";
import { OnboardCustomer } from "../interfaces/onboard-customer.interface";
import { HttpClient, HttpStatusCode } from "@angular/common/http";
import { CustomerInfo } from "../../customers/interfaces/customer-info.interface";
import { Address } from "../../customers/interfaces/address.interface";
import { Customer } from "../../customers/interfaces/customer.interface";

@Injectable({
  providedIn :"root"
})
export class OnboardCustomerService  {

  private apiUrl = environemnt.apiUrl + "/user/onboardcustomer"

  constructor(private httpClient : HttpClient){

  }

  getOrCreateOnboardCustomer() : Observable<OnboardCustomer>{
    return  this.getOnboardCustomer()  
      .pipe(
        catchError((err: any) => {
          if (err.status == HttpStatusCode.NotFound) {
            return this.createOnboardCustomer()
          }

          return throwError(() => err);
        })
      )
  }

  getOnboardCustomer() : Observable<OnboardCustomer>{
    return this.httpClient.get<OnboardCustomer>(this.apiUrl )
  }

  createOnboardCustomer() : Observable<OnboardCustomer>{
    return this.httpClient.post<OnboardCustomer>(this.apiUrl, {});
  }

  updateOnboardCustomerEmail(req : {email : string}) : Observable<OnboardCustomer>{
    return this.httpClient.post<OnboardCustomer>(this.apiUrl + "/email", req)
  }

  updateOnboardCustomerPhone(req : {phone : string}) : Observable<OnboardCustomer>{
    return this.httpClient.post<OnboardCustomer>(this.apiUrl + "/phone", req)
  }

  updateOnboardCustomerInfo(req : CustomerInfo) : Observable<OnboardCustomer>{
    return this.httpClient.post<OnboardCustomer>(this.apiUrl + "/info" , req)
  }

  updateOnboardCustomerAddress(req : Address) : Observable<OnboardCustomer>{
    return this.httpClient.post<OnboardCustomer>(this.apiUrl + "/address", req)
  }

  completeOnboardCustomer() : Observable<Customer>{
    return this.httpClient.post<Customer>(this.apiUrl + "/complete", {});
  }
}
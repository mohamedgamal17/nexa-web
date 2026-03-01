import { Injectable } from "@angular/core";
import { environemnt } from "../../../../environments/environemnt";
import { HttpClient } from "@angular/common/http";
import { KycReview } from "../interfaces/kyc-review.interface";

@Injectable({
  providedIn : "root"
})
export class KycReviewService {

  private apiUrl = environemnt.apiUrl + "/user/customer/reviews"

  constructor(private httpClient : HttpClient){

  }

  createReview(req : {kycLiveVideoId? : string} = {}){
    return this.httpClient.post<KycReview>(this.apiUrl ,req)
  }
}
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environemnt } from "../../../../environments/environemnt";

@Injectable({
  providedIn: "root"
})
export class KycTokenService {

  private apiUrl = environemnt.apiUrl + "/kyc/tokens"

  constructor(private httpClient : HttpClient){

  }

  createToken(req : {referrer? : string} = {}){
    return this.httpClient.post<{token : string}>(this.apiUrl, req)
  }

}
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ErrorModel } from "../models/error-model.interface";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private errorSubject = new Subject<ErrorModel>();

  error$ = this.errorSubject.asObservable();


  show(error : ErrorModel) {
    this.errorSubject.next(error)
  }


}
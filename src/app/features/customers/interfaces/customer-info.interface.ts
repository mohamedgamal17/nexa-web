import { Gender } from "../enums/gender.enum";

export interface CustomerInfo{
  firstName : string,
  lastName : string,
  Gender : Gender ,
  bithDate : Date
}
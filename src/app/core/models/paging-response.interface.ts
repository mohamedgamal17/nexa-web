export interface PagingResponse<T>{
  data : T[]
  info : PagingInfoResponse
}

export interface PagingInfoResponse {
  length : number,
  skip : number
  totalCount : number
}
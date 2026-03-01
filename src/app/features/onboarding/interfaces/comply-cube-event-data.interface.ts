export interface ComplyCubeEventData{
  type : "complete" | "closed" | "error"
  data? : {documentId :string , liveVideoId : string} | null,
  error : any

}
import { Entity } from "../../../core/interfaces/entity.interface"

export interface Document extends Entity{
  kycDocumentId: string
  type: number
  issuingCountry: string
  status: number
  kycReviewId: string
  attachements: DocumentAttachement[]
}

export interface DocumentAttachement extends Entity {
  fileName: string
  size: number
  contentType: string
  side: number
  kycExternalId: string
}
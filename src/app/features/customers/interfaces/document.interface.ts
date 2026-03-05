import { Entity } from '../../../core/models/entity.interface';
import { DocumentVerificationStatus } from '../enums/document-verification_status.enum';
import { DocumentType } from '../enums/document-type.enum';
export interface Document extends Entity {
  kycDocumentId: string;
  type: DocumentType;
  issuingCountry: string;
  status: DocumentVerificationStatus;
  kycReviewId: string;
  attachements: DocumentAttachement[];
}

export interface DocumentAttachement extends Entity {
  fileName: string;
  size: number;
  contentType: string;
  side: number;
  kycExternalId: string;
}

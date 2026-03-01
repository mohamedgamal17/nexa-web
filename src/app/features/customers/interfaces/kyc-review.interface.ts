import { Entity } from "../../../core/models/entity.interface";
import { KycReviewOutcome } from "../enums/kyc-review-outcome.enum";
import { KycReviewStatus } from "../enums/kyc-review-status.enum";

export interface KycReview extends Entity {
  customerId : string,
  kycCheckId : string,
  KycLiveVideoId : string,
  status : KycReviewStatus,
  outcome : KycReviewOutcome
}
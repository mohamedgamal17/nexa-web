import { ApiProblemDetails } from "./api-problem-details.interface";

export type ErrorType =
  | 'connection'
  | 'not-found'
  | 'server'
  | 'validation'
  | 'forbidden'
  | 'unauthorized'
  | 'generic';


export interface ErrorModel {
  type: ErrorType;
  title: string;
  message: string;
  status?: number;
  validationErrors?: Record<string, string[]>;
  retryable?: boolean;
}
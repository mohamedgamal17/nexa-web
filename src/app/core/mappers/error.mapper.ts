import { HttpErrorResponse } from '@angular/common/http';
import { ApiProblemDetails } from '../models/api-problem-details.interface';
import { ErrorModel } from '../models/error-model.interface';

export function mapToErrorModel(error: HttpErrorResponse): ErrorModel {
  if (error.status === 0) {
    return {
      type: 'connection',
      title: 'Connection Error',
      message: 'Unable to reach the server.',
      retryable: true,
    };
  }

  const problem = error.error as ApiProblemDetails;

  switch (error.status) {
    case 400:
      if (problem?.errors) {
        return {
          type: 'bad-request',
          title: problem.title ?? 'Validation Error',
          message: 'Please fix the highlighted fields.',
          status: 400,
          validationErrors: problem.errors,
        };
      }
      break;

    case 404:
      return {
        type: 'not-found',
        title: problem?.title ?? 'Not Found',
        message: problem?.detail ?? 'Resource not found.',
        status: 404,
      };

    case 500:
      return {
        type: 'server',
        title: problem?.title ?? 'Server Error',
        message: problem?.detail ?? 'Something went wrong.',
        status: 500,
        retryable: true,
      };
  }

  return {
    type: 'generic',
    title: 'Error',
    message: problem?.detail ?? 'Unexpected error occurred.',
    status: error.status,
  };
}

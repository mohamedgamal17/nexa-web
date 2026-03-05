import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { ErrorService } from '../services/error.service';
import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { catchError, throwError } from 'rxjs';
import { mapToErrorModel } from '../mappers/http.mapper';

export const errorHandlerInterceptorFn: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((err) => {
      var errorModal = mapToErrorModel(err);
      return throwError(() => errorModal);
    }),
  );
};

import { Injectable } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { map, merge, Observable, of, startWith, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ValidationErrorService {

  private errorMap: Record<string, string> = {
    required: 'errors.validation.required',
    email: 'errors.validation.email',
    minlength: 'errors.validation.minLength',
    maxlength: 'errors.validation.maxLength'
  };

  constructor(private translate: TranslateService) { }

  getAllErrors$(
    control: AbstractControl | null,

    fieldKey: string
  ): Observable<string[]> {
    if (!control) return of([]);

    return merge(
      control.statusChanges,
      control.valueChanges
      
    ).pipe(
      startWith(null),
      map(() => {
        if (!control.errors || ( !control.touched ) ) return [];

        const fieldLabel = this.translate.instant(fieldKey);
        console.log(fieldLabel)

        return Object.entries(control.errors)
          .map(([key, value]) => {
            const translationKey = this.errorMap[key];
            if (!translationKey) return null;

            return this.translate.instant(translationKey, {
              field: fieldLabel,
              ...value,
              
            });
          })
          .filter(Boolean) as string[];
      })
    );
  }
}
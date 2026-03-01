import { Injectable } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { EMPTY, map, merge, Observable, of, startWith, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ValidationErrorService {

  private errorMap: Record<string, string> = {
    required: 'errors.validation.required',
    email: 'errors.validation.email',
    minlength: 'errors.validation.minLength',
    maxlength: 'errors.validation.maxLength',
    phoneRequired : 'errors.validation.phoneRequired',
    phoneMinLength :'errors.validation.phoneMinLength',
    phoneMaxLength :'errors.validation.phoneMaxLength',
    phoneInvalid  : 'errors.validation.phoneInvalid',
    invalideEnum : 'errors.validation.invalideEnum',
    invalidAge : 'errors.validation.invalidAge',
    minAge : 'errors.validation.minAge',
    invalidCityName :'errors.validation.invalidCityName',
    invalidPostalCode :'errors.validation.invalidPostalCode',
    invalidZipCode :'errors.validation.invalidZipCode'
  };

  constructor(private translate: TranslateService) { }

  getAllErrors$(
    control: AbstractControl | null,
    form: FormGroup | null,
    fieldKey: string
  ): Observable<string[]> {
    if (!control) return of([]);

    return merge(
      control.statusChanges,
      control.valueChanges,
      form?.statusChanges ?? EMPTY,


    ).pipe(
      startWith(null),
      map(() => {
        
        if (!control.errors || (!control.touched)) return [];

        const fieldLabel = this.translate.instant(fieldKey);

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
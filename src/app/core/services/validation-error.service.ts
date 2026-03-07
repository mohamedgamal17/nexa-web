// import { Injectable } from '@angular/core';
// import { AbstractControl, FormGroup } from '@angular/forms';
// import { TranslateService } from '@ngx-translate/core';
// import { EMPTY, map, merge, Observable, of, startWith, tap } from 'rxjs';

// @Injectable({ providedIn: 'root' })
// export class ValidationErrorService {
//   constructor(private translate: TranslateService) {}

//   getAllErrors$(control: AbstractControl | null, form: FormGroup | null, fieldKey: string): Observable<string[]> {
//     if (!control) return of([]);

//     return merge(control.statusChanges, control.valueChanges, form?.statusChanges ?? EMPTY).pipe(
//       startWith(null),
//       map(() => {
//         if (!control.errors || !control.touched) return [];

//         const fieldLabel = this.translate.instant(fieldKey);
//         return Object.entries(control.errors)
//           .map(([key, value]) => {
//             const translationKey = this.errorMap[key];

//             if (!translationKey) return null;

//             return this.translate.instant(translationKey, {
//               field: fieldLabel,
//               ...value,
//             });
//           })
//           .filter(Boolean) as string[];
//       }),
//     );
//   }
// }

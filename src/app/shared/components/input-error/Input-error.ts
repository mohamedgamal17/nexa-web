import { Component, Host, inject, Input, input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { map, merge, Observable, of, startWith } from 'rxjs';

import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ERROR_MAP } from '../../../core/constants/error.map';

type NewType = OnInit;

@Component({
  selector: 'app-input-error',
  imports: [CommonModule, TranslateModule],

  templateUrl: './input-error.html',
  styleUrl: './input-error.scss',
})
export class InputError implements NewType {
  @Input() control: AbstractControl | null | undefined;
  @Input() form: FormGroup | null;
  @Input() field: string;
  @Input() fieldKey: string = '';
  errors$: Observable<string[]>;

  private translateService = inject(TranslateService);
  constructor(@Host() private formGroup: FormGroupDirective) {}

  ngOnInit(): void {
    this.errors$ = this.buildErrors$();

    this.formGroup.ngSubmit.subscribe(() => console.log('submited'));
  }

  buildErrors$(): Observable<string[]> {
    if (!this.control || !this.formGroup) {
      return of([]);
    }

    const sources: Observable<unknown>[] = [];
    if (this.control.valueChanges) sources.push(this.control.valueChanges);
    if (this.control.statusChanges) sources.push(this.control.statusChanges);
    sources.push(this.formGroup.ngSubmit);

    return merge(...sources).pipe(
      startWith(null),
      map(() => {
        const shouldShow = this.control && !this.control.valid && (this.formGroup.submitted || this.control.touched);

        if (!shouldShow || !this.control!.errors) {
          return [];
        }

        console.log('#');
        return (
          Object.entries(this.control!.errors)
            .map(([key, value]) => {
              const translationKey = ERROR_MAP[key];
              if (!translationKey) return null;

              return this.translateService.instant(translationKey, {
                field: this.field,
                ...(typeof value === 'object' ? value : {}),
              });
            })
            // FIX 5: Strip out unmapped (null) entries so the type is string[].
            .filter((msg): msg is string => msg !== null)
        );
      }),
    );
  }
}

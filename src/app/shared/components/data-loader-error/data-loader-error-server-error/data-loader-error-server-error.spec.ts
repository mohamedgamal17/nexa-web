import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataLoaderErrorServerError } from './data-loader-error-server-error';

describe('DataLoaderErrorServerError', () => {
  let component: DataLoaderErrorServerError;
  let fixture: ComponentFixture<DataLoaderErrorServerError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataLoaderErrorServerError],
    }).compileComponents();

    fixture = TestBed.createComponent(DataLoaderErrorServerError);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

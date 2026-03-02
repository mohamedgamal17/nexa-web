import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataLoaderErrorNotFound } from './data-loader-error-not-found';

describe('DataLoaderErrorNotFound', () => {
  let component: DataLoaderErrorNotFound;
  let fixture: ComponentFixture<DataLoaderErrorNotFound>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataLoaderErrorNotFound],
    }).compileComponents();

    fixture = TestBed.createComponent(DataLoaderErrorNotFound);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

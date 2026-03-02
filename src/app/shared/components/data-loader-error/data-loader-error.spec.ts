import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataLoaderError } from './data-loader-error';

describe('DataLoaderError', () => {
  let component: DataLoaderError;
  let fixture: ComponentFixture<DataLoaderError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataLoaderError],
    }).compileComponents();

    fixture = TestBed.createComponent(DataLoaderError);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataLoaderErrorConnection } from './data-loader-error-connection';

describe('DataLoaderErrorConnection', () => {
  let component: DataLoaderErrorConnection;
  let fixture: ComponentFixture<DataLoaderErrorConnection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataLoaderErrorConnection],
    }).compileComponents();

    fixture = TestBed.createComponent(DataLoaderErrorConnection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

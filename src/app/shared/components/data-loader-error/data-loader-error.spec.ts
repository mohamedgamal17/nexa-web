import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataLoaderError } from './data-loader-error';
import { Location } from '@angular/common';

describe('DataLoaderError', () => {
  let component: DataLoaderError;
  let fixture: ComponentFixture<DataLoaderError>;
  let location: { back: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    location = { back: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [DataLoaderError],
      providers: [{ provide: Location, useValue: location }],
    }).compileComponents();

    fixture = TestBed.createComponent(DataLoaderError);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit refresh on handleRefresh', () => {
    const emitSpy = vi.spyOn(component.refresh, 'emit');
    component.handleRefresh();
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should call location back on handleGoBack', () => {
    component.handleGoBack();
    expect(location.back).toHaveBeenCalled();
  });
});

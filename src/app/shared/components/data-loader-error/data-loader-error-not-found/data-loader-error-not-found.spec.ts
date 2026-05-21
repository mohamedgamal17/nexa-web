import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataLoaderErrorNotFound } from './data-loader-error-not-found';
import { TranslateModule } from '@ngx-translate/core';

describe('DataLoaderErrorNotFound', () => {
  let component: DataLoaderErrorNotFound;
  let fixture: ComponentFixture<DataLoaderErrorNotFound>;

  const mockError = {
    type: 'not-found' as const,
    title: 'Not found',
    message: 'Resource missing',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataLoaderErrorNotFound, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(DataLoaderErrorNotFound);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('error', mockError);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose error input', () => {
    expect(component.error()).toEqual(mockError);
  });

  it('should emit back output', () => {
    const emitSpy = vi.spyOn(component.back, 'emit');
    component.back.emit();
    expect(emitSpy).toHaveBeenCalled();
  });
});

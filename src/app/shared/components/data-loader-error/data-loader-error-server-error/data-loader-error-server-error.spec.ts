import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataLoaderErrorServerError } from './data-loader-error-server-error';
import { TranslateModule } from '@ngx-translate/core';

describe('DataLoaderErrorServerError', () => {
  let component: DataLoaderErrorServerError;
  let fixture: ComponentFixture<DataLoaderErrorServerError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataLoaderErrorServerError, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(DataLoaderErrorServerError);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit refresh and back outputs', () => {
    const refreshSpy = vi.spyOn(component.refresh, 'emit');
    const backSpy = vi.spyOn(component.back, 'emit');
    component.refresh.emit();
    component.back.emit();
    expect(refreshSpy).toHaveBeenCalled();
    expect(backSpy).toHaveBeenCalled();
  });
});

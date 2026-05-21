import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataLoaderErrorConnection } from './data-loader-error-connection';
import { TranslateModule } from '@ngx-translate/core';

describe('DataLoaderErrorConnection', () => {
  let component: DataLoaderErrorConnection;
  let fixture: ComponentFixture<DataLoaderErrorConnection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataLoaderErrorConnection, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(DataLoaderErrorConnection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose refresh and back outputs', () => {
    const refreshSpy = vi.spyOn(component.refresh, 'emit');
    const backSpy = vi.spyOn(component.back, 'emit');
    component.refresh.emit();
    component.back.emit();
    expect(refreshSpy).toHaveBeenCalled();
    expect(backSpy).toHaveBeenCalled();
  });
});

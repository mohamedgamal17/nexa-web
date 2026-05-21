import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertError } from './alert-error';

describe('AlertError', () => {
  let component: AlertError;
  let fixture: ComponentFixture<AlertError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertError],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertError);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept error input', () => {
    fixture.componentRef.setInput('error', {
      type: 'connection',
      title: 'Error',
      message: 'Network error',
    });
    expect(component.error()?.message).toBe('Network error');
  });
});

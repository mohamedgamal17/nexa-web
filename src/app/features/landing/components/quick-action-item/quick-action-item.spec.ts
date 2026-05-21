import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuickActionItem } from './quick-action-item';

describe('QuickActionItem', () => {
  let component: QuickActionItem;
  let fixture: ComponentFixture<QuickActionItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickActionItem],
    }).compileComponents();

    fixture = TestBed.createComponent(QuickActionItem);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Send money');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose label input', () => {
    expect(component.label()).toBe('Send money');
  });
});

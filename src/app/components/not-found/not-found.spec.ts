import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotFound } from './not-found';
import { Router } from '@angular/router';

describe('NotFound', () => {
  let component: NotFound;
  let fixture: ComponentFixture<NotFound>;
  let router: { navigateByUrl: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    router = { navigateByUrl: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [NotFound],
      providers: [{ provide: Router, useValue: router }],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFound);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate when navigateByUrl is called', () => {
    component.navigateByUrl('/auth');
    expect(router.navigateByUrl).toHaveBeenCalledWith('/auth');
  });
});

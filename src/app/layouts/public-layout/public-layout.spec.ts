import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicLayout } from './public-layout';
import { provideRouter } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { AuthService } from '@auth0/auth0-angular';
import {
  mockAuthService,
  provideDefaultMockStoreState,
} from '../../../testing/test-providers';

describe('PublicLayout', () => {
  let component: PublicLayout;
  let fixture: ComponentFixture<PublicLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicLayout],
      providers: [
        provideRouter([]),
        provideMockStore({ initialState: provideDefaultMockStoreState() }),
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicLayout);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

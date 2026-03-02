import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileContact } from './profile-contact';

describe('ProfileContact', () => {
  let component: ProfileContact;
  let fixture: ComponentFixture<ProfileContact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileContact],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileContact);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

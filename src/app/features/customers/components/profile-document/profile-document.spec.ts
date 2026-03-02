import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDocument } from './profile-document';

describe('ProfileDocument', () => {
  let component: ProfileDocument;
  let fixture: ComponentFixture<ProfileDocument>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileDocument],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileDocument);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

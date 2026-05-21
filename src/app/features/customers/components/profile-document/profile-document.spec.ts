import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileDocument } from './profile-document';
import { DocumentType } from '../../enums/document-type.enum';
import { DocumentVerificationStatus } from '../../enums/document-verification_status.enum';

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

  it('should emit submitied on handleSubmit', () => {
    const emitSpy = vi.spyOn(component.submitied, 'emit');
    component.handleSubmit();
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should return passport document type name', () => {
    expect(component.getDocumentTypeName(DocumentType.Passport)).toBe('passport');
  });

  it('should return Verified status name', () => {
    expect(
      component.getDocumentStatusName(DocumentVerificationStatus.Verified),
    ).toBe('Verified');
  });

  it('should compute hasDocument as false when document is null', () => {
    expect(component.hasDocument()).toBe(false);
  });
});

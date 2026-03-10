import { Component, computed, input, output, signal } from '@angular/core';
import { Card } from 'primeng/card';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { Button } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { featherFileText, featherShield } from '@ng-icons/feather-icons';
import { Document } from '../../interfaces/document.interface';
import { DocumentType } from '../../enums/document-type.enum';
import { getCoutnryByCode } from '../../../../core/constants/countries.data';
import { DocumentVerificationStatus } from '../../enums/document-verification_status.enum';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-profile-document',
  imports: [Card, NgIcon, Button, MessageModule, CommonModule],
  templateUrl: './profile-document.html',
  styleUrl: './profile-document.scss',
  viewProviders: [provideIcons({ featherShield, featherFileText })],
})
export class ProfileDocument {
  hasDocument = computed(() => this.document() != null);

  document = input<Document>();
  loading = input(false);
  submitied = output<void>();

  handleSubmit() {
    this.submitied.emit();
  }

  getDocumentTypeName(type: DocumentType) {
    if (type == DocumentType.Passport) {
      return 'passport';
    }
    return 'Driving licenes';
  }

  getDocumentIssuedCountry(code: string) {
    return getCoutnryByCode(code);
  }

  getDocumentStatusName(status: DocumentVerificationStatus) {
    if (status == DocumentVerificationStatus.Processing) {
      return 'Processing';
    }

    if (status == DocumentVerificationStatus.Verified) {
      return 'Verified';
    }

    if (status == DocumentVerificationStatus.Rejected) {
      return 'Rejected';
    }

    return 'Pending';
  }

  getDocumentStatusClass(status: DocumentVerificationStatus) {
    console.log(status)

    if (status == DocumentVerificationStatus.Pending  ||
      status == DocumentVerificationStatus.Processing) {
      return 'bg-info-subtle border-info  text-info';
    }

    if (status == DocumentVerificationStatus.Verified) {
      return 'bg-primary-subtle border-primary text-primary';
    }
    return 'bg-danger-subtle border-danger text-primary';
  }
}

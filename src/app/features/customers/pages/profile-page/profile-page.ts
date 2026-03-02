import { Component } from '@angular/core';
import { ProfileHero } from '../../components/profile-hero/profile-hero';
import { ProfileContact } from '../../components/profile-contact/profile-contact';
import { ProfileInfo } from '../../components/profile-info/profile-info';
import { ProfileAddress } from '../../components/profile-address/profile-address';
import { ProfileDocument } from '../../components/profile-document/profile-document';

@Component({
  selector: 'app-profile-page',
  imports: [ProfileHero, ProfileContact, ProfileInfo, ProfileAddress, ProfileDocument],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
})
export class ProfilePage {}

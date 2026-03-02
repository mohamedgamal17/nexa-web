import { Component } from '@angular/core';
import { ProfileHero } from '../../components/profile-hero/profile-hero';
import { ProfileContact } from '../../components/profile-contact/profile-contact';
import { ProfileInfo } from '../../components/profile-info/profile-info';

@Component({
  selector: 'app-profile-page',
  imports: [ProfileHero, ProfileContact, ProfileInfo],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
})
export class ProfilePage {}

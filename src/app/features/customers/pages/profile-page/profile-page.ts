import { Component } from '@angular/core';
import { ProfileHero } from '../../components/profile-hero/profile-hero';
import { ProfileContact } from '../../components/profile-contact/profile-contact';

@Component({
  selector: 'app-profile-page',
  imports: [ProfileHero, ProfileContact],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
})
export class ProfilePage {}

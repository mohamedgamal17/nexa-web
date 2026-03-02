import { Component } from '@angular/core';
import { ProfileHero } from '../../components/profile-hero/profile-hero';

@Component({
  selector: 'app-profile-page',
  imports: [ProfileHero],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
})
export class ProfilePage {}

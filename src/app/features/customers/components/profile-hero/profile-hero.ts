import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherCheckCircle, featherUser } from '@ng-icons/feather-icons';
import { heroCheckCircle } from '@ng-icons/heroicons/outline';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-profile-hero',
  imports: [CardModule, NgIcon],
  templateUrl: './profile-hero.html',
  styleUrl: './profile-hero.scss',
  viewProviders: [provideIcons({ featherUser, featherCheckCircle, heroCheckCircle })],
})
export class ProfileHero {}

import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FileQuestionMark, LucideAngularModule } from 'lucide-angular';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-not-found',
  imports: [ButtonModule ,LucideAngularModule],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
})
export class NotFound {
  private router = inject(Router)

  FileQuestionMark = FileQuestionMark

  navigateByUrl(url : string){
    this.router.navigateByUrl(url)
  }
}

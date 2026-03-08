import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-quick-action-item',
  imports: [],
  templateUrl: './quick-action-item.html',
  styleUrl: './quick-action-item.scss',
})
export class QuickActionItem {
  label = input<string>();
  clicked = output<void>();
}

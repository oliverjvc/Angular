// src/app/child-date.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-child-date',
  template: `<span>{{ currentDate }}</span>`,
  standalone: true
})
export class ChildDateComponent {
  @Input() currentDate!: string;  // Use @Input to accept date from parent
}

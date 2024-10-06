// src/app/child-date.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-child-date',
  template: `<span>Welcome to the site! Today is: {{ currentDate }}</span>`,
  standalone: true
})
export class ChildDateComponent {
  @Input() currentDate!: string;  // Use @Input to accept date from parent
}

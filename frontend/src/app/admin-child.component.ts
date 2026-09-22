import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  template: `<p>Admin {{ section }} management is available from the dashboard.</p>`,
})
export class AdminChildComponent {
  readonly section = inject(ActivatedRoute).snapshot.url[0]?.path ?? 'section';
}

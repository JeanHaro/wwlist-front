import { Component, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';

// Servicios
import { SeoService } from './shared/services/seo/seo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.init();
  }
}

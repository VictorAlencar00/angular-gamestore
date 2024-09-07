import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  RouterOutlet,
  Router,
  NavigationEnd,
} from '@angular/router';

import { MenuComponent } from './menu/menu.component';
import { HttpClientModule } from '@angular/common/http';
import { filter } from 'rxjs';
import { LoadingService } from './loading.service';
import { LoadingComponent } from './loading/loading.component';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MenuComponent,
    HttpClientModule,
    LoadingComponent,
    NgStyle,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'gamestore';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public loadingService: LoadingService,
  ) {}
  public showMenu: boolean = true;
  public isLoading: Boolean = true;

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        let currentRoute = this.route;
        while (currentRoute.firstChild) {
          currentRoute.firstChild.url.subscribe((urlSegments) => {
            const url = urlSegments.map((segment) => segment.path).join('/');
            if (url.includes('/pay')) {
              this.showMenu = false;
            }
          });
          currentRoute = currentRoute.firstChild;
        }
      });

    this.loadingService.loading.subscribe((loading) => {
      if (loading == false) {
        this.isLoading = false;
      }
    });
  }
}

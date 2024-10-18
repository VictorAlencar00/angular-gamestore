import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';

import { MenuComponent } from './menu/menu.component';
import { HttpClientModule } from '@angular/common/http';
import { filter } from 'rxjs';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, MobileMenuComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'gamestore';
  constructor(private router: Router) {}
  public showMenu: boolean = true;

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentUrl = this.router.url;
        if (currentUrl.includes('/pay')) {
          this.showMenu = false;
        } else {
          this.showMenu = true;
        }
      });
  }
}

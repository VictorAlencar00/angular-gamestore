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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'gamestore';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}
  public showMenu: boolean = true;
  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        let currentRoute = this.route;
        while (currentRoute.firstChild) {
          currentRoute.firstChild.url.subscribe((urlSegments) => {
            const url = urlSegments.map((segment) => segment.path).join('/');
            // Here you can add conditions to check if the specific route is reached
            if (url.includes('/buy')) {
              // Do something when the specific route is reached
              this.showMenu = false;
            }
          });
          currentRoute = currentRoute.firstChild;
        }
      });
  }
}

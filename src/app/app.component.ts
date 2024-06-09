import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { HttpClientModule } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'gamestore';
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.url.subscribe((urlSegments) => {
      const url = urlSegments.map((segment) => segment.path).join('/');
      console.log(url);
    });
  }
}

import { Observable, map } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MenuFunctionalitiesService } from '../menu-functionalities.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  constructor(
    public menuFunctionalities: MenuFunctionalitiesService,
    public router: Router,
  ) {}

  onInputChange(event: Event) {
    this.router.navigate(['./browse']);
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      this.menuFunctionalities.setSearchedValue(inputElement.value);

    }
  }
}

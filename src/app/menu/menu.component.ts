import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MenuFunctionalitiesService } from '../menu-functionalities.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  constructor(public menuFunctionalities: MenuFunctionalitiesService) {}
  public testValue: any;
  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      this.menuFunctionalities.setSearchedValue(inputElement.value);
      this.testValue = this.menuFunctionalities.searchSubject.value;
      console.log(this.testValue);
    }
  }
}

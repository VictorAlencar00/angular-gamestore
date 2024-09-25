import { Observable, map } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MenuFunctionalitiesService } from '../menu-functionalities.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  constructor(
    public menuFunctionalities: MenuFunctionalitiesService,
    public router: Router,
  ) {}
  ngOnInit(): void {
    window.addEventListener('resize', () => this.handleResize());
  }

  onInputChange(event: Event) {
    this.router.navigate(['./browse']);
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      this.menuFunctionalities.setSearchedValue(inputElement.value);
    }
  }

  toggleMenu() {
    document.querySelector('.mobile__menu')?.classList.toggle('active');
    document.querySelector('#browse')?.classList.toggle('hidden');
    document.querySelector('#discover')?.classList.toggle('hidden');
    document.querySelector('.carousel')?.classList.toggle('hidden');
    document.querySelector('#wishlist')?.classList.toggle('hidden');
    document.querySelector('#listedGame')?.classList.toggle('hidden');
  }

  handleMobileMenuEvents() {
    document.querySelector('.mobile__menu')?.classList.remove('active');
    document.querySelector('#browse')?.classList.remove('hidden');
    document.querySelector('#discover')?.classList.remove('hidden');
    document.querySelector('.carousel')?.classList.remove('hidden');
    document.querySelector('#wishlist')?.classList.remove('hidden');
    document.querySelector('#listedGame')?.classList.remove('hidden');
  }

  handleResize() {
    if (window.innerWidth > 768) {
      this.handleMobileMenuEvents();
    }
  }

  handleType() {
    this.handleMobileMenuEvents();
  }
}

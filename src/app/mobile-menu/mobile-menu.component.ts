import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'mobile-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss',
})
export class MobileMenuComponent {
  //test
  toggleMenu() {
    document.querySelector('.mobile__menu')?.classList.toggle('active');
    document.querySelector('#browse')?.classList.toggle('hidden');
    document.querySelector('#discover')?.classList.toggle('hidden');
    document.querySelector('.carousel')?.classList.toggle('hidden');
    document.querySelector('#wishlist')?.classList.toggle('hidden');
    document.querySelector('#listedGame')?.classList.toggle('hidden');
  }
}

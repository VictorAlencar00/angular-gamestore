import { Game } from './../../game.dto';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-age-rating',
  standalone: true,
  imports: [],
  templateUrl: './age-rating.component.html',
  styleUrl: './age-rating.component.scss',
})
export class AgeRatingComponent {
  @Input() game: Game | null = null;
}

import { Game } from '../../game.dto';
import { GamesService } from './../../games.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'carousel',
  standalone: true,
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent implements OnInit {
  games: Game[] = [];
  highlightedGame: Game | null = null;

  constructor(public gamesService: GamesService) {}
  ngOnInit(): void {
    this.gamesService.getGames().subscribe((data: Game[]) => {
      this.games = data.slice(0, 5);
      this.highlightedGame = this.games[0];
    });
  }

  selectGame(game: Game) {
    this.highlightedGame = game;
  }
}

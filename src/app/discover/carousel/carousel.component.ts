import { RouterLink } from '@angular/router';
import { Game } from '../../game.dto';
import { GamesService } from './../../games.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'carousel',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent implements OnInit {
  games: Game[] = [];
  highlightedGame: Game | null = null;
  private timeoutId: any;

  constructor(public gamesService: GamesService) {}
  ngOnInit(): void {
    this.getCarousel();
  }

  getCarousel() {
    this.gamesService.getGames().subscribe((data: Game[]) => {
      this.games = data.slice(0, 5);
      this.highlightedGame = this.games[0];
      this.alternateGame(this.games[0]);
    });
  }

  selectGame(game: Game) {
    this.highlightedGame = game;
    this.alternateGame(game);
  }

  alternateGame(game: Game) {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.timeoutId = setTimeout(() => {
      let nextGame = Number(game.id) + 1;
      if (nextGame > 4) {
        nextGame = 0;
      }
      this.selectGame(this.games[nextGame]);
    }, 3000);
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Game } from '../../game.dto';
import { GamesService } from './../../games.service';
import { AsyncPipe, NgClass } from '@angular/common';
import { LoadingSpinnerService } from '../../loading-spinner.service';
import { NgxSpinnerComponent } from 'ngx-spinner';

@Component({
  selector: 'carousel',
  standalone: true,
  imports: [RouterLink, AsyncPipe, NgClass, NgxSpinnerComponent],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent implements OnInit {
  games: Game[] = [];
  highlightedGame: Game | null = null;
  private timeoutId: any;
  private observer: IntersectionObserver | null = null;

  constructor(
    public gamesService: GamesService,
    public spinner: LoadingSpinnerService,
  ) {}

  ngOnInit(): void {
    this.getCarousel();
  }

  ngOnDestroy(): void {
    if (this.timeoutId) {
      clearInterval(this.timeoutId);
    }

    if (this.observer) {
      this.observer.disconnect();
    }
  }

  async getCarousel(): Promise<void> {
    this.spinner.showLoadingSpinner();
    const carousel = globalThis.document?.querySelector('#carousel');
    if (carousel) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (this.games.length) {
            this.alternateGame(this.games[0]);
            this.selectGame(this.games[0]);
            setTimeout(() => {
              this.spinner.hideLoadingSpinner();
            }, 100);
          } else if (!this.games.length) {
            setTimeout(() => {
              this.getCarousel();
            }, 400);
          }
        });
      });

      observer.observe(carousel);
      this.gamesService.getGames().subscribe((data: Game[]) => {
        this.games = data.slice(0, 5);
        this.highlightedGame = this.games[0];
      });
    }
  }

  selectGame(game: Game) {
    this.highlightedGame = game;
    this.alternateGame(game);
  }

  alternateGame(game: Game) {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.timeoutId = setInterval(() => {
      let nextGame = Number(game?.id) + 1;
      if (nextGame > 4) {
        nextGame = 0;
      }
      this.selectGame(this.games[nextGame]);
    }, 3000);
  }
}

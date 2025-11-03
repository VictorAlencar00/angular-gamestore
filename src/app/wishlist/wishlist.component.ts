import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { LoadingSpinnerService } from './../loading-spinner.service';

import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GameCardComponent } from '../game-card/game-card.component';
import { Game } from '../game.dto';
import { GamesService } from '../games.service';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [RouterLink, GameCardComponent, LoadingSpinnerComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent implements OnInit {
  constructor(
    private gamesService: GamesService,
    public spinner: LoadingSpinnerService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  shouldShowLikeButton: boolean = false;
  public games: Game[] = [];
  public isLoading: boolean = true;

  ngOnInit(): void {
    this.loadLikedGames();
  }

  async loadLikedGames() {
    this.isLoading = true;
    this.spinner.showLoadingSpinner();

    if (!isPlatformBrowser(this.platformId)) {
      this.isLoading = false;
      this.spinner.hideLoadingSpinner();
      return;
    }

    try {
      const allGames = await lastValueFrom(this.gamesService.getGames());

      const likedGames = JSON.parse(localStorage.getItem('likedGames') || '[]');

      this.games = allGames.filter((game) =>
        likedGames.some((likedGame: any) => likedGame.id === game.id),
      );
      this.games.forEach((game) => {
        game.liked = true;
      });
    } catch (error) {
      console.error('Erro ao carregar jogos curtidos:', error);
      this.games = [];
    } finally {
      setTimeout(() => {
        this.isLoading = false;
        this.spinner.hideLoadingSpinner();
      }, 300);
    }
  }

  likeGame(index: number) {
    this.gamesService.likeGame(this.games, index);
  }
}

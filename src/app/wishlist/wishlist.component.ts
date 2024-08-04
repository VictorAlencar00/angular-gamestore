import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { GamesService } from '../games.service';
import { Game } from '../game.dto';
import { RouterLink } from '@angular/router';
import { GameCardComponent } from '../game-card/game-card.component';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [RouterLink, GameCardComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent implements OnInit {
  constructor(private gamesService: GamesService) {}
  shouldShowLikeButton: boolean = false;
  public games: Game[] = [];

  ngOnInit(): void {
    this.loadLikedGames();
  }

  async loadLikedGames() {
    const allGames = await lastValueFrom(this.gamesService.getGames());
    const likedGames = JSON.parse(localStorage.getItem('likedGames') || '[]');

    this.games = allGames.filter((game) =>
      likedGames.some((likedGame: any) => likedGame.id === game.id),
    );
    this.games.forEach((game) => {
      game.liked = true;
    });
  }

  likeGame(index: number) {
    this.gamesService.likeGame(this.games, index);
  }
}

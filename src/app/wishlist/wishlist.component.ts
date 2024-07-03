import { Component, inject, OnInit } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';

import { GamesService } from '../games.service';
import { Game } from '../game.dto';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit {
  private gamesservice = inject(GamesService);
  public games: Game[] = [];

  ngOnInit(): void {
    this.loadLikedGames();
  }

  async loadLikedGames() {
    const allGames = await lastValueFrom(this.gamesservice.getGames());
    const likedGames = JSON.parse(localStorage.getItem('likedGames') || '[]');

    this.games = allGames.filter((game) =>
      likedGames.some((likedGame: any) => likedGame.id === game.id),
    );
  }
}

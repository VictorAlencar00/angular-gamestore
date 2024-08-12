import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { GameCardComponent } from '../game-card/game-card.component';
import { Game } from './../game.dto';
import { CarouselComponent } from './carousel/carousel.component';
import { GamesService } from '../games.service';

@Component({
  selector: 'discover-component',
  standalone: true,
  imports: [
    CarouselComponent,
    HttpClientModule,
    RouterModule,
    GameCardComponent,
  ],
  templateUrl: './discover.component.html',
  styleUrl: './discover.component.scss',
})
export class DiscoverComponent implements OnInit {
  listedGames: Game[] = [];
  rpgGames: Game[] = [];
  actionGames: Game[] = [];
  sportsGames: Game[] = [];
  shouldShowLikeButton: boolean = false;

  constructor(private gamesService: GamesService) {}

  ngOnInit(): void {
    this.loadGames();
  }

  async loadGames(): Promise<void> {
    const newList: Game[] = await lastValueFrom(this.gamesService.getGames());
    this.listedGames = newList;

    if (typeof window !== 'undefined' && window.localStorage) {
      const likedGamesFromStorage: Game[] = JSON.parse(
        window.localStorage.getItem('likedGames') || '[]',
      );
      this.listedGames.forEach((game) => {
        if (
          likedGamesFromStorage.some((likedGame) => likedGame.id === game.id)
        ) {
          game.liked = true;
        }
      });
    }

    this.rpgGames = this.gamesService.loadRpgGames(this.listedGames);
    this.sportsGames = this.gamesService.loadSportsGames(this.listedGames);
    this.actionGames = this.gamesService.loadActionGames(this.listedGames);
  }

  likeGame(index: number) {
    this.gamesService.likeGame(this.listedGames, index);
  }

  scrollLeft(listId: string): void {
    const container = document.getElementById(listId);
    if (container) {
      container.scrollBy({ left: -container.clientWidth, behavior: 'smooth' });
    }
  }

  scrollRight(listId: string): void {
    const container = document.getElementById(listId);
    if (container) {
      container.scrollBy({ left: container.clientWidth, behavior: 'smooth' });
    }
  }
}

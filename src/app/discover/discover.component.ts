import { Game } from './../game.dto';
import { Component, OnInit } from '@angular/core';
import { CarouselComponent } from './carousel/carousel.component';
import { lastValueFrom } from 'rxjs';
import { GamesService } from '../games.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'discover-component',
  standalone: true,
  imports: [CarouselComponent, HttpClientModule, RouterModule],
  templateUrl: './discover.component.html',
  styleUrl: './discover.component.scss',
})
export class DiscoverComponent implements OnInit {
  listedGames: Game[] = [];
  rpgGames: Game[] = [];
  actionGames: Game[] = [];
  sportsGames: Game[] = [];
  shouldShowLikeButton: boolean = true;

  constructor(private gamesService: GamesService) {}

  ngOnInit(): void {
    this.loadGames();
  }

  async loadGames(): Promise<void> {
    const newList: Game[] = await lastValueFrom(this.gamesService.getGames());
    this.listedGames = newList;
    const likedGamesFromStorage: Game[] = JSON.parse(
      localStorage.getItem('likedGames') || '[]',
    );
    this.listedGames.forEach((game) => {
      if (likedGamesFromStorage.some((likedGame) => likedGame.id === game.id)) {
        game.liked = true;
      }
    });

    this.rpgGames = this.gamesService.loadRpgGames(this.listedGames);
    this.sportsGames = this.gamesService.loadSportsGames(this.listedGames);
    this.actionGames = this.gamesService.loadActionGames(this.listedGames);
  }

  showLikeButton() {
    this.shouldShowLikeButton = true;
  }

  likeGame(index: number) {
    this.gamesService.likeGame(this.listedGames, index);
  }
}

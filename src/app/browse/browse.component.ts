import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { GameCardComponent } from '../game-card/game-card.component';
import { GamesService } from '../games.service';
import { MenuFunctionalitiesService } from './../menu-functionalities.service';
import { Game } from '../game.dto';
import { LoadingSpinnerService } from '../loading-spinner.service';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [
    RouterLink,
    HttpClientModule,
    GameCardComponent,
    LoadingSpinnerComponent,
  ],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.scss',
  providers: [],
})
export class BrowseComponent implements OnInit {
  listedGames: Game[] = [];
  shouldShowLikeButton: boolean = false;
  public searchSubscription: any;
  public gameNotFound: boolean = false;
  public gameSearched: string = '';
  public searchedValue: string = '';

  constructor(
    private gamesService: GamesService,
    public menuFunctionalitiesService: MenuFunctionalitiesService,
    public spinner: LoadingSpinnerService,
  ) {}

  ngOnInit(): void {
    this.spinner.showLoadingSpinner();

    this.searchSubscription =
      this.menuFunctionalitiesService.searchSubject.subscribe((value) => {
        if (value == '') {
          this.loadGames();
        } else {
          this.loadSearchedGames();
        }
        this.gameNotFound = false;
      });
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  async loadGames(): Promise<void> {
    const newList: Game[] = await lastValueFrom(this.gamesService.getGames());
    this.listedGames = newList;
    this.gameNotFound = false;

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
    setTimeout(() => {
      this.spinner.hideLoadingSpinner();
    }, 400);
  }

  async loadSearchedGames(): Promise<void> {
    const newList: Game[] = await lastValueFrom(this.gamesService.getGames());
    this.listedGames = newList;
    this.searchedValue = this.menuFunctionalitiesService.searchSubject.value;
    this.listedGames = newList.filter((game) =>
      game.name.toLowerCase().includes(this.searchedValue.toLowerCase()),
    );

    if (this.listedGames.length == 0) {
      this.gameNotFound = true;
      this.gameSearched = this.menuFunctionalitiesService.searchSubject.value;
    }
  }

  likeGame(index: number) {
    this.gamesService.likeGame(this.listedGames, index);
  }
}

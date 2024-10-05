import { lastValueFrom, Observable } from 'rxjs';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { GamesService } from './../games.service';
import { Game } from './../game.dto';
import { LoadingSpinnerService } from '../loading-spinner.service';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-game',
  standalone: true,
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  imports: [RouterLink, LoadingSpinnerComponent],
})
export class GameComponent implements OnInit {
  constructor(public spinner: LoadingSpinnerService) {}
  paymentMehod: string = '';

  public chosenGame: Game | null = null;
  private gamesService = inject(GamesService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  listedGame: any | null = null;
  observableGame!: Observable<Game>;
  isChosenGameLiked: boolean = false;

  public likedGamesFromStorage: Game[] = [];

  async ngOnInit(): Promise<void> {
    this.spinner.showLoadingSpinner();
    const gameName: string = this.route.snapshot.paramMap.get('name')!;
    this.observableGame = this.gamesService.getGameByName(gameName);
    this.listedGame = await lastValueFrom(this.observableGame);
    this.chosenGame = this.listedGame[0];
    setTimeout(() => {
      this.spinner.hideLoadingSpinner();
    }, 300);

    if (typeof window !== 'undefined' && window.localStorage) {
      this.likedGamesFromStorage = JSON.parse(
        window.localStorage.getItem('likedGames') || '[]',
      );
      if (
        this.likedGamesFromStorage.some(
          (likedGame) => likedGame.id === this.chosenGame?.id,
        )
      ) {
        this.isChosenGameLiked = true;
      }
    }
  }

  likeOrDislikeGame() {
    const isGameAlreadyLiked = this.likedGamesFromStorage.some(
      (likedGame) => likedGame.id === this.chosenGame?.id,
    );

    this.likedGamesFromStorage = isGameAlreadyLiked
      ? (this.likedGamesFromStorage = this.likedGamesFromStorage.filter(
          (likedGame) => likedGame.id !== this.chosenGame?.id,
        ))
      : [...this.likedGamesFromStorage, this.listedGame[0]];

    window.localStorage.setItem(
      'likedGames',
      JSON.stringify(this.likedGamesFromStorage),
    );

    this.isChosenGameLiked = !this.isChosenGameLiked;
  }

  // likeOrDislikeGame() {
  //   if (
  //     this.likedGamesFromStorage.some(
  //       (likedGame) => likedGame.id === this.chosenGame?.id,
  //     )
  //   ) {
  //     this.likedGamesFromStorage = this.likedGamesFromStorage.filter(
  //       (likedGame) => likedGame.id !== this.chosenGame?.id,
  //     );
  //     window.localStorage.setItem(
  //       'likedGames',
  //       JSON.stringify(this.likedGamesFromStorage),
  //     );
  //     this.isChosenGameLiked = false;
  //   } else if (
  //     !this.likedGamesFromStorage.some(
  //       (likedGame) => likedGame.id === this.chosenGame?.id,
  //     )
  //   ) {
  //     this.likedGamesFromStorage?.push(this.listedGame[0]);
  //     window.localStorage.setItem(
  //       'likedGames',
  //       JSON.stringify(this.likedGamesFromStorage),
  //     );
  //     this.isChosenGameLiked = true;
  //   }
  // }
}

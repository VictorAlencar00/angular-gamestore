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

  public namedGame: Game | null = null;
  private gamesService = inject(GamesService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  listedGame: any | null = null;
  observableGame!: Observable<Game>;

  async ngOnInit(): Promise<void> {
    this.spinner.showLoadingSpinner();
    const gameName: string = this.route.snapshot.paramMap.get('name')!;
    this.observableGame = this.gamesService.getGameByName(gameName);
    this.listedGame = await lastValueFrom(this.observableGame);
    this.namedGame = this.listedGame[0];
    setTimeout(() => {
      this.spinner.hideLoadingSpinner();
    }, 300);
  }
}

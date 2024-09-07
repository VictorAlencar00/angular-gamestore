import { Game } from './../game.dto';
import { lastValueFrom, Observable } from 'rxjs';
import { GamesService } from './../games.service';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-game',
  standalone: true,
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  imports: [RouterLink],
})
export class GameComponent implements OnInit {
  paymentMehod: string = '';

  public namedGame: Game | null = null;
  private gamesService = inject(GamesService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  listedGame: any | null = null;
  observableGame!: Observable<Game>;

  async ngOnInit(): Promise<void> {
    const gameName: string = this.route.snapshot.paramMap.get('name')!;
    this.observableGame = this.gamesService.getGameByName(gameName);
    this.listedGame = await lastValueFrom(this.observableGame);
    this.namedGame = this.listedGame[0];
  }
}

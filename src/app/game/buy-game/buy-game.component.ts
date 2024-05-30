import { ActivatedRoute } from '@angular/router';
import { Game } from '../../game.dto';
import { GameComponent } from './../game.component';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { GamesService } from '../../games.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-buy-game',
  standalone: true,
  imports: [GameComponent, AppComponent],
  templateUrl: './buy-game.component.html',
  styleUrl: './buy-game.component.css',
})
export class BuyGameComponent {
  paymentMethod: string = '';

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

  @Output() valueChange = new EventEmitter<boolean>();
}

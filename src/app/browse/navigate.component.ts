import { Game } from './../game.dto';
import { Component } from '@angular/core';
import { GamesService } from '../games.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [],
  templateUrl: './navigate.component.html',
  styleUrl: './navigate.component.css',
})
export class BrowseComponent {
  listedGames: Game[] = [];

  constructor(private gamesService: GamesService) {}

  ngAfterViewInit(): void {
    this.loadGames();
  }

  async loadGames(): Promise<void> {
    const newList: Game[] = await lastValueFrom(this.gamesService.getGames());
    this.listedGames = newList;
  }
}

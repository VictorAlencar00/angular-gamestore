import { Game } from '../game.dto';
import { Component } from '@angular/core';
import { GamesService } from '../games.service';
import { lastValueFrom } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css',
})
export class BrowseComponent {
  listedGames: Game[] = [];
  shouldShowLikeButton: boolean = false;

  constructor(private gamesService: GamesService) {}

  ngAfterViewInit(): void {
    this.loadGames();
  }

  async loadGames(): Promise<void> {
    const newList: Game[] = await lastValueFrom(this.gamesService.getGames());
    this.listedGames = newList;
  }
  //throw into a service
  showLikeButton() {
    this.shouldShowLikeButton = true;
  }
  likeGame(index: number) {
    this.listedGames[index].liked = !this.listedGames[index].liked;
  }
}

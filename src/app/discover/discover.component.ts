import { Game } from './../game.dto';
import { AfterViewInit, Component } from '@angular/core';
import { CarouselComponent } from './carousel/carousel.component';
import { lastValueFrom } from 'rxjs';
import { GamesService } from '../games.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'discover-component',
  standalone: true,
  imports: [CarouselComponent, HttpClientModule, RouterModule],
  templateUrl: './discover.component.html',
  styleUrl: './discover.component.css',
})
export class DiscoverComponent implements AfterViewInit {
  listedGames: Game[] = [];
  rpgGames: Game[] = [];
  sportsGames: Game[] = [];
  shouldShowLikeButton: boolean = false;
  showLikeButton() {
    this.shouldShowLikeButton = true;
  }

  constructor(private gamesService: GamesService) {}

  ngAfterViewInit(): void {
    this.loadGames();
  }
  likeGame(index: number) {
    this.listedGames[index].liked = !this.listedGames[index].liked;
  }

  async loadGames(): Promise<void> {
    const newList: Game[] = await lastValueFrom(this.gamesService.getGames());
    this.listedGames = newList;
    this.loadRpg(this.listedGames);
    this.loadSports(this.listedGames);
  }

  loadRpg(fullList: Game[]) {
    this.rpgGames = fullList.filter((game) => game.genre == 'RPG');
  }
  loadSports(fullList: Game[]) {
    this.sportsGames = fullList.filter((game) => game.genre == 'SPORTS');
  }
}

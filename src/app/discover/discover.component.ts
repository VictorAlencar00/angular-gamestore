import { Game } from './../game.dto';
import { AfterViewInit, Component, inject } from '@angular/core';
import { CarouselComponent } from './carousel/carousel.component';
import { lastValueFrom } from 'rxjs';
import { GamesService } from '../games.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';

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
  actionGames: Game[] = [];
  sportsGames: Game[] = [];
  shouldShowLikeButton: boolean = false;
  showLikeButton() {
    this.shouldShowLikeButton = false;
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
    this.rpgGames = this.gamesService.loadRpgGames(this.listedGames);
    this.sportsGames = this.gamesService.loadSportsGames(this.listedGames);
    this.actionGames = this.gamesService.loadActionGames(this.listedGames);
  }
}

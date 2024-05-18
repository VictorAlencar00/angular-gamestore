import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CarouselComponent } from './carousel/carousel.component';
import { Game } from '../game';
import { lastValueFrom } from 'rxjs';
import { GamesService } from '../games.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'discover-component',
  standalone: true,
  imports: [CarouselComponent, HttpClientModule],
  templateUrl: './discover.component.html',
  styleUrl: './discover.component.css',
})
export class DiscoverComponent implements AfterViewInit {
  listedGames: Game[] = [];
  constructor(private gamesService: GamesService) {}
  ngAfterViewInit(): void {
    this.loadGames();
  }

  async loadGames(): Promise<void> {
    const newList: Game[] = await lastValueFrom(this.gamesService.getGames());
    this.listedGames = newList;
    console.log(this.listedGames);
  }
}

// allGames = gamesList;
// rpgGames: Game[] = [];

// public getRpgGames() {
//   this.allGames.forEach((game) => {
//     if (game.category == 'RPG') {
//       this.rpgGames.push(game);
//     }
//   });
// }
// rpgGames = this.getRpgGames();

// public getRpgGames() {
//   if (this.allGames. == 'RPG')
// }

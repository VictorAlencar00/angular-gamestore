import { MenuFunctionalitiesService } from './../menu-functionalities.service';
import { Game } from '../game.dto';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GamesService } from '../games.service';
import { Observable, Subscription, lastValueFrom } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css',
})
export class BrowseComponent implements OnInit {
  listedGames: Game[] = [];
  shouldShowLikeButton: boolean = false;
  public searchSubscription: any;

  constructor(
    private gamesService: GamesService,
    public menuFunctionalitiesService: MenuFunctionalitiesService,
  ) {}

  ngOnInit(): void {
    this.searchSubscription =
      this.menuFunctionalitiesService.searchSubject.subscribe((value) => {
        if (value == '') {
          this.loadGames();
        } else {
          this.loadSearchedGames();
        }
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
  }

  async loadSearchedGames(): Promise<void> {
    const newList: Game[] = await lastValueFrom(this.gamesService.getGames());
    this.listedGames = newList;
    this.listedGames = newList.filter((game) =>
      game.name.includes(this.menuFunctionalitiesService.searchSubject.value),
    );
  }

  //throw into a service
  showLikeButton() {
    this.shouldShowLikeButton = false;
  }

  likeGame(index: number) {
    this.listedGames[index].liked = !this.listedGames[index].liked;
  }
}

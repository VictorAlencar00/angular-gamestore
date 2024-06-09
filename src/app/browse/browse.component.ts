import { MenuFunctionalitiesService } from './../menu-functionalities.service';
import { Game } from '../game.dto';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GamesService } from '../games.service';
import { Observable, Subscription, lastValueFrom } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';

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
  public gameNotFound: boolean = false;
  public gameSearched: string = '';

  constructor(
    private gamesService: GamesService,
    public menuFunctionalitiesService: MenuFunctionalitiesService,
    public route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.searchSubscription =
      this.menuFunctionalitiesService.searchSubject.subscribe((value) => {
        if (value == '') {
          this.loadGames();
        } else {
          this.loadSearchedGames();
        }
        this.gameNotFound = false;
      });

    this.route.url.subscribe((urlSegments) => {
      const url = urlSegments.map((segment) => segment.path).join('/');
      console.log(url);
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
    this.gameNotFound = false;
  }

  async loadSearchedGames(): Promise<void> {
    const newList: Game[] = await lastValueFrom(this.gamesService.getGames());
    this.listedGames = newList;
    this.listedGames = newList.filter((game) =>
      game.name.includes(this.menuFunctionalitiesService.searchSubject.value),
    );

    if (this.listedGames.length == 0) {
      this.gameNotFound = true;
      this.gameSearched = this.menuFunctionalitiesService.searchSubject.value;
    }
  }

  showLikeButton() {
    this.shouldShowLikeButton = false;
  }

  likeGame(index: number) {
    this.listedGames[index].liked = !this.listedGames[index].liked;
  }
}

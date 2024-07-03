import { MenuFunctionalitiesService } from './../menu-functionalities.service';
import { Game } from '../game.dto';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GamesService } from '../games.service';
import { lastValueFrom } from 'rxjs';
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
  shouldShowLikeButton: boolean = true;
  public searchSubscription: any;
  public gameNotFound: boolean = false;
  public gameSearched: string = '';
  public searchedValue: string = '';

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
        this.gameNotFound = false;
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
    this.searchedValue = this.menuFunctionalitiesService.searchSubject.value;
    this.listedGames = newList.filter((game) =>
      game.name.toLowerCase().includes(this.searchedValue.toLowerCase()),
    );

    if (this.listedGames.length == 0) {
      this.gameNotFound = true;
      this.gameSearched = this.menuFunctionalitiesService.searchSubject.value;
    }
  }

  showLikeButton() {
    this.shouldShowLikeButton = true;
  }

  likeGame(index: number) {
    this.listedGames[index].liked = !this.listedGames[index].liked;
    const likedGames = this.listedGames.filter((game) => game.liked);
    localStorage.setItem('likedGames', JSON.stringify(likedGames));
  }
}

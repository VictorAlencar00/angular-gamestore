import { Game } from './game.dto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  constructor(private http: HttpClient) {
    this.getGames();
  }

  public getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(environment.api + 'games');
  }

  public getGameByName(name: String): Observable<Game> {
    return this.http.get<Game>(environment.api + 'games?name=' + name);
  }

  loadRpgGames(fullList: Game[]) {
    return fullList.filter((game) => game.genre.includes('RPG'));
  }

  loadSportsGames(fullList: Game[]) {
    return fullList.filter((game) => game.genre.includes('Sports'));
  }

  loadActionGames(fullList: Game[]) {
    return fullList.filter((game) => game.genre.includes('Action'));
  }

  public likeGame(listedGames: Game[], index: number): void {
    listedGames[index].liked = !listedGames[index].liked;
    const likedGames = listedGames.filter((game) => game.liked);
    localStorage.setItem('likedGames', JSON.stringify(likedGames));
  }

  // public getGameById(id: number): Observable<Game> {
  //   return this.http.get<Game>(environment.api + 'game/' + id);
  // }
}

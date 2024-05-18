import { Observable } from 'rxjs';
import { Game } from './game';
import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  apiUrl = 'https://localhost:3000/games';

  constructor(private http: HttpClient) {}

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.apiUrl);
    console.log(123);
  }
}

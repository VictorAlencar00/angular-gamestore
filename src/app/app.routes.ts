import { Routes } from '@angular/router';
import { DiscoverComponent } from './discover/discover.component';
import { BrowseComponent } from './browse/browse.component';
import { GameComponent } from './game/game.component';
import { GamePayComponent } from './game/game-pay/game-pay.component';

export const routes: Routes = [
  {
    path: '',
    component: DiscoverComponent,
  },
  {
    path: 'game/:name',
    component: GameComponent,
  },
  {
    path: 'game/:name/buy',
    component: GamePayComponent,
  },
  {
    path: 'browse',
    component: BrowseComponent,
  },
];

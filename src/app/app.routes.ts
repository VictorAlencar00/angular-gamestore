import { Routes } from '@angular/router';
import { DiscoverComponent } from './discover/discover.component';
import { BrowseComponent } from './browse/navigate.component';
import { GameComponent } from './game/game.component';

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
    path: 'browse',
    component: BrowseComponent,
  },
  {
    path: 'news',
    component: BrowseComponent,
  },
];

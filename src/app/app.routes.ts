import { Routes } from '@angular/router';
import { DiscoverComponent } from './discover/discover.component';
import { BrowseComponent } from './browse/navigate.component';

export const routes: Routes = [
  {
    path: '',
    component: DiscoverComponent,
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

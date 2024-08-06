import { Routes } from '@angular/router';
import { DiscoverComponent } from './discover/discover.component';
import { BrowseComponent } from './browse/browse.component';
import { GameComponent } from './game/game.component';
import { GamePayComponent } from './game/game-pay/game-pay.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { PurchaseConfirmationComponent } from './game/game-pay/purchase-confirmation/purchase-confirmation.component';

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
    path: 'game/:name/pay',
    component: GamePayComponent,
  },
  {
    path: 'game/:name/pay/confirmation',
    component: PurchaseConfirmationComponent,
  },
  {
    path: 'browse',
    component: BrowseComponent,
  },
  {
    path: 'wishlist',
    component: WishlistComponent,
  },
];

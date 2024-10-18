import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Game } from '../../game.dto';
import { GameComponent } from '../game.component';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable, lastValueFrom } from 'rxjs';

import { GamesService } from '../../games.service';
import { AppComponent } from '../../app.component';
import { PayCreditFormComponent } from './pay-credit-form/pay-credit-form.component';
import { PayDebitFormComponent } from './pay-debit-form/pay-debit-form.component';
import { LoadingSpinnerComponent } from '../../loading-spinner/loading-spinner.component';
import { LoadingSpinnerService } from '../../loading-spinner.service';

@Component({
  selector: 'game-pay',
  standalone: true,
  imports: [
    GameComponent,
    AppComponent,
    ReactiveFormsModule,
    PayCreditFormComponent,
    PayDebitFormComponent,
    LoadingSpinnerComponent,
    RouterLink,
  ],
  templateUrl: './game-pay.component.html',
  styleUrls: ['./game-pay.component.scss', './payment-form.styles.scss'],
})
export class GamePayComponent {
  constructor(
    private formBuilder: FormBuilder,
    public spinner: LoadingSpinnerService,
  ) {}
  public namedGame: Game | null = null;
  private gamesService = inject(GamesService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  listedGame: any | null = null;
  observableGame!: Observable<Game>;
  paymentMethodChosen: string = '';

  chosenPaymentMethod(method: string) {
    this.paymentMethodChosen = method;
  }

  form: FormGroup = new FormGroup({
    method: new FormControl(''),
  });

  async ngOnInit(): Promise<void> {
    this.spinner.showLoadingSpinner();
    const gameName: string = this.route.snapshot.paramMap.get('name')!;
    this.observableGame = this.gamesService.getGameByName(gameName);
    this.listedGame = await lastValueFrom(this.observableGame);
    this.namedGame = this.listedGame[0];
    this.form = this.formBuilder.group({
      method: ['', Validators.required],
    });
    setTimeout(() => {
      this.spinner.hideLoadingSpinner();
    }, 300);
  }

  public successfulPurchase() {
    alert('it worked');
  }
}

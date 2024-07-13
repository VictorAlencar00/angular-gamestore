import { ActivatedRoute } from '@angular/router';
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
// import { EventEmitter, Output} from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';

import { GamesService } from '../../games.service';
import { AppComponent } from '../../app.component';
import { PayCreditFormComponent } from './pay-credit-form/pay-credit-form.component';

@Component({
  selector: 'game-pay',
  standalone: true,
  imports: [
    GameComponent,
    AppComponent,
    ReactiveFormsModule,
    PayCreditFormComponent,
  ],
  templateUrl: './game-pay.component.html',
  styleUrl: './game-pay.component.scss',
})
export class GamePayComponent {
  constructor(private formBuilder: FormBuilder) {}
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
    const gameName: string = this.route.snapshot.paramMap.get('name')!;
    this.observableGame = this.gamesService.getGameByName(gameName);
    this.listedGame = await lastValueFrom(this.observableGame);
    this.namedGame = this.listedGame[0];
    this.form = this.formBuilder.group({
      method: ['', Validators.required],
    });
  }

  // @Output() valueChange = new EventEmitter<boolean>();
}

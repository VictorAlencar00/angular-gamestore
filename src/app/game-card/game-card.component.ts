import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.scss',
})
export class GameCardComponent {
  @Input() game: any;

  @Output() like = new EventEmitter<number>();

  likeGame(gameId: number) {
    this.like.emit(gameId);
  }
}

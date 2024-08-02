import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.scss',
})
export class GameCardComponent {
  @Input() game: any;
  @Input() shouldShowLikeButton: boolean = false;

  @Output() like = new EventEmitter<number>();

  likeGame(gameId: number) {
    this.like.emit(gameId);
  }

  showLikeButton() {
    this.shouldShowLikeButton = true;
  }

  dontShowLikeButton() {
    this.shouldShowLikeButton = false;
  }
}

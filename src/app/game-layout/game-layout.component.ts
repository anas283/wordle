import { Component, OnInit, Renderer2 } from '@angular/core';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-game-layout',
  templateUrl: './game-layout.component.html',
  styleUrls: ['./game-layout.component.scss']
})
export class GameLayoutComponent implements OnInit {
  keyboardKeys = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Del', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Enter']
  ];

  board: string[][] = [];
  currentGuess: string = '';
  message: string = '';

  constructor(
    private gameService: GameService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.board = this.gameService.initializeBoard();
  }

  submitGuess() {
    if (this.currentGuess.length !== 5) {
      this.message = 'Guess must be 5 letters long.';
      return;
    }

    const result = this.gameService.submitGuess(this.currentGuess);
    if (result.success) {
      this.board = result.board;
      this.message = result.message;
      if (result.solved) {
        this.message = 'Congratulations! You solved the puzzle!';
      }
    } else {
      this.message = result.message;
    }

    this.currentGuess = '';
  }

  onGuessLetter(event: any) {
    console.log(event);
    console.log(event.guess);
  }
}

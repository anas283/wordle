import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-game-layout',
  templateUrl: './game-layout.component.html',
  styleUrls: ['./game-layout.component.scss']
})
export class GameLayoutComponent implements OnInit {
  @ViewChild('main_input') inputElement!: ElementRef<HTMLInputElement>;

  keyboardKeys = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Del', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Enter']
  ];

  board: string[][] = [];
  currentGuess: string = '';
  message: string = '';
  guess: string = '';
  combineLetter: string = '';
  previousInput: string = '';
  previousInputLength: number = 0;
  isSubmitRow: boolean[] = [false, false, false, false, false];

  constructor(
    private gameService: GameService,
  ) {}

  ngOnInit() {
    this.gameService.initializeTargetWord();
    this.board = this.gameService.initializeBoard();
  }

  ngAfterViewInit() {
    this.focusOnInput();
  }

  onInputChange(event: any) {
    const input = event.target.value.toUpperCase();
    const filteredInput = input.replace(/[^QWERTYUIOPASDFGHJKLZXCVBNM]/g, '');

    if (input.length < this.previousInputLength) {
      this.gameService.removeLetter(this.guess, this.previousInput);
    }
    this.previousInput = input;
    this.previousInputLength = input.length;

    this.guess = filteredInput;
    event.target.value = this.guess;

    this.gameService.addLetter(this.guess);
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      if (this.guess.length === 5) {
        this.submitGuess();
        this.guess = "";
      }
    }
  }

  deleteLastCharacter() {
    if (this.guess.length > 0) {
      this.guess = this.guess.substring(0, this.guess.length - 1);
      this.previousInputLength = this.guess.length;
      if (this.inputElement) {
        this.inputElement.nativeElement.value = this.guess;

        this.previousInput = this.guess;
        this.previousInputLength = this.guess.length;
      }

      setTimeout(() => {
        this.gameService.removeLetter(this.guess, this.previousInput);
      }, 10);
    }
  }

  onKeyboardUiChange(key: string) {
    if (key === "Enter") {
      this.submitGuess();
      this.guess = "";
      return;
    }

    if (key === "Del") {
      this.deleteLastCharacter();
      return;
    }

    if (this.guess.length < 5) {
      this.guess += key;
      this.gameService.addLetter(this.guess);

      this.previousInput = this.guess;
      this.previousInputLength = this.guess.length;
    }
    if (this.guess.length === 5) {
      this.focusOnInput()
    }
  }

  focusOnInput() {
    document.getElementById('main_input')?.focus();
  }

  submitGuess() {
    if (this.guess.length !== 5) {
      this.message = 'Guess must be 5 letters long.';
      setTimeout(() => {
        this.message = '';
      }, 2000);
      return;
    }

    this.isSubmitRow[this.gameService.activeRow] = true;

    const result = this.gameService.submitGuess(this.guess);
    if (result.success) {
      this.board = result.board;
      this.message = result.message;
      if (result.solved) {
        this.message = 'Congratulations! You solved the puzzle!';
      }
    } else {
      this.message = result.message;
    }

    this.guess = '';

    setTimeout(() => {
      this.message = '';
    }, 2000);
  }

  getGuessIndex(rowIndex: number, colIndex: number): number {
    const letter = this.board[rowIndex][colIndex];
    const solutionArray = this.gameService.targetWord.split('');
    
    /*
      0 = wrong
      1 = almost correct
      2 = correct
    */
    if (letter === this.gameService.targetWord[colIndex]) {
      return 2;
    } else if (solutionArray.includes(letter)) {
      return 1;
    } else {
      return 0;
    }
  }
}

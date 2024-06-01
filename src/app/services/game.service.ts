import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private targetWord: string = 'APPLE';
  private board: string[][] = Array(6).fill('').map(() => Array(5).fill(''));
  activeRow: number = 0;

  constructor() { }

  initializeBoard(): string[][] {
    return this.board;
  }

  submitGuess(guess: string) {
    this.activeRow += 1;

    const row = this.board.findIndex(r => r.every(c => c === ''));
    if (row === -1) {
      return { success: false, message: 'No more guesses allowed', board: this.board, solved: false };
    }

    const solved = guess === this.targetWord;
    const message = solved ? 'Correct guess!' : 'Try again!';
    return { success: true, message, board: this.board, solved };
  }

  addLetter(guess: string) {
    for (let i = 0; i < guess.length; i++) {
      this.board[this.activeRow][i] = guess[i];
    }
  }

  removeLetter(guess: string, prevGuess: string) {
    for (let i = 0; i < prevGuess.length; i++) {
      this.board[this.activeRow][i] = guess[i];
    }
  }
}

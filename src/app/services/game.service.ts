import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private targetWord: string = 'apple';
  private board: string[][] = Array(6).fill('').map(() => Array(5).fill(''));

  constructor() { }

  initializeBoard(): string[][] {
    return this.board;
  }

  submitGuess(guess: string) {
    const row = this.board.findIndex(r => r.every(c => c === ''));
    if (row === -1) {
      return { success: false, message: 'No more guesses allowed', board: this.board, solved: false };
    }

    for (let i = 0; i < guess.length; i++) {
      this.board[row][i] = guess[i];
    }

    const solved = guess === this.targetWord;
    const message = solved ? 'Correct guess!' : 'Try again!';
    return { success: true, message, board: this.board, solved };
  }
}

import { Injectable } from '@angular/core';
import words from 'an-array-of-english-words';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  targetWord: string = '';
  private board: string[][] = Array(6).fill('').map(() => Array(5).fill(''));
  activeRow: number = 0;

  constructor() { }

  initializeTargetWord() {
    const wordsList = words.filter(word => word.length === 5);
    const randomIndex = Math.floor(Math.random() * wordsList.length);
    const randomWord = wordsList[randomIndex];
    this.targetWord = randomWord.toUpperCase();;
  }

  initializeBoard(): string[][] {
    return this.board;
  }

  resetBoard() {
    this.board = Array(6).fill('').map(() => Array(5).fill(''));
  }

  submitGuess(guess: string) {
    this.activeRow += 1;

    const row = this.board.findIndex(r => r.every(c => c === ''));
    if (row === -1) {
      return { success: false, board: this.board, solved: false };
    }

    const solved = guess === this.targetWord;
    return { success: true, board: this.board, solved };
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

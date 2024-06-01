import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-letter-box',
  templateUrl: './letter-box.component.html',
  styleUrls: ['./letter-box.component.scss']
})
export class LetterBoxComponent {
  @Input() letter?: string;
  @Output() guestLetter = new EventEmitter();

  guess: string = '';

  onInputChange(event: any) {
    const input = event.target.value.toUpperCase();
    const filteredInput = input.replace(/[^QWERTYUIOPASDFGHJKLZXCVBNM]/g, '');
    this.guess = filteredInput;
    event.target.value = this.guess;

    if (filteredInput.length > 0) {
      this.guestLetter.emit({
        guess: this.guess,
        event: event
      });
    }
  }
}

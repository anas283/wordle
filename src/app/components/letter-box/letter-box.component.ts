import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-letter-box',
  templateUrl: './letter-box.component.html',
  styleUrls: ['./letter-box.component.scss']
})
export class LetterBoxComponent {
  @Input() letter?: string;
}

import { Component, Input, OnInit } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-letter-box',
  templateUrl: './letter-box.component.html',
  styleUrls: ['./letter-box.component.scss']
})
export class LetterBoxComponent implements OnInit {
  @Input() index?: number;
  @Input() letter?: string;
  @Input() isAnimateSubmit?: boolean = false;

  /*
    0 = wrong
    1 = almost correct
    2 = correct
  */
  @Input() guessIndex?: number;

  isAnimateFilled: boolean = false;
  isAnimateFlip: boolean = false;
  isWordComplete: boolean = false;

  ngOnInit() {
    this.handleLetterAnimation();
  }

  ngOnChanges() {
    this.handleFlipAnimation();
  }

  handleLetterAnimation() {
    if (this.letter) {
      this.isAnimateFilled = true;

      setTimeout(() => {
        this.isAnimateFilled = false;
      }, 100);
    }
  }

  handleFlipAnimation() {
    if (this.isAnimateSubmit) {
      setTimeout(() => {
        this.isWordComplete = true;
        this.isAnimateFlip = true;
  
        setTimeout(() => {
          this.isAnimateFlip = false;
        }, 100);
      }, (this.index ?? 0) * 300);
    }
  }
}

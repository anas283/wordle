import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameLayoutComponent } from './game-layout/game-layout.component';
import { LetterBoxComponent } from './components/letter-box/letter-box.component';
import { GameService } from './services/game.service';
import { FormsModule } from '@angular/forms';
import { KeyboardKeyComponent } from './components/keyboard-key/keyboard-key.component';

@NgModule({
  declarations: [
    AppComponent,
    GameLayoutComponent,
    LetterBoxComponent,
    KeyboardKeyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }

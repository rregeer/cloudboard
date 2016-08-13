import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './components/app.component';
import { BoardComponent } from './components/board.component';
import { SoundComponent } from './components/sound.component';
import { SoundService } from './service/sound-service';
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';

@NgModule({
  imports: [BrowserModule, HttpModule],
  declarations: [AppComponent, BoardComponent],
  bootstrap: [AppComponent],
  providers: [SoundService]
})
export class AppModule {} 

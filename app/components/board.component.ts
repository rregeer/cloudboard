import { Component } from '@angular/core';
import { SoundService } from '../service/sound-service';
import { Sound } from '../shared/sound';

@Component({
  selector: 'board',
  templateUrl: 'app/template/board.html',
  styleUrls: ['app/styles/board.css']
})
export class BoardComponent {
  private sounds: Array<Sound> = [];

  constructor(private soundService: SoundService) {
    this.getSounds();
  }

  private getSounds() {
    this.soundService.getSounds()
      .subscribe((sounds: Array<Sound>) => {
        this.sounds = sounds;
      });
  }
}

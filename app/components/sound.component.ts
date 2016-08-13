import { Component, Input } from '@angular/core';
import { Sound } from '../shared/sound';

@Component({
  selector: 'sound',
  templateUrl: 'app/template/sound.html',
  styleUrls: 'app/styles/sound.css'
})
export class SoundComponent {
  @Input('soundFile') soundFile: Sound;
}

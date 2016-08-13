import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Sound } from '../shared/sound';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SoundService {
  private soundsUrl: string = '/etc/sounds.json';

  public constructor(private http: Http) {}

  public getSounds(): Observable<Sound[]> {
    return this.http
      .get(this.soundsUrl)
      .map((res: Response) => {
        return res.json().sounds.map(Sound.create);
      });
  }
}

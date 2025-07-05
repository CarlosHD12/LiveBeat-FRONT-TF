import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HU23} from '../model/hu23';

@Injectable({
  providedIn: 'root'
})
export class CancionSharedService {
  private cancionesSource = new BehaviorSubject<HU23[]>([]);
  setCanciones(canciones: HU23[]) {
    this.cancionesSource.next(canciones);
  }
}

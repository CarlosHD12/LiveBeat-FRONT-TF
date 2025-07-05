import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {LandingPage} from './componente/landing-page/landing-page';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'LiveBeatFRONT';
  rol: any;
  esArtista(): boolean {
    let es: boolean = false;
    this.rol = localStorage.getItem("rol");
    if(this.rol == 'ROLE_ARTISTA'){
      es = true;
    }
    return es;
  }
}

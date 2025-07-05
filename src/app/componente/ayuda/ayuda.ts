import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {MatToolbar} from '@angular/material/toolbar';

@Component({
  selector: 'app-ayuda',
  imports: [
    RouterLink,
    MatToolbar
  ],
  templateUrl: './ayuda.html',
  styleUrl: './ayuda.css'
})
export class Ayuda {

}

import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {MatToolbar} from '@angular/material/toolbar';

@Component({
  selector: 'app-sobre-nosotros',
  imports: [
    RouterLink,
    MatToolbar
  ],
  templateUrl: './sobre-nosotros.html',
  styleUrl: './sobre-nosotros.css'
})
export class SobreNosotros {

}

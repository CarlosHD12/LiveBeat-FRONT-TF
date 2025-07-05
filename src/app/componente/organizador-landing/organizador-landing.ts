import { Component } from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-organizador-landing',
  imports: [
    MatToolbar,
    RouterLink
  ],
  templateUrl: './organizador-landing.html',
  styleUrl: './organizador-landing.css'
})
export class OrganizadorLanding {

}

import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {MatToolbar} from '@angular/material/toolbar';
import {NgIf, NgStyle} from '@angular/common';

@Component({
  selector: 'app-ayuda',
  imports: [
    RouterLink,
    MatToolbar,
    NgIf,
    NgStyle
  ],
  templateUrl: './ayuda.html',
  styleUrl: './ayuda.css'
})
export class Ayuda {
  showSplash = false;
  splashStyles: { [key: string]: string } = {};
  constructor(private router: Router) {}

  triggerSplash(event: MouseEvent) {
    const button = event.currentTarget as HTMLElement;
    const rect = button.getBoundingClientRect();

    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    this.splashStyles = {
      top: `${y}px`,
      left: `${x}px`,
      width: `80px`,
      height: `80px`,
      transform: 'scale(0)',
    };

    this.showSplash = true;

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 650); // Tiempo de la animación
  }
}

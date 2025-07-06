import { Component } from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {Router, RouterLink} from '@angular/router';
import {DatePipe, NgForOf, NgIf, NgStyle} from '@angular/common';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {EventoService} from '../../services/evento-service';
import {MatButton} from '@angular/material/button';
import {Cancion} from '../../model/cancion';
import {Evento} from '../../model/evento';

@Component({
  selector: 'app-organizador-landing',
  imports: [
    MatToolbar,
    RouterLink,
    NgIf,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatButton,
    NgForOf,
    DatePipe,
    NgStyle
  ],
  templateUrl: './organizador-landing.html',
  styleUrl: './organizador-landing.css'
})
export class OrganizadorLanding {
  splashStyles: { [key: string]: string } = {};
  showSplash = false;
  eventos: Evento[] = [];

  constructor(
    private router: Router,
    private eventoService: EventoService
  ) {}

  ngOnInit(): void {
    this.eventoService.list().subscribe({
      next: data => {
        this.eventos = data;
        console.log("Eventos recibidos:", this.eventos);
      },
      error: err => {
        console.error("Error al traer canciones:", err);
      }
    });
  }

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
      this.router.navigate(['/cancion']); // ir al registro
    }, 650);
  }

  showSplash2 = false;
  splashStyles2: { [key: string]: string } = {};

  triggerSplashToRuta(ruta: string) {
    this.splashStyles2 = {
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      backgroundColor: '#FF7200',
      zIndex: '9999',
      transform: 'scaleX(0)',
      transformOrigin: 'left center',
      transition: 'transform 0.6s ease-in-out',
    };

    this.showSplash2 = true;

    setTimeout(() => {
      this.splashStyles2 = {
        ...this.splashStyles2,
        transform: 'scaleX(1)',
      };
    });

    setTimeout(() => {
      this.router.navigate([ruta]);
    }, 600);
  }
}

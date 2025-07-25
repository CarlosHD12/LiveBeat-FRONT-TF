import {Component, OnInit} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {Router, RouterLink} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {NgForOf, NgIf, NgStyle} from '@angular/common';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {CancionService} from '../../services/cancion-service';
import {Cancion} from '../../model/cancion';

@Component({
  selector: 'app-artista-landing',
  imports: [
    MatToolbar,
    RouterLink,
    MatButton,
    NgIf,
    NgStyle,
    NgForOf,
    MatCard,
    MatCardContent,
    MatCardTitle,
  ],
  templateUrl: './artista-landing.html',
  styleUrl: './artista-landing.css'
})
export class ArtistaLanding implements OnInit {
  showSplash = false;
  splashStyles: { [key: string]: string } = {};
  canciones: Cancion[] = [];
  id: number = 0;
  edicion = false;

  constructor(
    private router: Router,
    private cancionService: CancionService
  ) {}

  ngOnInit(): void {
    this.cancionService.list().subscribe({
      next: data => {
        this.canciones = data;
        console.log("Canciones recibidas:", this.canciones);
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


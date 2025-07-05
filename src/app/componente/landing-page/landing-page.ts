import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {MatToolbar, MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {ScrollingModule} from '@angular/cdk/scrolling';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatToolbar,
    ScrollingModule,
    RouterLink,
    MatToolbarModule,
    MatIconModule,
    RouterLink,
    MatButton,

  ],
  templateUrl: './landing-page.html',
  styleUrls: ['./landing-page.css']
})
export class LandingPage {
  showSplash = false;
  splashStyles: { [key: string]: string } = {};

  razones = [
    {
      titulo: 'Músicos verificados',
      descripcion: 'Todas nuestras bandas pasan por un proceso de validación para garantizar talento real, experiencia comprobada y shows que dejen huella.'
    },
    {
      titulo: 'Contratos rápidos',
      descripcion: 'Con LiveBeat puedes contratar a una banda en minutos, sin llamadas interminables ni papeleos. Todo se gestiona online, simple y rápido.'
    },
    {
      titulo: 'Sistema de reseñas',
      descripcion: 'Lee comentarios y calificaciones de clientes reales para tomar decisiones con confianza. La comunidad valida cada experiencia.'
    },
    {
      titulo: 'Pagos seguros y rápidos',
      descripcion: 'Tu pago queda protegido hasta que el show se realice. Usamos pasarelas seguras y te damos respaldo ante cualquier imprevisto.'
    },
    {
      titulo: 'Filtros inteligentes',
      descripcion: 'Filtra por género, estilo, ubicación, precio y más. Así encuentras justo la banda que encaja con el tono y energía de tu evento.'
    },
    {
      titulo: 'Soporte las 24 horas',
      descripcion: 'Nuestro equipo está disponible en todo momento para ayudarte a resolver dudas, imprevistos o emergencias, antes, durante y después del evento.'
    },
  ];

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

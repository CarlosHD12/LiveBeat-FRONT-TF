import {Component, inject} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {Router, RouterLink} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardContent, MatCardModule, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {CommonModule, NgForOf, NgIf, NgStyle} from '@angular/common';
import {HU23Service} from '../../services/hu23-service';
import {ArtistaService} from '../../services/artista-service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {HU23} from '../../model/hu23';
import {CancionSharedService} from '../../services/cancion-shared-service';
import {MatOption} from '@angular/material/core';
import {MatFormField, MatLabel} from '@angular/material/input';
import {MatSelect} from '@angular/material/select';
import {HU25Service} from '../../services/hu25-service';
import {HU25} from '../../model/hu25';
import {HU26Service} from '../../services/hu26-service';
import {HU26} from '../../model/hu26';

@Component({
  selector: 'app-reportes-art-landing',
  imports: [
    MatToolbar,
    RouterLink,
    MatButton,
    MatCardTitle,
    MatCardSubtitle,
    NgIf,
    NgStyle,
    MatCard,
    MatCardContent,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    CommonModule,
    MatCardModule,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef,
  ],
  templateUrl: './reportes-art-landing.html',
  styleUrl: './reportes-art-landing.css'
})
export class ReportesARTLanding {
  hu23Service = inject(HU23Service);
  hu25Service = inject(HU25Service);
  displayedColumns3: string[] = ['totalPagado'];
  dataSource3 = new MatTableDataSource<HU26>();
  hu26Service = inject(HU26Service);
  artistaService = inject(ArtistaService);
  dataSource2 = new MatTableDataSource<HU25>();
  fb = inject(FormBuilder);

  calificacionForm: FormGroup;
  displayedColumns: string[] = ['titulo', 'duracion'];
  dataSource = new MatTableDataSource<HU23>();
  listaA: any[] = [];

  canciones: HU23[] = [];
  showSplash = false;
  splashStyles: { [key: string]: string } = {};

  constructor(private cancionSharedService: CancionSharedService, private router: Router) {
    this.calificacionForm = this.fb.group({
      artista: ['', Validators.required]
    });

    this.artistaService.list().subscribe({
      next: data => this.listaA = data,
      error: err => console.error('Error al cargar artistas', err)
    });
  }

  cargarEventos() {
    this.hu25Service.getEventosDisponibles().subscribe({
      next: (data) => {
        this.dataSource2.data = data;
      },
      error: (err) => {
        console.error('Error al cargar eventos', err);
      }
    });
  }

  listarCancionesS() {
    if (this.calificacionForm.valid) {
      const idArtista = this.calificacionForm.get('artista')?.value;
      this.hu23Service.getCancionesPorArtista(idArtista).subscribe({
          next: (data) => {
            this.dataSource.data = data;
            this.cancionSharedService.setCanciones(data);
          },
          error: (err) => {
            console.error('Error al obtener canciones', err);
            this.dataSource.data = [];
            this.cancionSharedService.setCanciones([]);
          }
        }
      );}
  }

  onSubmit() {
    if (this.calificacionForm.valid) {
      const idArtista = this.calificacionForm.get('artista')?.value;

      this.hu26Service.getTotalPagadoPorArtista(idArtista).subscribe({
        next: (data) => {
          this.dataSource3.data = data;
        },
        error: (err) => {
          console.error('Error al obtener datos', err);
          this.dataSource3.data = [];
        }
      });
    }
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
      this.router.navigate(['/hu22']);
    }, 650); // Tiempo de la animación
  }
}

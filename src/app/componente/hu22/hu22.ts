import {Component, inject} from '@angular/core';
import {HU22} from '../../model/hu22';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {CommonModule, DatePipe, DecimalPipe, NgIf} from '@angular/common';
import {HU22Service} from '../../services/hu22-service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ArtistaService} from '../../services/artista-service';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatFormField, MatLabel} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-hu22',
  imports: [
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatTable,
    MatCellDef,
    MatHeaderCellDef,
    DatePipe,
    DecimalPipe,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatCard,
    MatCardTitle,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    MatButton,
    CommonModule,
    NgIf
  ],
  templateUrl: './hu22.html',
  styleUrl: './hu22.css'
})
export class HU22Component {
  fb = inject(FormBuilder);
  artistaService = inject(ArtistaService);
  hu22Service = inject(HU22Service);

  calificacionForm: FormGroup;
  listaA: any[] = []; // Lista de artistas
  eventos: HU22[] = [];

  dataSource = new MatTableDataSource<HU22>();
  displayedColumns: string[] = ['nombreEvento', 'fechaContrato', 'montoTotal'];

  constructor() {
    this.calificacionForm = this.fb.group({
      artista: ['', Validators.required]
    });

    // Cargar lista de artistas al iniciar
    this.artistaService.list().subscribe({
      next: data => {
        this.listaA = data;
      },
      error: err => {
        console.error('Error al cargar artistas', err);
      }
    });
  }

  // Metodo para buscar eventos por artista
  buscarEventos() {
    if (this.calificacionForm.valid) {
      const idArtista = this.calificacionForm.get('artista')?.value;

      this.hu22Service.getEventosContratados(idArtista).subscribe({
        next: (data) => {
          this.eventos = data;
          this.dataSource.data = data;
        },
        error: (err) => {
          console.error('Error al obtener eventos', err);
          this.eventos = [];
          this.dataSource.data = [];
        }
      });
    }
  }
}

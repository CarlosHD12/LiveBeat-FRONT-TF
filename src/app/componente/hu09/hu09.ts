import {Component, inject} from '@angular/core';
import {HU09Service} from '../../services/hu09-service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {HU09} from '../../model/hu09';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-hu09',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './hu09.html',
  styleUrl: './hu09.css'
})
export class HU09Component {
  hu09Service = inject(HU09Service);
  dataSource = new MatTableDataSource<HU09>();
  displayedColumns: string[] = ['nombreArtista', 'comentario', 'valoracion'];

  constructor() {}

  cargarCalificaciones() {
    this.hu09Service.getCalificacionesRecomendadas().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (err) => {
        console.error('Error al obtener calificaciones', err);
        this.dataSource.data = [];
      }
    });
  }
}

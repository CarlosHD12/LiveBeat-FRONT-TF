import {Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {HU15Service} from '../../services/hu15-service';
import {HU15} from '../../model/hu15';

@Component({
  selector: 'app-hu15',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './hu15.html',
  styleUrl: './hu15.css'
})
export class HU15Component {
  hu15Service = inject(HU15Service);

  displayedColumns: string[] = ['nombreArtista', 'cantidadContratos'];
  dataSource = new MatTableDataSource<HU15>();

  constructor() {}

  cargarDatos() {
    this.hu15Service.getContratosPorArtista().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (err) => {
        console.error('Error al obtener datos:', err);
        this.dataSource.data = [];
      }
    });
  }
}

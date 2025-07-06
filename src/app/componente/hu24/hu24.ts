import {Component, inject} from '@angular/core';
import {HU24Service} from '../../services/hu24-service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ArtistaService} from '../../services/artista-service';
import {
  MatTableDataSource,
} from '@angular/material/table';
import {HU24} from '../../model/hu24';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatLabel} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {CommonModule, NgIf} from '@angular/common';

@Component({
  selector: 'app-hu24',
  imports: [
    MatCard,
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
  templateUrl: './hu24.html',
  styleUrl: './hu24.css'
})
export class HU24Component {
  hu24Service = inject(HU24Service);
  artistaService = inject(ArtistaService)
  fb = inject(FormBuilder);

  calificacionForm: FormGroup;
  displayedColumns: string[] = ['nombreOrganizador', 'comentario', 'valoracion'];
  dataSource = new MatTableDataSource<HU24>();
  listaA: any[] = [];

  constructor() {
    this.calificacionForm = this.fb.group({
      artista: ['', Validators.required]
    });

    // Cargar lista de artistas (opcional)
    this.artistaService.list().subscribe({
      next: data => {
        this.listaA = data;
      },
      error: err => {
        console.error('Error al cargar artistas', err);
      }
    });
  }

  listarCalificaciones() {
    if (this.calificacionForm.valid) {
      const idArtista = this.calificacionForm.get('artista')?.value;

      this.hu24Service.getCalificaciones(idArtista).subscribe({
        next: (data: HU24[]) => {
          this.dataSource.data = data;
        },
        error: (err) => {
          console.error('Error al obtener calificaciones', err);
          this.dataSource.data = [];
        }
      });
    }
  }
}

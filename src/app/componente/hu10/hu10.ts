import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {HU10Service} from '../../services/hu10-service';
import {HU10} from '../../model/hu10';
import {MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-hu10',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    CommonModule,
    RouterModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  templateUrl: './hu10.html',
  styleUrl: './hu10.css'
})
export class HU10Component {
  hu10Service = inject(HU10Service);
  fb = inject(FormBuilder);

  displayedColumns: string[] = ['nombreEvento', 'fecha', 'tipoEvento', 'descripcion'];
  dataSource = new MatTableDataSource<HU10>();
  form!: FormGroup;

  constructor() {
    this.form = this.fb.group({
      fecha: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const fechaSeleccionada = this.form.get('fecha')?.value;

      // Formato de fecha: YYYY-MM-DD
      const fechaFormateada = fechaSeleccionada.toISOString().split('T')[0];

      this.hu10Service.getEventosPorFecha(fechaFormateada).subscribe({
        next: (data) => {
          this.dataSource.data = data;
        },
        error: (err) => {
          console.error('Error al obtener eventos por fecha:', err);
          alert('No hay eventos para esta fecha');
        }
      });
    }
  }
}

import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {EventoService} from '../../services/evento-service';
import {HU13Service} from '../../services/hu13-service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {HU13} from '../../model/hu13';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-hu13',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    CommonModule,
  ],
  templateUrl: './hu13.html',
  styleUrl: './hu13.css'
})
export class HU13Component {
  hu13Service = inject(HU13Service);
  eventoService = inject(EventoService);
  fb = inject(FormBuilder);

  displayedColumns: string[] = ['idP', 'fechaPago', 'monto', 'estadoPago'];
  dataSource = new MatTableDataSource<HU13>();
  form!: FormGroup;
  listaEventos: any[] = [];

  constructor() {
    this.form = this.fb.group({
      evento: ['', Validators.required]
    });

    // Cargar lista de eventos desde tu servicio existente
    this.eventoService.list().subscribe({
      next: data => {
        this.listaEventos = data;
      },
      error: err => {
        console.error('Error al cargar eventos', err);
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const idEvento = this.form.get('evento')?.value;

      this.hu13Service.getPagosPorEvento(idEvento).subscribe({
        next: (data) => {
          this.dataSource.data = data;
        },
        error: (err) => {
          console.error('Error al obtener pagos del evento', err);
          this.dataSource.data = [];
        }
      });
    }
  }
}

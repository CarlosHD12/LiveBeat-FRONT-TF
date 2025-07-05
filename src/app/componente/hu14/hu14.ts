import {Component, inject} from '@angular/core';
import {HU14Service} from '../../services/hu14-service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {HU14} from '../../model/hu14';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {CommonModule} from '@angular/common';
import {ContratoService} from '../../services/contrato-service';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';

@Component({
  selector: 'app-hu14',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    CommonModule,
    MatOption,
    MatSelect
  ],
  templateUrl: './hu14.html',
  styleUrl: './hu14.css'
})
export class HU14Component {
  hu14Service = inject(HU14Service);
  contratoervice = inject(ContratoService);
  fb = inject(FormBuilder);

  displayedColumns: string[] = ['idCo', 'total'];
  dataSource = new MatTableDataSource<HU14>();
  form!: FormGroup;
  listaContratos: any[] = [];

  constructor() {
    this.form = this.fb.group({
      contrato: ['', Validators.required]
    });

    this.contratoervice.list().subscribe({
      next: data => {
        this.listaContratos = data;
      },
      error: err => {
        console.error('Error al cargar contratos', err);
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const idContrato = this.form.get('contrato')?.value;

      this.hu14Service.getMontoTotal(idContrato).subscribe({
        next: (data) => {
          console.log('Datos recibidos:', data); // Verifica qué llega
          this.dataSource.data = data;
        },
        error: (err) => {
          console.error('Error al obtener el monto total', err);
          this.dataSource.data = [];
        }
      });
    }
  }
}

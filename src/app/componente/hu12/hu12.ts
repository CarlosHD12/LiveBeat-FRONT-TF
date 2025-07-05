import {Component, inject} from '@angular/core';
import {HU12Service} from '../../services/hu12-service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HU12} from '../../model/hu12';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-hu12',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatTableModule,
    CommonModule,
    MatInput
  ],
  templateUrl: './hu12.html',
  styleUrl: './hu12.css'
})
export class HU12Component {
  hu12Service = inject(HU12Service);

  displayedColumns: string[] = ['idCo', 'nombreEvento', 'fechaContrato', 'montoTotal'];
  dataSource = new MatTableDataSource<HU12>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const startDate = this.form.get('startDate')?.value;
      const endDate = this.form.get('endDate')?.value;

      // Formato correcto: YYYY-MM-DD
      const formattedStartDate = new Date(startDate).toISOString().split('T')[0];
      const formattedEndDate = new Date(endDate).toISOString().split('T')[0];

      this.hu12Service.getContratosPorRangoFechas(formattedStartDate, formattedEndDate).subscribe({
        next: (data) => {
          this.dataSource.data = data;
        },
        error: (err) => {
          console.error('Error al obtener contratos por rango de fechas:', err);
          this.dataSource.data = [];
        }
      });
    }
  }
}

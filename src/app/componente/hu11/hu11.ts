import { Component, inject } from '@angular/core';
import {MatCard, MatCardContent, MatCardModule, MatCardTitle} from '@angular/material/card';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {CommonModule, DatePipe, DecimalPipe, NgIf} from '@angular/common';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableDataSource, MatTableModule
} from '@angular/material/table';
import {MatFormField, MatLabel} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatSelect, MatSelectModule} from '@angular/material/select';
import {OrganizadorService} from '../../services/organizador-service';
import {HU11Service} from '../../services/hu11-service';
import {HU11} from '../../model/hu11';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-hu11',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    CommonModule,
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
  templateUrl: './hu11.html',
  styleUrl: './hu11.css'
})
export class HU11Component {
  organizadorService = inject(OrganizadorService);
  hu11Service = inject(HU11Service);
  fb = inject(FormBuilder);

  displayedColumns: string[] = ['idCo', 'fechaContrato', 'montoTotal', 'estado'];
  dataSource = new MatTableDataSource<HU11>();
  form: FormGroup;
  listaOrganizadores: any[] = [];

  constructor() {
    this.form = this.fb.group({
      organizador: ['', Validators.required]
    });

    // Cargar lista de organizadores desde tu servicio existente
    this.organizadorService.list().subscribe({
      next: (data: any[]) => {
        this.listaOrganizadores = data;
      },
      error: (err: any) => {
        console.error('Error al cargar organizadores', err);
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const idOrganizador = this.form.get('organizador')?.value;

      this.hu11Service.getContratosPendientes(idOrganizador).subscribe({
        next: (data: HU11[]) => {
          this.dataSource.data = data;
        },
        error: (err: any) => {
          console.error('No hay contratos pendientes para este organizador', err);
          this.dataSource.data = [];
        }
      });
    }
  }
}

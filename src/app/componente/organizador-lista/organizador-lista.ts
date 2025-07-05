import {Component, inject, ViewChild} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef, MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {MatPaginator} from '@angular/material/paginator';
import {Router, RouterLink} from '@angular/router';
import {Organizador} from '../../model/organizador';
import {OrganizadorService} from '../../services/organizador-service';

@Component({
  selector: 'app-organizador-lista',
  imports: [
    MatButton,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatSort,
    MatSortHeader,
    MatTable,
    RouterLink,
    MatCell,
    MatHeaderCellDef
  ],
  templateUrl: './organizador-lista.html',
  styleUrl: './organizador-lista.css'
})
export class OrganizadorListaComponent {
  lista : Organizador[] = [];
  displayedColumns = ['idO', 'nombreOrganizador', 'direccion', 'organizacion','accion01'];
  dataSource: MatTableDataSource<Organizador> = new MatTableDataSource<Organizador>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  organizadorService: OrganizadorService = inject(OrganizadorService);
  route: Router = inject(Router);

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    console.log("Cargando ngOnInit.....");
    this.organizadorService.getListaCambio().subscribe({ // se suscribe a lista cambio
      next: (data) => this.dataSource.data = data
    })
    this.organizadorService.actualizarLista();
  }

  constructor() {
    console.log('organizadorListarComponent constructor');
  }
}

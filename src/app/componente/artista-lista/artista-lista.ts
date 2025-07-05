import {Component, inject, ViewChild,} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {MatButton} from '@angular/material/button';
import {Router, RouterLink} from '@angular/router';
import {Artista} from '../../model/artista';
import {ArtistaService} from '../../services/artista-service';

@Component({
  selector: 'app-artista-lista',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatPaginator,
    MatSort,
    MatSortHeader,
    MatButton,
    RouterLink,
    MatCellDef,
    MatHeaderCellDef,
    MatCell,
  ],
  templateUrl: './artista-lista.html',
  styleUrl: './artista-lista.css'
})
export class ArtistaListaComponent  {
  lista : Artista[] = [];
  displayedColumns = ['idA', 'nombreArtista', 'genero', 'biografia', 'disponible', 'canciones','accion01'];
  dataSource: MatTableDataSource<Artista> = new MatTableDataSource<Artista>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  artistaService: ArtistaService = inject(ArtistaService);
  route: Router = inject(Router);

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    console.log("Cargando ngOnInit.....");
    this.artistaService.getListaCambio().subscribe({ // se suscribe a lista cambio
      next: (data) => this.dataSource.data = data
    })
    this.artistaService.actualizarLista();
  }

  constructor() {
    console.log('artistaListarComponent constructor');
  }
}

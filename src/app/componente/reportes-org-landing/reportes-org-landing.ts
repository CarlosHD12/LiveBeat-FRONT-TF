import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {Router, RouterLink, RouterModule} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatCard, MatCardContent, MatCardModule, MatCardTitle} from '@angular/material/card';
import {CommonModule, DatePipe, NgClass, NgForOf, NgIf, NgStyle} from '@angular/common';
import {MatHint, MatSelect, MatSuffix} from '@angular/material/select';
import {MatNativeDateModule, MatOption} from '@angular/material/core';
import {MatFormField, MatInput, MatInputModule, MatLabel} from '@angular/material/input';
import {HU07Service} from '../../services/hu07-service';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable,
  MatTableDataSource, MatTableModule
} from '@angular/material/table';
import {HU07} from '../../model/hu07';
import {HU10Service} from '../../services/hu10-service';
import {HU10} from '../../model/hu10';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {OrganizadorService} from '../../services/organizador-service';
import {HU11Service} from '../../services/hu11-service';
import {HU11} from '../../model/hu11';
import {HU14Service} from '../../services/hu14-service';
import {ContratoService} from '../../services/contrato-service';
import {HU14} from '../../model/hu14';

@Component({
  selector: 'app-reportes-org-landing',
  imports: [
    MatToolbar,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    CommonModule,
    RouterModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    NgClass,
    DatePipe,
    NgStyle,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatInput,
    MatSuffix
  ],
  templateUrl: './reportes-org-landing.html',
  styleUrl: './reportes-org-landing.css'
})
export class ReportesORGLanding {

  hu14Service = inject(HU14Service);
  contratoervice = inject(ContratoService);

  displayedColumns14: string[] = ['idCo', 'total'];
  dataSource14 = new MatTableDataSource<HU14>();
  form14!: FormGroup;
  listaContratos: any[] = [];

  hu10Service = inject(HU10Service);
  hu07Service = inject(HU07Service);
  organizadorService = inject(OrganizadorService);
  hu11Service = inject(HU11Service);
  displayedColumns11: string[] = ['idCo', 'fechaContrato', 'montoTotal', 'estado'];
  dataSource11 = new MatTableDataSource<HU11>();
  form11: FormGroup;
  listaOrganizadores: any[] = [];
  fb = inject(FormBuilder);
  displayedColumns10: string[] = ['nombreEvento', 'fecha', 'tipoEvento', 'descripcion'];
  dataSource10 = new MatTableDataSource<HU10>();
  displayedColumns: string[] = ['nombreArtista', 'genero', 'disponible'];
  dataSource = new MatTableDataSource<HU07>();
  listaDeGeneros: string[] = [];
  form!: FormGroup;
  form2!: FormGroup;

  constructor(private router: Router) {
    this.form = this.fb.group({
      genero: ['', Validators.required]
    });

    this.form2 = this.fb.group({
      fecha: ['', Validators.required],
    });

    this.hu07Service.getListaDeGeneros().subscribe({
      next: data => {
        this.listaDeGeneros = data;
      },
      error: err => {
        console.error('Error al cargar géneros', err);
      }
    });

    this.form11 = this.fb.group({
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

    this.form14 = this.fb.group({
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

  onSubmit2() {
    if (this.form2.valid) {
      const fechaSeleccionada = this.form2.get('fecha')?.value;

      // Formato de fecha: YYYY-MM-DD
      const fechaFormateada = fechaSeleccionada.toISOString().split('T')[0];

      this.hu10Service.getEventosPorFecha(fechaFormateada).subscribe({
        next: (data) => {
          this.dataSource10.data = data;
        },
        error: (err) => {
          console.error('Error al obtener eventos por fecha:', err);
          alert('No hay eventos para esta fecha');
        }
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const genero = this.form.get('genero')?.value;

      this.hu07Service.getArtistasPorGenero(genero).subscribe({
        next: (data: HU07[]) => {
          this.dataSource.data = data;
        },
        error: (err) => {
          console.error('No hay artistas disponibles para este género', err);
          this.dataSource.data = [];
        }
      });
    }
  }

  onSubmit11() {
    if (this.form11.valid) {
      const idOrganizador = this.form11.get('organizador')?.value;

      this.hu11Service.getContratosPendientes(idOrganizador).subscribe({
        next: (data: HU11[]) => {
          this.dataSource11.data = data;
        },
        error: (err: any) => {
          console.error('No hay contratos pendientes para este organizador', err);
          this.dataSource11.data = [];
        }
      });
    }
  }

  artistaSeleccionado = 0;

  @ViewChild('galeria') galeria!: ElementRef;

  seleccionarArtista(index: number) {
    this.artistaSeleccionado = index;
    this.enfocarSeleccionado();
  }

  moverArtista(direccion: 'izquierda' | 'derecha') {
    const totalA = this.dataSource.data.length;

    if (direccion === 'izquierda') {
      this.artistaSeleccionado = (this.artistaSeleccionado - 1 + totalA) % totalA;
    } else {
      this.artistaSeleccionado = (this.artistaSeleccionado + 1) % totalA;
    }

    this.enfocarSeleccionado();
  }

  enfocarSeleccionado() {
    const galeriaEl = this.galeria.nativeElement as HTMLElement;
    const tarjetas = galeriaEl.querySelectorAll('.tarjeta-artista');

    if (tarjetas[this.artistaSeleccionado]) {
      (tarjetas[this.artistaSeleccionado] as HTMLElement).scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
  }

  onSubmit14() {
    if (this.form14.valid) {
      const idContrato = this.form14.get('contrato')?.value;

      this.hu14Service.getMontoTotal(idContrato).subscribe({
        next: (data) => {
          console.log('Datos recibidos:', data); // Verifica qué llega
          this.dataSource14.data = data;
        },
        error: (err) => {
          console.error('Error al obtener el monto total', err);
          this.dataSource14.data = [];
        }
      });
    }
  }


  showSplash = false;
  splashStyles: { [key: string]: string } = {};

  triggerSplash(event: MouseEvent) {
    const button = event.currentTarget as HTMLElement;
    const rect = button.getBoundingClientRect();

    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    this.splashStyles = {
      top: `${y}px`,
      left: `${x}px`,
      width: `80px`,
      height: `80px`,
      transform: 'scale(0)',
    };

    this.showSplash = true;

    setTimeout(() => {
      this.router.navigate(['/hu09']);
    }, 650); // Tiempo de la animación
  }
}

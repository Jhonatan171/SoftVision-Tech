import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router'; 

import { EspecialidadesService, Especialidad } from '../servicios/especialidades.service';

@Component({
  selector: 'app-especialidades',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './especialidades.component.html',
  styleUrl: './especialidades.component.scss'
})
export class EspecialidadesComponent implements OnInit {
  especialidades: Especialidad[] = [];
  errorMessage: string | null = null; 

  constructor(private especialidadesService: EspecialidadesService) { }

  ngOnInit(): void {
    this.cargarEspecialidades();
  }

  cargarEspecialidades(): void {
    this.errorMessage = null; 
    this.especialidadesService.getEspecialidades().subscribe({
      next: (data) => {
        this.especialidades = data;
        console.log('Especialidades cargadas:', this.especialidades);
      },
      error: (err) => {
        console.error('Error al cargar especialidades:', err);
        this.errorMessage = 'Error al cargar especialidades. Asegúrate de que json-server esté corriendo (ej. `json-server --watch db.json`).';
        this.especialidades = []; 
      }
    });
  }
}
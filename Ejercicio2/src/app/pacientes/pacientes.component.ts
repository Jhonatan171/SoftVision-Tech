import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common'; 

import { PacientesService, Paciente } from '../servicios/pacientes.service';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './pacientes.component.html',
  styleUrl: './pacientes.component.scss'
})
export class PacientesComponent implements OnInit {
  pacienteForm!: FormGroup;
  pacientes: Paciente[] = [];

  constructor(private fb: FormBuilder, private pacientesService: PacientesService) { }

  ngOnInit(): void {
    this.pacienteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]], 
      fechaNacimiento: ['', Validators.required]
    });

    this.pacientesService.getPacientes().subscribe(pacientes => {
      this.pacientes = pacientes;
    });
  }

  onSubmit(): void {
    if (this.pacienteForm.valid) {
      this.pacientesService.addPaciente(this.pacienteForm.value);
      this.pacienteForm.reset(); 
      console.log('Paciente registrado:', this.pacientes[this.pacientes.length - 1]);
    } else {
      console.log('Formulario de paciente inválido');
      this.pacienteForm.markAllAsTouched(); 
    }
  }
}
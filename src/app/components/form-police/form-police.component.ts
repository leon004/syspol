import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PoliceService } from '../../services/police.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-police',
  templateUrl: './form-police.component.html',
  styleUrls: ['./form-police.component.css']
})
export class FormPoliceComponent implements OnInit {
  infractionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private policeService: PoliceService,
    private snackBar: MatSnackBar
  ) {
    this.infractionForm = this.fb.group({
      policiaId: ['', Validators.required],
      policiaUsername: ['', Validators.required],
      placas: ['', Validators.required],
      pais: ['', Validators.required],
      estado: ['', Validators.required],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      year: ['', Validators.required],
      color: ['', Validators.required],
      ubicacion: ['', Validators.required],
      nombreInfractor: [''],
      motivoDeMulta: ['', Validators.required],
      imagenes: ['']
    });
  }

  ngOnInit(): void {
  }

  submit() {
    if (this.infractionForm.valid) {
      this.policeService.createInfraction(this.infractionForm.value).subscribe({
        next: (response) => {
          this.snackBar.open('Infracción registrada con éxito!', 'Cerrar', { duration: 3000 });
        },
        error: (error) => {
          console.error('Error al registrar la infracción:', error);
          this.snackBar.open('Error al registrar la infracción', 'Cerrar', { duration: 3000 });
        }
      });
    } else {
      this.snackBar.open('Por favor, complete el formulario correctamente.', 'Cerrar', { duration: 3000 });
    }
  }
}

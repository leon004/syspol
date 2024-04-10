import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule,FormArray, FormGroup} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from '../data.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-infraction',
  templateUrl: './infraction.component.html',
  styleUrl: './infraction.component.css'
})
export class InfractionComponent implements OnInit {
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  isLinear = false;
  marcas: any[] = [];
  modelos: string[] = [];
  estados: any[] = [];
  years: any[] = [];
  images: string[] = [];
  acceptFileTypes = 'image/*';
  articulos: any[] = [];
  motivos: any[] = [];
  fracciones: any[] = [];
  incisos: any[] = [];
  informacionSeleccionada: any = {};


  constructor(private _formBuilder: FormBuilder, private dataService: DataService) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      plates: ['', Validators.required],
      state: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: [''],
      color: ['', Validators.required]
    });

    this.secondFormGroup = this._formBuilder.group({
      reason: [''],
      infracciones: this._formBuilder.array([])
    });

    this.thirdFormGroup = this._formBuilder.group({
      ubicacion: ['', Validators.required],
      fijarUbicacion: [''],
      nombreInfractor:['']
    });

    this.dataService.getMarcas().subscribe(marcas => {
      this.marcas = marcas;
    });

    this.dataService.getEstados().subscribe(data =>{
      this.estados = data;
    });

    this.dataService.getYears().subscribe(years => {
      this.years = years;
    });

    this.firstFormGroup.get('brand')!.valueChanges.pipe(
      map(brand => this.dataService.getModelosPorMarca(brand))
    ).subscribe(modelos$ => modelos$.subscribe(modelos => {
      this.modelos = modelos;
    }));
  }

  onImageUpload(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if(fileList) {
      for(let i = 0; i < fileList.length; i++){
        if(i<6){ //Condicional para cargar maximo 6 imagenes
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.images.push(e.target.result);
          };
          reader.readAsDataURL(fileList[i]);
        }
      }
    }
  }

deleteImage(index: number) {
  this.images.splice(index, 1);
}

  onMarcaSelected(marca: string){
    this.dataService.getModelosPorMarca(marca).subscribe(modelos => {
      this.modelos = modelos; // Asegúrate de que 'modelos' sea un arreglo de strings u objetos según tu estructura de datos
    });
  }

  infracciones(): FormArray {
    return this.secondFormGroup.get('infracciones') as FormArray;
  }

  addInfraccion(): void {
    this.infracciones().push(this.createInfraccionFormGroup());
  }

  removeInfraccion(index: number): void {
    this.infracciones().removeAt(index);
  }

  createInfraccionFormGroup(): FormGroup {
    return this._formBuilder.group({
      multa: ['', Validators.required],
    });
  }

  getInfraccionInfo(index: number): string {
    // Implementa la lógica según sea necesario
    return 'Información de la multa';
  }
}

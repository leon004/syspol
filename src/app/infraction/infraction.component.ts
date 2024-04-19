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
import { SharedService } from '../shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-infraction',
  templateUrl: './infraction.component.html',
  styleUrl: './infraction.component.css'
})
export class InfractionComponent implements OnInit {

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  fourthFormGroup!: FormGroup;
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
  colores = [
    { value: '#ff0000', name: 'Rojo' },
    { value: '#00ff00', name: 'Verde' },
    { value: '#0000ff', name: 'Azul' },
    { value: '#ffff00', name: 'Amarillo' },
    { value: '#ffffff', name: 'Blanco'}
    // Agrega más colores según necesites
  ];
  infraccionesMotivos: any[] = [];


  constructor(private _formBuilder: FormBuilder, private dataService: DataService, private sharedService: SharedService, private snackBar: MatSnackBar) {}

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
    this.addInfraccion();

    this.thirdFormGroup = this._formBuilder.group({
      ubicacion: ['', Validators.required],
      fijarUbicacion: [''],
      nombreInfractor:['AUSENTE']
    });

    this.fourthFormGroup = this._formBuilder.group({
      platesConfirmation: [{value: '', disabled: true}],
      stateConfirmation: [{value: '', disabled: true}],
      brandConfirmation: [{value: '', disabled: true}],
      modelConfirmation: [{value: '', disabled: true}],
      yearConfirmation: [{value: '', disabled: true}],
      colorConfirmation: [{value: '', disabled: true}],
      ubicacionConfirmation: [{value: '', disabled: true}],
      nombreInfractorConfirmation: [{value: '', disabled: true}],
      motivoConfirmation: [{value: '', disabled: true}]
    });


    this.firstFormGroup.valueChanges.subscribe(values => {
      this.fourthFormGroup.patchValue({
        platesConfirmation: values.plates,
        stateConfirmation: values.state,
        brandConfirmation: values.brand,
        modelConfirmation: values.model,
        yearConfirmation: values.year,
        colorConfirmation: values.color
      });
    });

    this.secondFormGroup.valueChanges.subscribe(values => {
      this.fourthFormGroup.patchValue({
        motivoConfirmation: values.reason
      });
    });

    this.thirdFormGroup.valueChanges.subscribe(values => {
      this.fourthFormGroup.patchValue({
        ubicacionConfirmation: values.ubicacion,
        nombreInfractorConfirmation: values.nombreInfractor
      });
    });

    this.sharedService.currentPlates.subscribe(plates => {
      this.firstFormGroup.get('plates')!.setValue(plates);
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

    this.dataService.getInfracciones().subscribe(data => {
      this.infraccionesMotivos = data;
    });

    this.firstFormGroup.get('brand')!.valueChanges.pipe(
      map(brand => this.dataService.getModelosPorMarca(brand))
    ).subscribe(modelos$ => modelos$.subscribe(modelos => {
      this.modelos = modelos;
    }));
    this.dataService.getMotivos().subscribe(data => {
      this.motivos = data;
    });
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



  getInfraccionInfo(index: number): any {
    const selectedInfraccion = this.infracciones().at(index) as FormGroup;
    return selectedInfraccion.get('detalleMulta')!.value;
  }
  createInfraccionFormGroup(): FormGroup {
    return this._formBuilder.group({
      multa: ['', Validators.required],
      detalleMulta: [null]  // Puedes inicializar como null si el valor inicial realmente no existe
    });
  }

  checkInfractorName() {
    const infractorName = this.thirdFormGroup.get('nombreInfractor')!.value;
    if (infractorName.trim() === '') {
      this.thirdFormGroup.get('nombreInfractor')!.setValue('AUSENTE');
    }
  }

  registrarInfraccion(){
    this.openSnackBar("Datos enviados correctamente");
  }

  openSnackBar(message: string){
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }


}

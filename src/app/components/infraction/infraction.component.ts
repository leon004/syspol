import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InfractionService } from '../../services/infraction.service';
import { FirebaseStorageService } from '../../services/firebase-storage.service';
import { DataService } from '../../services/data.service';
import { SharedService } from '../../services/shared.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-infraction',
  templateUrl: './infraction.component.html',
  styleUrls: ['./infraction.component.css']
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
  policiaId!: number;
  currentDate!: Date;
  policiaUsername!: string;
  articuloFraccion: string = '';

  // Declaración de colores
  colores = [
    { value: '#ff0000', name: 'Rojo' },
    { value: '#00ff00', name: 'Verde' },
    { value: '#0000ff', name: 'Azul' },
    { value: '#ffff00', name: 'Amarillo' },
    { value: '#ffffff', name: 'Blanco' }
  ];

  // Declaración de motivos de infracciones
  motivos: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private infractionService: InfractionService,
    private snackBar: MatSnackBar,
    private firebaseStorageService: FirebaseStorageService,
    private dataService: DataService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    // Cargar información del usuario desde localStorage
    const user = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.policiaId = user.id;
    this.policiaUsername = user.usuario;
    this.currentDate = new Date();

    // Inicializar grupos de formularios
    this.firstFormGroup = this.formBuilder.group({
      plates: ['', Validators.required],
      state: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: [''],
      color: ['', Validators.required]
    });

    this.secondFormGroup = this.formBuilder.group({
      reason: [''],
      infracciones: this.formBuilder.array([])
    });

    this.thirdFormGroup = this.formBuilder.group({
      ubicacion: ['', Validators.required],
      fijarUbicacion: [false],
      nombreInfractor: ['']
    });

    this.fourthFormGroup = this.formBuilder.group({
      platesConfirmation: [{ value: '', disabled: true }],
      stateConfirmation: [{ value: '', disabled: true }],
      brandConfirmation: [{ value: '', disabled: true }],
      modelConfirmation: [{ value: '', disabled: true }],
      yearConfirmation: [{ value: '', disabled: true }],
      colorConfirmation: [{ value: '', disabled: true }],
      ubicacionConfirmation: [{ value: '', disabled: true }],
      nombreInfractorConfirmation: [{ value: '', disabled: true }],
      motivoConfirmation: [{ value: '', disabled: true }]
    });

    // Establecer nombre del infractor predeterminado como 'AUSENTE'
    this.thirdFormGroup.get('nombreInfractor')!.valueChanges.subscribe(value => {
      if (!value) {
        this.thirdFormGroup.get('nombreInfractor')!.setValue('AUSENTE', { emitEvent: false });
      }
    });

    // Vincular datos entre formularios para la confirmación
    this.firstFormGroup.valueChanges.subscribe(values => {
      this.fourthFormGroup.patchValue({
        platesConfirmation: values.plates,
        stateConfirmation: values.state,
        brandConfirmation: values.brand,
        modelConfirmation: values.model,
        yearConfirmation: values.year,
        colorConfirmation: values.name
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
        nombreInfractorConfirmation: values.nombreInfractor || 'AUSENTE'
      });
    });

    // Cargar datos desde los servicios
    this.loadDataFromServices();
  }

  // Cargar datos desde los servicios
  private loadDataFromServices() {
    // Cargar motivos de infracciones
    this.dataService.getMotivos().subscribe(data => {
      this.motivos = data;
    });

    // Otros datos, como marcas, modelos y estados
    this.dataService.getMarcas().subscribe(marcas => {
      this.marcas = marcas;
    });

    this.dataService.getEstados().subscribe(estados => {
      this.estados = estados;
    });

    this.dataService.getYears().subscribe(years => {
      this.years = years;
    });

    // Modelos por marca seleccionada
    this.firstFormGroup.get('brand')!.valueChanges.pipe(
      map(brand => this.dataService.getModelosPorMarca(brand))
    ).subscribe(modelos$ => modelos$.subscribe(modelos => {
      this.modelos = modelos;
    }));
  }

  // Manejar carga de imágenes
  onImageUpload(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    const fileList = element.files;

    if (fileList) {
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];

        this.firebaseStorageService.uploadImage(file, 'upload/path').subscribe({
          next: (url) => {
            this.images.push(url); // Guardar URL en el arreglo de imágenes
            console.log('Imagen cargada y URL obtenida:', url);
          },
          error: (error) => {
            console.error('Error al cargar la imagen:', error);
            this.snackBar.open('Error al cargar la imagen', 'Cerrar', { duration: 3000 });
          }
        });
      }
    }
  }

  // Eliminar una imagen cargada
  deleteImage(index: number) {
    this.images.splice(index, 1);
  }

  // Obtener la lista de infracciones
  infracciones(): FormArray {
    return this.secondFormGroup.get('infracciones') as FormArray;
  }

  // Agregar un nuevo motivo de infracción
  addInfraccion(): void {
    this.infracciones().push(this.formBuilder.group({
      motivo: ['', Validators.required]
    }));
  }

  // Eliminar un motivo de infracción
  removeInfraccion(index: number): void {
    this.infracciones().removeAt(index);
  }

  // Registrar la infracción completa
  registrarInfraccion() {
    const formData = {
      policiaId: this.policiaId,
      policiaUsername: this.policiaUsername,
      placas: this.firstFormGroup.value.plates,
      pais: 'Mexico',
      estado: this.firstFormGroup.value.state,
      marca: this.firstFormGroup.value.brand,
      modelo: this.firstFormGroup.value.model,
      year: this.firstFormGroup.value.year,
      color: this.firstFormGroup.value.color,
      ubicacion: this.thirdFormGroup.value.ubicacion,
      nombreInfractor: this.thirdFormGroup.value.nombreInfractor || 'AUSENTE',
      imagenes: this.images.join(', '), // Asegúrate de que el formato de las imágenes sea el correcto
      motivoDeMulta: this.secondFormGroup.value.reason,
      articuloFraccion: 'Articulo 12 fraccion II', // Asegúrate de que esto se maneje correctamente
      fecha: this.formatDate(this.currentDate),
      hora: this.formatTime(this.currentDate)
    };

    console.log('Datos de la infracción a enviar:', formData);

    this.infractionService.createInfraction(formData).subscribe({
      next: (response) => {
        console.log('Infracción registrada con éxito:', response);
        this.openSnackBar('Infracción registrada con éxito');
      },
      error: (error) => {
        console.error('Error al registrar la infracción:', error);
        this.openSnackBar('Error al registrar la infracción');
      }
    });
  }


  // Formatear fecha y hora
  formatDate(date: Date): string {
    return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
  }

  formatTime(date: Date): string {
    return ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
    });
  }
}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { DataService } from '../data.service';
import { SharedService } from '../shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-infraction',
  templateUrl: './infraction.component.html',
  styleUrls: ['./infraction.component.css']
})
export class InfractionComponent implements OnInit {
  isCameraVisible: boolean = false;

  @ViewChild('cameraPreview', { static: true }) cameraPreview!: ElementRef<HTMLVideoElement>;
  @ViewChild('photoCanvas', { static: true }) photoCanvas!: ElementRef<HTMLCanvasElement>;

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


  constructor(private _formBuilder: FormBuilder, private dataService: DataService, private sharedService: SharedService, private snackBar: MatSnackBar, private sanitizer: DomSanitizer) {}

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

    // Código para inicializar la cámara al cargar el componente

  }

  onImageUpload(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;

    // Verificar si hay más de 6 imágenes
    if (this.images.length >= 6) {
      console.log('Ya se han agregado 6 imágenes. No se pueden agregar más.');
      return;
    }

    if (fileList) {
      for (let i = 0; i < fileList.length; i++) {
        if (this.images.length + i < 6) { // Verificar que el total de imágenes no exceda 6
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.images.push(e.target.result);
          };
          reader.readAsDataURL(fileList[i]);
        } else {
          console.log('Ya se han agregado 6 imágenes. No se pueden agregar más.');
          break;
        }
      }
    }
  }


  capturePhoto(): void {
    const video = this.cameraPreview.nativeElement;
    const canvas = this.photoCanvas.nativeElement;
    const context = canvas.getContext('2d');

    if (video && context) {
      // Ajustar el tamaño del canvas al tamaño del video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Dibujar el frame actual del video en el canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Obtener la imagen en formato base64 desde el canvas
      const imageData = canvas.toDataURL('image/jpeg');

      // Agregar la imagen capturada al array de imágenes
      this.images.push(imageData);

      // Limitar la cantidad de imágenes a 6
      if (this.images.length > 6) {
        this.images = this.images.slice(0, 6);
      }
    } else {
      console.error('El elemento de video o el contexto del canvas no están disponibles.');
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
  showCameraPreview: boolean = false;

  toggleCameraPreview() {
    this.showCameraPreview = !this.showCameraPreview;
    this.isCameraVisible = this.showCameraPreview; // Actualiza la propiedad isCameraVisible

    if (this.showCameraPreview) {
      this.openCamera();
    } else {
      // Detener el video y limpiar la fuente del objeto de la cámara
      const video = this.cameraPreview.nativeElement;
      if (video.srcObject) {
        const stream = video.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        video.srcObject = null;
      }
    }
  }


  openCamera() {
    // Verificar si el navegador admite la API de medios
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Obtener la referencia al elemento de video
      const video = this.cameraPreview.nativeElement;

      // Solicitar acceso a la cámara
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          // Asignar el flujo de la cámara al elemento de video
          video.srcObject = stream;
        })
        .catch((error) => {
          // Manejar errores de acceso a la cámara
          console.error('Error al acceder a la cámara:', error);
        });
    } else {
      console.error('El navegador no admite la API de medios.');
    }
  }
}

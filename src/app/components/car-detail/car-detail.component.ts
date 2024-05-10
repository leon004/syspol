import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfractionService } from '../../services/infraction.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  infractionId!: number;
  infractionDetails: any;
  images: string[] = [];
  selectedImageIndex: number = 0;

  constructor(private route: ActivatedRoute, private infractionService: InfractionService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.infractionId = +params['id']; // Convierte el parámetro 'id' a número
      this.loadInfractionDetails();
    });
  }

  loadInfractionDetails() {
    this.infractionService.getInfractionById(this.infractionId).subscribe(
      (data: any) => {
        this.infractionDetails = data;
        // Suponiendo que el backend devuelve un campo 'imagenes' que es un arreglo de URLs de imágenes
        this.images = this.infractionDetails.imagenes.split(',').map((url: string) => url.trim());
       
      },
      (error) => {
        console.error('Error fetching infraction details:', error);
        // Maneja el error adecuadamente, como mostrar un mensaje al usuario
      }
    );
  }
  selectImage(index: number) {
    this.selectedImageIndex = index;
  }
}

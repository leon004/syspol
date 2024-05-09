// car-detail.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent {
  
  images = [
    'assets/images/Sentra/sentra1.jpeg',
    'assets/images/Sentra/sentra2.jpeg',
    'assets/images/Sentra/sentra3.jpeg'
  ];
  selectedImage: string = this.images[0];
  currentIndex: number = 0;

  selectImage(image: string) {
    this.selectedImage = image;
    this.currentIndex = this.images.indexOf(image);
  }
  
}

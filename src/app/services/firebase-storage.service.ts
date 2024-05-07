import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { from, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {
  constructor(private storage: AngularFireStorage) {}

  uploadImage(file: File, path: string) {
    const filePath = `${path}/${Date.now()}_${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    return from(task).pipe(
      switchMap(() => fileRef.getDownloadURL()) // Solo obtener la URL después de que la carga se haya completado
    );
  }
}

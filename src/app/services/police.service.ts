import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PoliceService {
  private baseUrl = 'http://localhost:3000/api/infractions';  // Ajusta según tu configuración

  constructor(private http: HttpClient) { }

  createInfraction(infractionData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post(this.baseUrl, infractionData, { headers });
  }
}

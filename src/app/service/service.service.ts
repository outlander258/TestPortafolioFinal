import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  // Cambiar la dirección IP a la de Hamachi
  path: string = 'http://25.3.61.250:3000/api/';

  consulta() {
    return this.http.get(this.path + 'Directores');
  }
}

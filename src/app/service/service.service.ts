import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ModelLog } from '../modelo/ModelLog';
import { Observable, map } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  URL = 'https://wgqabsxfjotmucmfjqtn.supabase.co/rest/v1/';

  constructor(private http: HttpClient) { }


  header = new HttpHeaders()
    .set('apikey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndncWFic3hmam90bXVjbWZqcXRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ3NjUwNzMsImV4cCI6MjAzMDM0MTA3M30.5i8-v2LiWpbqJLOhR64w0kBSvx4Mh8aSi_UBKCl__nk')


  // select de todos los usuarios
  getDatos(): any {
    return this.http.get(this.URL + 'usuario?select=*', { headers: this.header });

  }
 // retorna elementos de la base de datos como primer nombre, emial, tipo_user y contraseña
 getLogin(UserLogin: ModelLog): Observable<ModelLog> {
  console.log('UserLogin.email:', UserLogin.email);
  console.log('UserLogin.contraseña:', UserLogin.contraseña);
  console.log('URL:', this.URL);

  return this.http.get<ModelLog[]>(this.URL + 'usuario?select=primer_nombre, email ,tipo_usuario, contraseña&email=eq.' + UserLogin.email + '&contraseña=eq.'  + UserLogin.contraseña, { headers: this.header, responseType: 'json' }).pipe(
    map((userInfo) => {
      return userInfo[0];
    }));
  }

 // base para crear nuevos usuarios 
  addUser(newUser: ModelLog): Observable<ModelLog> {
    console.log('New User:', newUser);
  
    return this.http.post<ModelLog>(this.URL + 'usuario', newUser, { headers: this.header, responseType: 'json' });
  }
  







  }


  }

}


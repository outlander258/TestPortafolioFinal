import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModelLog } from '../modelo/ModelLog';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { Travel } from '../modelo/Travel';  // Asegúrate de importar la interfaz Travel
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  URL = 'https://wgqabsxfjotmucmfjqtn.supabase.co/rest/v1/';

  constructor(private http: HttpClient) { }


  header = new HttpHeaders()
    .set('apikey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndncWFic3hmam90bXVjbWZqcXRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ3NjUwNzMsImV4cCI6MjAzMDM0MTA3M30.5i8-v2LiWpbqJLOhR64w0kBSvx4Mh8aSi_UBKCl__nk')

    private solicitudSubject = new Subject<{ conductorId: number, viaje: Travel }>();






    

  // select de todos los usuarios
  getDatos(): Observable<any> {
    return this.http.get<any[]>(`${this.URL}usuario?select=*`, { headers: this.header });
  }

  // retorna elementos de la base de datos como primer nombre, emial, tipo_user y contraseña
  getLogin(UserLogin: ModelLog): Observable<ModelLog> {
    console.log('UserLogin.email:', UserLogin.email);
    console.log('UserLogin.contraseña:', UserLogin.contraseña);
    console.log('URL:', this.URL);

    return this.http.get<ModelLog[]>(this.URL + 'usuario?select=id,primer_nombre,segundo_nombre,primer_apellido,segundo_apellido,telefono,email,verificado,tipo_usuario,contraseña&email=eq.' + UserLogin.email + '&contraseña=eq.' + UserLogin.contraseña, { headers: this.header, responseType: 'json' }).pipe(
        map((userInfo) => {
            return userInfo[0];
        }));
}

  // base para crear nuevos usuarios 
  addUser(newUser: ModelLog): Observable<ModelLog> {
    console.log('New User:', newUser);

    return this.http.post<ModelLog>(this.URL + 'usuario', newUser, { headers: this.header, responseType: 'json' });
  }

  getConductorVerificado() {
    return this.http.get(this.URL + 'usuario?select=id,primer_nombre,primer_apellido,telefono&tipo_usuario=eq.2&verificado=eq.TRUE', { headers: this.header });
  }


  UpdateDatos(id: number, newUser: any): void {
    this.http.patch(this.URL+'usuario?id=eq.'+id, newUser, { headers: this.header }).subscribe(response => {
      console.log('Registro actualizado:', response);
    }, error => {
      console.error('Error al actualizar el registro:', error);
    });
  }

  conductorDisponible(datos: any) {
    return this.http.post(this.URL + 'conductor_activo', datos, { headers: this.header })
      .toPromise()
      .then(response => {
        console.log('Conductor disponible:', response);
        return response;
      })
      .catch(error => {
        console.error('Error al activar conductor:', error);
        throw error;
      });
  }
  
  conductorNoDisponible(id: any) {
    return this.http.delete(this.URL + 'conductor_activo?id=eq.' + id, { headers: this.header })
      .toPromise()
      .then(response => {
        console.log('Conductor no disponible:', response);
        console.log(id)
        return response;
      })
      .catch(error => {
        console.error('Error al desactivar conductor:', error);
        throw error;
      });


      
  }

  getConductorDisponible(): Observable<any> {
    return this.http.get(this.URL + 'conductor_activo?select=id,usuario:usuario(id,primer_nombre,segundo_nombre,telefono)', { headers: this.header })
      .pipe(
        map((data: any) => {
          const conductores = data.map((item: any) => {
            return {
              id: item.id,
              usuario: item.usuario
            };
          });
          return conductores;
        })
      );
  }

  updateVerificado(userId: Number, verificado: boolean): Observable<any> {
    const body = { verificado: verificado };
    return this.http.patch<any>(`${this.URL}usuario?id=eq.${userId}`, body, { headers: this.header });
  }


// fecha y hora en tiempo real
  getDateTime(): Observable<Date> {
    return interval(1000).pipe(
      map(() => new Date())
    );
  }





 // Registro de un viaje
 registrarViaje(viaje: any): Observable<any> {
  return this.http.post(`${this.URL}viaje`, viaje, { headers: this.header });
}


enviarSolicitud(conductorId: number, viaje: Travel): Observable<any> {
  // Simular el envío de la solicitud al conductor en tiempo real
  // Puedes usar un subject o un método similar para notificar al conductor
  return new Observable(observer => {
    setTimeout(() => {
      observer.next({ success: true });
      observer.complete();
    }, 1000);
  });
}


mostrarPopupSolicitud(conductorId: number, viaje: Travel) {
  this.solicitudSubject.next({ conductorId, viaje });
}

getSolicitudSubject(): Observable<{ conductorId: number, viaje: Travel }> {
  return this.solicitudSubject.asObservable();
}


solicitarViaje(conductorId: number, viaje: Travel): Observable<any> {
  return this.http.post(`${this.URL}viaje`, viaje, { headers: this.header });
}




actualizarViaje(viaje: Travel): Observable<any> {
  return this.http.patch(`${this.URL}viaje?id=eq.${viaje.id}`, viaje, { headers: this.header });
}





}











 





























































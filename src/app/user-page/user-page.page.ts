import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ServiceService } from '../service/service.service';
import { ModelLog } from '../modelo/ModelLog';
import { ActivatedRoute } from '@angular/router';

interface ConductorActivo {
  id: number;
  usuario: {
    primer_nombre: string;
    segundo_nombre?: string;
    telefono: string;
  };
}

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.page.html',
  styleUrls: ['./user-page.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class UserPagePage implements OnInit {
  fechaHora: Date | undefined;
  primerNombre: string = '';
  primerApellido: string = '';
  modalConductor = false;


  conductores: ConductorActivo[] = [];
  busquedaConductor: string = '';
  busquedaRealizada: boolean = false;
  resultadoBusqueda: ConductorActivo[] = [];
 

  constructor(private router: Router, private servicio: ServiceService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.servicio.getDateTime().subscribe( dateTime =>{
      this.fechaHora= dateTime
    })
    





    this.route.queryParams.subscribe(params => {
      this.primerNombre = params['primerNombre'];
      this.primerApellido = params['primerApellido'];
      console.log(params);
      console.log(this.primerNombre);
      console.log(this.primerApellido);
    });

    this.getConductoresDisponibles();

    // vista solo accesible para tipo_usuario = 3
    const userStorage = localStorage.getItem('tipo_usuario');
    if (userStorage !== 'USER') {
      this.router.navigate(['/login']);

    }


    this.getDrivers();



  }


  getDrivers() {
    this.servicio.getDatos().subscribe((data: any[]) => {
      this.conductores = data.filter(user => user.tipo_usuario === 2); // Cambiado a 2
      console.log('Conductores:', this.conductores);
    }, (error: any) => {
      console.error('Error al obtener los usuarios:', error);
    });
  }







  logout() {
    this.router.navigate(['login']);
  }

  getConductoresDisponibles() {
    this.servicio.getConductorDisponible().subscribe(
      (data: ConductorActivo[]) => {
        this.conductores = data;
        console.log('Conductores disponibles:', this.conductores);
      },
      (error) => {
        console.error('Error al obtener los conductores disponibles:', error);
      }
    );
  }

  setOpenModalConductor(isOpen: boolean) {
    this.modalConductor = isOpen;
    if (isOpen) {
      this.getConductoresDisponibles();
    }
  }

  buscarConductor() {
    this.busquedaRealizada = true;
    
    if (!this.busquedaConductor.trim()) {
      this.resultadoBusqueda = [];
      return;
    }
    
    console.log('Buscar conductor:', this.busquedaConductor);
  
    // Buscar entre los conductores activos y disponibles
    let conductorActivo = this.conductores.find(conductor => 
      conductor.usuario.primer_nombre.toLowerCase().includes(this.busquedaConductor.toLowerCase())
    );
  
    if (conductorActivo) {
      // Si se encuentra un conductor activo, mostrarlo en los resultados de búsqueda y detener la función
      this.resultadoBusqueda = [conductorActivo];
      console.log('Conductor activo encontrado:', conductorActivo);
      return;
    }
  
    // Buscar entre todos los conductores en la base de datos
    this.servicio.getDatos().subscribe((data: any[]) => {
      let conductorInactivo = data.find(conductor => 
        conductor.primer_nombre.toLowerCase().includes(this.busquedaConductor.toLowerCase())
      );
  
      if (conductorInactivo) {
        // Si se encuentra un conductor inactivo, mostrar el popup correspondiente
        console.log('Conductor inactivo encontrado:', conductorInactivo);
        // Lógica para mostrar el popup
      } else {
        console.log('El conductor que buscas no está disponible o no existe');
      }
    }, (error: any) => {
      console.error('Error al obtener los usuarios:', error);
    });
  }
}



 


 













  










  
  
  
  



  


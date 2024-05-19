import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ServiceService } from '../service/service.service';
import { ModelLog } from '../modelo/ModelLog';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.page.html',
  styleUrls: ['./user-page.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class UserPagePage implements OnInit {
  primerNombre: string = '';
  primerApellido: string = '';

  modalConductor=false

  conductores:ModelLog[]=[]

  constructor( private router : Router, private servicio:ServiceService , private route : ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.primerNombre = params['primerNombre'];
      this.primerApellido = params['primerApellido'];
      console.log(params);
      console.log(this.primerNombre);
      console.log(this.primerApellido);
    });









    this.getConductores()

    // vista solo accesible para tipo_usuario = 3

    const userStorage = localStorage.getItem('tipo_usuario');

    if (userStorage !== 'USER') {
      this.router.navigate(['/login']);


     


  }
}

  logout(){
    this.router.navigate(['login'])

  }

  async setOpenModalConductor(modal:boolean){
    this.modalConductor=modal
  }

  async getConductores() {
    this.servicio.getConductorVerificado().subscribe((conductores: any) => {
      console.log('Datos obtenidos', conductores);

      // Filtrar los conductores por disponibilidad
      const conductoresDisponibles = conductores.filter((conductor: any) => {
        const disponibilidad = JSON.parse(localStorage.getItem(`availability_${conductor.id}`) || 'false');
        console.log(this.conductores)
        return disponibilidad && conductor.verificado;
        

      });

      // Formatear los números de teléfono
      conductoresDisponibles.forEach((conductor: any) => {
        conductor.telefono = '+56-9' + conductor.telefono.toString().slice(-8);
         // Obtener los últimos 8 dígitos del número de teléfono
         console.log(conductoresDisponibles)
      });

      this.conductores = conductoresDisponibles; // Asignar los conductores disponibles a la variable conductores
    }, (error: any) => {
      console.log('Error al obtener los datos', error);
    });
  }
}
 
    







  










  
  
  
  



  


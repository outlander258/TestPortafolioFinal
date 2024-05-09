import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ServiceService } from '../service/service.service';
import { ModelLog } from '../modelo/ModelLog';


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.page.html',
  styleUrls: ['./user-page.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class UserPagePage implements OnInit {
  modalConductor=false

  conductores:ModelLog[]=[]

  constructor( private router : Router, private servicio:ServiceService) { }

  ngOnInit() {
    this.getConductores()
  }

  logout(){
    this.router.navigate(['login'])

  }

  async setOpenModalConductor(modal:boolean){
    this.modalConductor=modal
  }


  async getConductores(){
    this.servicio.getConductorVerificado().subscribe((conductores: any) => {
      console.log('Datos obtenidos', conductores);
      // Formatear los números de teléfono
      conductores.forEach((conductor: any) => {
        conductor.telefono = '+56-9' + conductor.telefono.toString().slice(-8); // Obtener los últimos 8 dígitos del número de teléfono
      });
      this.conductores = conductores; // Asignar los conductores obtenidos a la variable conductores
    }, (error: any) => {
      console.log('Error al obtener los datos', error);
    });
  }
  
  
  
  



  
}

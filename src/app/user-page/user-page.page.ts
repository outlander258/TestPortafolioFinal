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



    this.getConductoresDisponibles();




 

    // vista solo accesible para tipo_usuario = 3

    const userStorage = localStorage.getItem('tipo_usuario');

    if (userStorage !== 'USER') {
      this.router.navigate(['/login']);


     


  }
}

  logout(){
    this.router.navigate(['login'])

  }


 


  getConductoresDisponibles() {
    this.servicio.getConductorDisponible().subscribe(
      (data: any[]) => {
        this.conductores = data;
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
}














 
    







  










  
  
  
  



  


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

// variables para almacenar los datos del conductor
primerNombre: string = '';
primerApellido: string = '';
segundoNombre: string = '';
segundoApellido: string = '';
telefono: string = '';
id: number | undefined;

//variables para insertar nuevos datos modificados
new_primerNombre: string = '';
new_primerApellido: string = '';
new_segundoNombre: string = '';
new_segundoApellido: string = '';
new_telefono: string = '';

// variables para modal
isModalModificarDatosOpen: boolean = false;


  modalConductor=false

  conductores:ModelLog[]=[]

  constructor( 
    private router : Router,
     private servicio:ServiceService , 
     private route : ActivatedRoute,

    ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.primerNombre = params['primerNombre'];
      this.primerApellido = params['primerApellido'];
      this.segundoNombre = params['segundoNombre'];
      this.segundoApellido = params['segundoApellido'];
      this.telefono = params['telefono'];
      this.id = params['id'];
  
    });


    this.new_primerNombre = this.primerNombre;
    this.new_primerApellido = this.primerApellido;
    this.new_segundoNombre = this.segundoNombre;
    this.new_segundoApellido = this.segundoApellido;
    this.new_telefono = this.telefono;
  






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
  
  setModalModificarDatosOpen(estado: boolean) {
    this.isModalModificarDatosOpen = estado;
  }

  modificarDatos() {
    const new_datos = {
      primer_nombre: this.new_primerNombre,
      segundo_nombre: this.new_segundoNombre,
      primer_apellido: this.new_primerApellido,
      segundo_apellido: this.new_segundoApellido,
      telefono: this.new_telefono
    };

    this.servicio.UpdateDatos(this.id!, new_datos);
    this.setModalModificarDatosOpen(false);
  }
  



  
}

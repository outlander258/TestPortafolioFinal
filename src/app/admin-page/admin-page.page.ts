import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.page.html',
  styleUrls: ['./admin-page.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AdminPagePage implements OnInit {
  primerNombre: string = '';
  primerApellido: string = '';
  conductores: any[] = [];
  solicitantes: any[] = [];
  // Lista de conductores (esto es solo un ejemplo, necesitarás obtener la lista de conductores de tu base de datos)
  drivers = [
    { nombre: 'Conductor 1', apellido: 'Apellido 1', bloqueado: false },
    { nombre: 'Conductor 2', apellido: 'Apellido 2', bloqueado: false },
    // Agrega más conductores aquí
  ];

  // Variable para controlar si se muestra la lista de conductores
  showDrivers = false;

  // Lista de usuarios (esto es solo un ejemplo, necesitarás obtener la lista de usuarios de tu base de datos)
users = [
  { nombre: 'Usuario 1', apellido: 'Apellido 1', bloqueado: false },
  { nombre: 'Usuario 2', apellido: 'Apellido 2', bloqueado: false },
  // Agrega más usuarios aquí
];

// Variable para controlar si se muestra la lista de usuarios
showUsers = false;

  constructor( private router : Router ,private route : ActivatedRoute, private servicio : ServiceService) { }

  ngOnInit() {

    this.getSolicitantes();
   


    this.getDrivers();






  
    this.route.queryParams.subscribe(params => {
      this.primerNombre = params['primerNombre'];
      this.primerApellido = params['primerApellido'];
      console.log(params);
      console.log(this.primerNombre);
      console.log(this.primerApellido);
    });






    // vista solo accesible para tipo_usuario = 3

    const userStorage = localStorage.getItem('tipo_usuario');

    if (userStorage !== 'ADMIN') {
      this.router.navigate(['/login']);
  



  }
}

  // Método para bloquear un conductor
  blockDriver(driver: { nombre: string, apellido: string, bloqueado: boolean }) {
    console.log('Bloquear conductor:', driver.nombre);
    driver.bloqueado = true;
    // Aquí necesitarás agregar el código para bloquear el conductor en tu base de datos
  }

  // Método para desbloquear un conductor
  unblockDriver(driver: { nombre: string, apellido: string, bloqueado: boolean }) {
    console.log('Desbloquear conductor:', driver.nombre);
    driver.bloqueado = false;
    // Aquí necesitarás agregar el código para desbloquear el conductor en tu base de datos
  }

  // Método para bloquear un usuario
blockUser(user: { nombre: string, apellido: string, bloqueado: boolean }) {
  console.log('Bloquear usuario:', user.nombre);
  user.bloqueado = true;
  // Aquí necesitarás agregar el código para bloquear el usuario en tu base de datos
}

// Método para desbloquear un usuario
unblockUser(user: { nombre: string, apellido: string, bloqueado: boolean }) {
  console.log('Desbloquear usuario:', user.nombre);
  user.bloqueado = false;
  // Aquí necesitarás agregar el código para desbloquear el usuario en tu base de datos
}

  // Método para mostrar u ocultar la lista de conductores
  toggleShowDrivers() {
    this.showDrivers = !this.showDrivers;
  }

  // Método para mostrar u ocultar la lista de usuarios
toggleShowUsers() {
  this.showUsers = !this.showUsers;
}

  logout(){
    this.router.navigate(['login'])
  }


  getSolicitantes() {
    this.servicio.getDatos().subscribe((data: any[]) => {
      this.solicitantes = data.filter(user => user.tipo_usuario === 3); // Cambiado a 3
      console.log('Solicitantes:', this.solicitantes);
    }, (error: any) => {
      console.error('Error al obtener los usuarios:', error);
    });
  }

  getDrivers() {
    this.servicio.getDatos().subscribe((data: any[]) => {
      this.conductores = data.filter(user => user.tipo_usuario === 2); // Cambiado a 2
      console.log('Conductores:', this.conductores);
    }, (error: any) => {
      console.error('Error al obtener los usuarios:', error);
    });
  }



  }






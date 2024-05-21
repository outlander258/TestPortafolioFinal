import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-driver-page',
  templateUrl: './driver-page.page.html',
  styleUrls: ['./driver-page.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DriverPagePage implements OnInit {
  primerNombre: string = '';
  primerApellido: string = '';
  idConductor : number | undefined;
  isAvailable: boolean = true;

  constructor(private router: Router, private toastController: ToastController, private route: ActivatedRoute, private servicio :ServiceService) { }

  ngOnInit() {






    // Recuperar la disponibilidad del conductor desde localStorage

    const storedAvailability = localStorage.getItem('isAvailable');
    if (storedAvailability !== null) {
      this.isAvailable = JSON.parse(storedAvailability);
    }

    // vista solo accesible para tipo_usuario = 2
    const userStorage = localStorage.getItem('tipo_usuario');
    if (userStorage !== 'DRIVER') {
      this.router.navigate(['/login']);
    }

    this.route.queryParams.subscribe(params => {
      this.primerNombre = params['primerNombre'] || this.primerNombre;
      this.primerApellido = params['primerApellido'] || this.primerApellido;
      this.idConductor = params['idUser'] || this.idConductor;


      console.log(params);
      console.log(this.primerNombre);
      console.log(this.primerApellido);
      console.log(this.idConductor);

    });
  


  }

  ngAfterViewInit() {}

  // Variable para almacenar el contenido del card
  cardContent: string = "Añade una breve descripción de tu experiencia como conductor.";

  toggleAvailability(event: CustomEvent) {
    this.isAvailable = event.detail.checked;
    console.log(this.isAvailable)
    if(this.isAvailable === true){
      console.log("Verdad")
      const datos ={
        id : this.idConductor
      }
      this.servicio.conductorDisponible(datos);
    }
    if(this.isAvailable===false){
      console.log("mentira")
      this.servicio.conductorNoDisponible(this.idConductor);

    }
   
  }
  // Método para mostrar un toast
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000
    });
    toast.present();
  }

  logout() {
    this.router.navigate(['login']);
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';




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
  // Variable para almacenar el estado de disponibilidad del conductor
  isAvailable: boolean = true;

  constructor(private router: Router, private toastController: ToastController, private route : ActivatedRoute) { }

  ngOnInit() {





    // vista solo accesible para tipo_usuario = 2

    const userStorage = localStorage.getItem('tipo_usuario');

    if (userStorage !== 'DRIVER') {
      this.router.navigate(['/login']);

  }

   
  this.route.queryParams.subscribe(params => {
    this.primerNombre = params['primerNombre'];
    this.primerApellido = params['primerApellido'];
    console.log(params);
    console.log(this.primerNombre);
    console.log(this.primerApellido);
  });







}


ngAfterViewInit() {

}

  // Variable para almacenar el contenido del card
cardContent: string = "Añade una breve descripción de tu experiencia como conductor.";


  // Método para manejar los cambios de estado del botón
  toggleAvailability(event: CustomEvent) {
    this.isAvailable = event.detail.checked;
    const message = this.isAvailable ? 'Estás disponible para trabajar' : 'Ya no estás disponible para trabajar';
    this.presentToast(message);
  }

  // Método para mostrar un toast
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000
    });
    toast.present();
  }

  logout(){
    this.router.navigate(['login'])
  }
}

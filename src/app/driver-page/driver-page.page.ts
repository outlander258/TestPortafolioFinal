import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ModelLog } from '../modelo/ModelLog';
import { ServiceService } from '../service/service.service';





@Component({
  selector: 'app-driver-page',
  templateUrl: './driver-page.page.html',
  styleUrls: ['./driver-page.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DriverPagePage implements OnInit {
  solicitudPendiente: any = null;
  fechaHora : Date | undefined;

  // Variable para almacenar el estado de disponibilidad del conductor
  isAvailable: boolean = true;
  idConductor:number = 0;







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










  constructor(
    private router: Router,
    private toastController: ToastController,
    private route: ActivatedRoute,
    private servicio: ServiceService

  ) { }

  ngOnInit() {
    this.servicio.getDateTime().subscribe( dateTime =>{
      this.fechaHora= dateTime
    })

    this.servicio.getRequestObservable().subscribe(solicitud =>{
      if(solicitud){
        this.solicitudPendiente = solicitud;
        this.showSolicitudPopup;

      }
    })


  





  
   


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



    this.route.queryParams.subscribe(params => {
      this.primerNombre = params['primerNombre'];
      this.primerApellido = params['primerApellido'];
      this.segundoNombre = params['segundoNombre'];
      this.segundoApellido = params['segundoApellido'];
      this.telefono = params['telefono'];
      this.id = params['id'];
      this.idConductor = params['id'];
  
      console.log(params);
      console.log(this.primerNombre);
      console.log(this.primerApellido);
      console.log(this.segundoNombre);
      console.log(this.segundoApellido);
      console.log(this.telefono);
      console.log(this.id);
    });
  
    // asignacion de variables para cambion en caso de no ingresar dato nuevo
  
    this.new_primerNombre = this.primerNombre;
    this.new_primerApellido = this.primerApellido;
    this.new_segundoNombre = this.segundoNombre;
    this.new_segundoApellido = this.segundoApellido;
    this.new_telefono = this.telefono;
  


  


  };







ngAfterViewInit() {

}

  // Variable para almacenar el contenido del card
  cardContent: string = "Añade una breve descripción de tu experiencia como conductor.";

  toggleAvailability(event: CustomEvent) {
    this.isAvailable = event.detail.checked;
    console.log(this.isAvailable)
    if(this.isAvailable === true){
      console.log("Verdad", this.idConductor)

      const datos ={
        id : this.idConductor
      }
      console.log(datos)
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


  aceptarSolicitud() {
    // Aquí puedes implementar la lógica para aceptar la solicitud
    console.log('Solicitud aceptada');
    // Si necesitas realizar alguna acción, puedes hacerlo aquí
  
    // Una vez aceptada la solicitud, oculta el popup
    this.solicitudPendiente = null;
  }
  
  rechazarSolicitud() {
    console.log('Solicitud rechazada');
    this.solicitudPendiente = null;
  
    // Aquí puedes añadir la lógica para eliminar la solicitud del almacenamiento local o base de datos
    this.servicio.eliminarSolicitud(this.idConductor);
  }
  showSolicitudPopup() {
    if (this.solicitudPendiente) {
      // Lógica para mostrar el pop-up en la interfaz de usuario
      alert(`Solicitud de ${this.solicitudPendiente.nombre} ${this.solicitudPendiente.apellido}`);
    }
  }








}

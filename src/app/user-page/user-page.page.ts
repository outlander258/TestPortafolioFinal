import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ServiceService } from '../service/service.service';
import { ModelLog } from '../modelo/ModelLog';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

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

  private requestSubject = new BehaviorSubject<any>(null);
  fechaHora: Date | undefined;
  userID : number | undefined;



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
  isModalSolicitudViajeOpen: boolean = false;
  showInputConductor = false
  showInputAgendamiento = false



  modalConductor = false;


  conductores: ConductorActivo[] = [];
  busquedaConductor: string = '';
  busquedaRealizada: boolean = false;
  resultadoBusqueda: ConductorActivo[] = [];
  conductorInactivo: boolean = false;
  conductorNoEncontrado: boolean = false;
  conductorInactivoDetalles: any = null;






  constructor(
    private router: Router,
    private servicio: ServiceService,
    private route: ActivatedRoute,
    private alertController: AlertController,
  ) { }



  ngOnInit() {
    this.servicio.getDateTime().subscribe( dateTime =>{
      this.fechaHora= dateTime
    })


    





    this.route.queryParams.subscribe(params => {
      this.primerNombre = params['primerNombre'];
      this.primerApellido = params['primerApellido'];
      this.userID = params['id']
      console.log(params);
      console.log(this.primerNombre);
      console.log(this.primerApellido);
      console.log(this.userID);
      this.segundoNombre = params['segundoNombre'];
      this.segundoApellido = params['segundoApellido'];
      this.telefono = params['telefono'];
      this.id = params['id'];

    });

    this.getConductoresDisponibles();


    this.new_primerNombre = this.primerNombre;
    this.new_primerApellido = this.primerApellido;
    this.new_segundoNombre = this.segundoNombre;
    this.new_segundoApellido = this.segundoApellido;
    this.new_telefono = this.telefono;


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
      (data: any[]) => {
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
    // Limpiar resultados de búsqueda anteriores
    this.resultadoBusqueda = [];
    this.busquedaRealizada = true;
    this.conductorInactivo = false;
    this.conductorNoEncontrado = false;
    this.conductorInactivoDetalles = null;


    if (!this.busquedaConductor.trim()) {
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
        // Si se encuentra un conductor inactivo, mostrar los datos relevantes en el HTML
        console.log('Conductor inactivo encontrado:', conductorInactivo);
        this.conductorInactivo = true;
        this.conductorInactivoDetalles = conductorInactivo;
      } else {
        console.log('El conductor que buscas no está disponible o no existe');
        this.conductorNoEncontrado = true;
      }
    }, (error: any) => {
      console.error('Error al obtener los usuarios:', error);
    });
  }










  
  solicitarConductor(conductorId: number) {
    // Obtener los datos del usuario solicitante
    const solicitante = {
      id: this.userID,
      nombre: this.primerNombre,
      apellido: this.primerApellido,
      conductor_id: conductorId,
      fecha : this.fechaHora
    };
  
    // Llamar al método del servicio para enviar la solicitud
    this.servicio.enviarSolicitud(solicitante) // Emitir evento de solicitud
  
    // Mostrar en consola (opcional, para depuración)
    console.log('Solicitud enviada al conductor:', solicitante);
  }





  toggleAgendamiento(event: any) {
    this.showInputAgendamiento = event
  }

  toggleConductor(event: any) {
    this.showInputConductor = event.detail.checked;
  }


  setModalSolicitudViaje(estado: boolean) {
    this.isModalSolicitudViajeOpen = estado
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
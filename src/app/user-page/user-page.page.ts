import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ServiceService } from '../service/service.service';
import { ActivatedRoute } from '@angular/router';
import { Travel } from '../modelo/Travel';  // Asegúrate de importar la interfaz Travel



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
  showInputConductor = false;
  showInputAgendamiento = false;
  modalConductor = false;

  conductores: ConductorActivo[] = [];
  busquedaConductor: string = '';
  busquedaRealizada: boolean = false;
  resultadoBusqueda: ConductorActivo[] = [];
  conductorInactivo: boolean = false;
  conductorNoEncontrado: boolean = false;
  conductorInactivoDetalles: any = null;
  conductorSeleccionado: ConductorActivo | undefined;
  


   // variables para el nuevo viaje
   origen: string = '';
   destino: string = '';
   tarifa: number = 0;
   fechaSeleccionada='';

  isLoading: boolean = true; // Variable para el estado de carga

  constructor(
    private router: Router,
    private servicio: ServiceService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.servicio.getDateTime().subscribe(dateTime => {
      this.fechaHora = dateTime;
    });

    this.route.queryParams.subscribe(params => {
      this.primerNombre = params['primerNombre'];
      this.primerApellido = params['primerApellido'];
      this.userID = params['id'];
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

    const userStorage = localStorage.getItem('tipo_usuario');
    if (userStorage !== 'USER') {
      this.router.navigate(['/login']);
    }
  }


  getConductoresDisponibles() {
    this.isLoading = true; // Inicia el estado de carga
    this.servicio.getConductorDisponible().subscribe(
      (data: ConductorActivo[]) => {
        this.conductores = data;
        this.isLoading = false; // Termina el estado de carga
        console.log('Conductores disponibles:', this.conductores);
      },
      (error) => {
        console.error('Error al obtener los conductores disponibles:', error);
        this.isLoading = false; // Termina el estado de carga incluso si hay un error
      }
    );
  }

  setOpenModalConductor(isOpen: boolean) {
    if (!this.isLoading) {
      this.modalConductor = isOpen;
    }
  }

  buscarConductor() {
    this.busquedaRealizada = true;
    this.conductorInactivo = false;
    this.conductorNoEncontrado = false;
    this.conductorInactivoDetalles = null;

    if (!this.busquedaConductor.trim()) {
      this.resultadoBusqueda = [];
      return;
    }

    console.log('Buscar conductor:', this.busquedaConductor);

    let conductorActivo = this.conductores.find(conductor =>
      conductor.usuario.primer_nombre.toLowerCase().includes(this.busquedaConductor.toLowerCase())
    );

    if (conductorActivo) {
      this.resultadoBusqueda = [conductorActivo];
      console.log('Conductor activo encontrado:', conductorActivo);
      return;
    }

    this.servicio.getDatos().subscribe((data: any[]) => {
      let conductorInactivo = data.find(conductor =>
        conductor.primer_nombre.toLowerCase().includes(this.busquedaConductor.toLowerCase())
      );

      if (conductorInactivo) {
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
  










  toggleAgendamiento(event: any) {
    this.showInputAgendamiento = event;
  }

  toggleConductor(event: any) {
    this.showInputConductor = event.detail.checked;
    if (this.showInputConductor) {
      this.getConductoresDisponibles(); // Consulta por los conductores disponibles
    } else {
      this.conductorSeleccionado = undefined; // Limpiar selección de conductor
    }
  }
  setModalSolicitudViaje(estado: boolean) {
    this.isModalSolicitudViajeOpen = estado;
    if (!estado) {
      this.origen = '';
      this.destino = '';
      this.tarifa = 0;
      this.conductorSeleccionado = undefined; // Limpiar selección de conductor
    }
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



  solicitarViaje(origen: string, destino: string) {
    if (this.conductorSeleccionado) {
        let fechaViaje: Date;

        if (this.showInputAgendamiento && this.fechaSeleccionada) {
            fechaViaje = new Date(this.fechaSeleccionada);
        } else {
            fechaViaje = new Date();
        }

        const viaje: Travel = {
            id: undefined,
            solicitante_id: this.userID,
            conductor_id: this.conductorSeleccionado.id,
            estado: 'pendiente',
            origen: origen,
            destino: destino,
            fecha: this.fechaSeleccionada,
            tarifa: this.tarifa  // Aquí se usa la tarifa ingresada por el usuario
        };

        this.servicio.solicitarViaje(this.conductorSeleccionado.id, viaje).subscribe(
            response => {
                console.log('Viaje registrado:', response);
                this.setModalSolicitudViaje(false); // Cerrar el modal después de solicitar el viaje
            },
            error => {
                console.error('Error al registrar el viaje:', error);
            }
        );
    } else {
        console.error('No hay conductor seleccionado.');
    }
}




  manejarCambioFecha(event: any) {
    const fecha = new Date(event.detail.value);
    this.fechaSeleccionada = fecha.toISOString().split('T')[0];
  }




  logout() {
    localStorage.removeItem('tipo_usuario');
    this.router.navigate(['/login']);
  }



  















}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service/service.service';
import { AlertController } from '@ionic/angular';
import { Travel } from '../modelo/Travel'





@Component({
  selector: 'app-driver-page',
  templateUrl: './driver-page.page.html',
  styleUrls: ['./driver-page.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DriverPagePage implements OnInit {
  solicitudPendiente: any = null;
  fechaHora: Date | undefined;
  licencias: any[] = []; // Nueva variable para almacenar las licencias

  // Variable para almacenar el estado de disponibilidad del conductor
  isAvailable: boolean = false;
  idConductor: number = 0;
 







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
  isModalViajeOpen: boolean = false;

  //variable para modal de viajes
  selectedTravel: Travel | null = null;








  constructor(
    private router: Router,
    private toastController: ToastController,
    private route: ActivatedRoute,
    private servicio: ServiceService,
    private alerta: AlertController,

  ) { }

  ngOnInit() {

    this.iniciarConsultaPeriodica();



    this.getLicencias();







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
  


 // Variable para almacenar el contenido del card
 cardContent: string = "Mantente disponible para poder recibir solicitudes de viajes.";




  toggleAvailability(event: CustomEvent) {
    this.isAvailable = event.detail.checked;
    console.log(this.isAvailable)
    if (this.isAvailable === true) {
      console.log("Conductor disponible", this.idConductor)

      const datos = {
        id: this.idConductor
      }
      console.log(datos)
      this.servicio.conductorDisponible(datos);
    }
    if (this.isAvailable === false) {
      console.log("Conductor no disponible", this.idConductor)
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
    this.servicio.conductorNoDisponible(this.idConductor);
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
  }
  showSolicitudPopup() {
    if (this.solicitudPendiente) {
      // Lógica para mostrar el pop-up en la interfaz de usuario
      alert(`Solicitud de ${this.solicitudPendiente.nombre} ${this.solicitudPendiente.apellido}`);
    }
  }


  iniciarConsultaPeriodica() {
    setInterval(() => {
      if (this.isAvailable) {
        console.log("consulta")
        this.consultarViajes();
      }
    }, 40000); // 40000 ms = 40 segundos
  }

  consultarViajes() {

    this.servicio.viajeEspecifico(this.idConductor).subscribe(
      (viajes: Travel[]) => {
        if (viajes.length > 0) {
          this.mostrarPopUp(viajes[0], 'Viaje Específico');
        }
      },
      error => console.error(error)
    );

    this.servicio.viajeGeneral().subscribe(
      (viajes: Travel[]) => {
        if (viajes.length > 0) {
          this.mostrarPopUp(viajes[0], 'Viaje General');
        }
      },
      error => console.error(error)
    );
  }

  async mostrarPopUp(travel: Travel, tipo: string) {
    console.log(travel)
    const alert = await this.alerta.create({
      header: `Nuevo ${tipo}`,
      subHeader: `Viaje ID: ${travel.id}`,
      message: `
        Solicitante: ${travel.solicitante_id.primer_nombre + " " + travel.solicitante_id.primer_apellido}
        Fecha: ${new Date(travel.fecha).toLocaleDateString()}
        Tarifa: ${travel.tarifa}
      `,
      buttons: [
        {
          text: 'Descartar',
          role: 'cancel'
        },
        {
          text: 'Detalles',
          handler: () => {
            this.abrirModalDetalles(travel);
          }
        }
      ]
    });
    await alert.present();
  }


  setModalviajeOpen(valor: boolean) {
    this.isModalViajeOpen = valor;
  }
  abrirModalDetalles(travel: Travel) {
    this.selectedTravel = travel;
    this.isModalViajeOpen = true;
  }

  aceptarViaje() {
    if (this.selectedTravel?.id) {
      this.servicio.updateViaje("aceptado", this.selectedTravel.id).subscribe(
        response => {
          console.log('Viaje aceptado exitosamente:', response);
          this.setModalviajeOpen(false);
  
          // Simulación de redirección a WhatsApp
          const solicitanteTelefono = this.selectedTravel?.solicitante_id?.telefono;
          const solicitanteNombre = this.selectedTravel?.solicitante_id?.primer_nombre + " " + this.selectedTravel?.solicitante_id?.primer_apellido;
          const mensaje = `Hola ${solicitanteNombre}, he aceptado tu solicitud. Nos vemos pronto.`;
          
          if (solicitanteTelefono) {
            const whatsappUrl = `https://wa.me/${solicitanteTelefono}?text=${encodeURIComponent(mensaje)}`;
            window.open(whatsappUrl, '_blank');
          } else {
            console.error('No se ha encontrado el número de teléfono del solicitante.');
          }
        },
        error => {
          console.error('Error al aceptar el viaje:', error);
          // Opcional: manejar el error (mostrar mensaje al usuario, etc.)
        }
      );
    } else {
      console.error('No se ha seleccionado ningún viaje.');
    }
  }

  cancelarViaje() {
    if (this.selectedTravel?.id) {
      this.servicio.updateViaje("cancelado", this.selectedTravel.id).subscribe(
        response => {
          console.log('Viaje cancelado exitosamente:', response);
          this.setModalviajeOpen(false);
        },
        error => {
          console.error('Error al cancelar el viaje:', error);
          // Opcional: manejar el error (mostrar mensaje al usuario, etc.)
        }
      );
    } else {
      console.error('No se ha seleccionado ningún viaje.');
    }
  }


  getLicencias(): void {
    this.servicio.getLicenciasByConductorId(this.idConductor).subscribe(
      (data) => {
        console.log(this.idConductor)
        this.licencias = data;
        console.log('Licencias obtenidas:', data);
      },
      (error) => {
        console.error('Error al obtener licencias:', error);
      }
    );
  }


















}













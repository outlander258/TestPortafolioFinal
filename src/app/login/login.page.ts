import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModelLog } from '../modelo/ModelLog';
import { ServiceService } from '../service/service.service';
import { lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {

  UserName: string = '';
  UserPassword: string = '';

  UserLogin: ModelLog = {
    id: undefined,
    primer_nombre: '',
    segundo_nombre: '',
    tipo_usuario: 0,
    primer_apellido: '',
    segundo_apellido: '',
    rut: '',
    telefono: '',
    email: '',
    contraseña: '',
    verificado: false,
  }
  public progress = 0;
  public showProgressBar = false;
  private progressInterval: any;

  constructor(private router: Router, private servicio: ServiceService, private alertController: AlertController) { }

  ngOnInit() {
  }




  async login() {
    if (this.UserName && this.UserPassword) {
      this.UserLogin.email = this.UserName!;
      this.UserLogin.contraseña = this.UserPassword!;

      const respuesta = await lastValueFrom(this.servicio.getLogin(this.UserLogin));
      if (respuesta && respuesta.email && respuesta.email.toLowerCase() === this.UserLogin.email.toLowerCase() && respuesta.contraseña === this.UserLogin.contraseña) {
        console.log('inicio de sesión exitoso')
        console.log(respuesta.primer_nombre)
        console.log(respuesta.primer_apellido)


        const queryParams = {
          primerNombre: respuesta.primer_nombre,
          primerApellido: respuesta.primer_apellido,
          segundoNombre: respuesta.segundo_nombre,
          segundoApellido: respuesta.segundo_apellido,
          telefono: respuesta.telefono,
          id: respuesta.id,


        };


        // Limpiar los campos de usuario y contraseña
        this.UserName = '';
        this.UserPassword = '';


        this.showProgressBar = true;
        this.progress = 0; // Reinicia el valor de progress
        this.startProgressBar();
        setTimeout(() => {
          this.showProgressBar = false;
          if (respuesta.tipo_usuario === 1) {
            localStorage.setItem('tipo_usuario', 'ADMIN');
            this.router.navigate(['admin-page'], { queryParams });
          } else if (respuesta.tipo_usuario === 2) {
            if (respuesta.verificado) {
              localStorage.setItem('tipo_usuario', 'DRIVER');
              this.router.navigate(['driver-page'], { queryParams });
            } else {
              this.presentAlert('No puedes acceder debido a que todavía estás en verificación para figurar como conductor de esta plataforma.');
            }
          } else if (respuesta.tipo_usuario === 3) {
            if (respuesta.verificado) {
              localStorage.setItem('tipo_usuario', 'USER');
              this.router.navigate(['user-page'], { queryParams });
            } else {
              this.presentAlert('Haz sido bloqueado de la plataforma.');
            }
          } else {
            console.log('Tipo de usuario desconocido');
          }
        }, 2000); // 2000 milisegundos = 2 segundos
      } else {
        console.log('Credenciales inválidas');
        this.presentAlert('Credenciales inválidas');
      }
    } else {
      console.log('Nombre de usuario o contraseña no válidos');
      this.presentAlert('Nombre de usuario o contraseña no válidos');
    }
  }


  startProgressBar() {
    this.progressInterval = setInterval(() => {
      this.progress += 0.01;

      if (this.progress > 1) {
        clearInterval(this.progressInterval);
      }
    }, 20);
  }

  stopProgressBar() {
    clearInterval(this.progressInterval);
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['Volver a intentar']
    });

    await alert.present();
  }

  GetBack() {
    this.router.navigate(['principal-page']);
  }
}

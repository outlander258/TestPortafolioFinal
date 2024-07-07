import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ServiceService } from '../service/service.service';
import { ModelLog } from '../modelo/ModelLog';
import { lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-register-driver',
  templateUrl: './register-driver.page.html',
  styleUrls: ['./register-driver.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RegisterDriverPage implements OnInit {
  NameDriver: string | undefined;
  secondNameDriver: string | undefined; // Añadir segundo nombre
  AppDriver: string | undefined;
  secondAppDriver: string | undefined; // Añadir segundo apellido
  RunDriver: string | undefined;
  EmailDriver: string | undefined;
  DirectDriver: string | undefined;
  PassDriver: string | undefined;
  ConfirmDriver: string | undefined;
  CelDriver: string | undefined;








  constructor(private router: Router, private servicio: ServiceService, private alertController: AlertController) { }

  ngOnInit() {

  }

  GetBack() {
    this.router.navigate(['principal-page']);
  }


  async registerDriver() {
    console.log('NameDriver:', this.NameDriver);
    console.log('AppDriver:', this.AppDriver);
    console.log('RunDriver:', this.RunDriver);
    console.log('EmailDriver:', this.EmailDriver);
    console.log('PassDriver:', this.PassDriver);
    console.log('ConfirmDriver:', this.ConfirmDriver);
    console.log('CelDriver:', this.CelDriver);
    console.log('secondNameDriver:', this.secondNameDriver);
    console.log('secondAppDriver:', this.secondAppDriver);

  


    if (
      !this.NameDriver ||
      !this.AppDriver ||
      !this.RunDriver ||
      !this.EmailDriver ||
      !this.PassDriver ||
      !this.ConfirmDriver ||
      !this.CelDriver ||
      !this.secondNameDriver || // Añadir validación para segundo nombre
      !this.secondAppDriver  // Añadir validación para segundo apellido
    ) {
      this.presentAlert('Error', 'Por favor, complete todos los campos.');
      return;
    }
  
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(this.EmailDriver)) {
      this.presentAlert('Error', 'La dirección de correo electrónico no es válida. Por favor, inténtalo de nuevo.');
      return;
    }
  
    if (!this.NameDriver.trim().length || this.NameDriver.trim().split(' ').length > 1) {
      this.presentAlert('Error', 'El primer nombre debe ser un solo nombre sin espacios.');
      return;
    }
  
    if (!this.AppDriver.trim().length || this.AppDriver.trim().split(' ').length > 1) {
      this.presentAlert('Error', 'El primer apellido debe ser un solo apellido sin espacios.');
      return;
    }
  
    if (!this.secondNameDriver.trim().length || this.secondNameDriver.trim().split(' ').length > 1) {
      this.presentAlert('Error', 'El segundo nombre debe ser un solo nombre sin espacios.');
      return;
    }
  
    if (!this.secondAppDriver.trim().length || this.secondAppDriver.trim().split(' ').length > 1) {
      this.presentAlert('Error', 'El segundo apellido debe ser un solo apellido sin espacios.');
      return;
    }
  
    const rutPattern = /^[1-9][0-9]{0,1}\.?[0-9]{3}\.?[0-9]{3}-[0-9kK]{1}$/;
    if (!this.RunDriver || !rutPattern.test(this.RunDriver)) {
      this.presentAlert('Error', 'El RUT es obligatorio y debe estar en el formato correcto (12.345.678-9).');
      return;
    }
  
    if (this.PassDriver.length < 7) {
      this.presentAlert('Error', 'La contraseña debe tener al menos 7 caracteres.');
      return;
    }
  
    if (!/[A-Z]/.test(this.PassDriver)) {
      this.presentAlert('Error', 'La contraseña debe contener al menos una mayúscula.');
      return;
    }
  
    if (!/[$&+,:;=?@#|'<>.^*()%!-]/.test(this.PassDriver)) {
      this.presentAlert('Error', 'La contraseña debe contener al menos un caracter especial.');
      return;
    }
  
    if (this.PassDriver !== this.ConfirmDriver) {
      this.presentAlert('Error', 'Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
      return;
    }
  
    const celular = Number(this.CelDriver);
    if (isNaN(celular) || celular.toString().length < 8 || celular.toString().length > 9) {
      this.presentAlert('Error', 'Asegurate de ingresar un número válido, debe contener entre 8 y 9 dígitos.');
      return;
    }
  
    const newUser: ModelLog = {
      id: undefined,
      primer_nombre: this.NameDriver,
      segundo_nombre: this.secondNameDriver, // Añadir segundo nombre
      tipo_usuario: 2, 
      primer_apellido: this.AppDriver,
      segundo_apellido: this.secondAppDriver, // Añadir segundo apellido
      rut: this.RunDriver,
      telefono: this.CelDriver,
      email: this.EmailDriver,
      contraseña: this.PassDriver,
      verificado: false,
    };
  
    try {
      const response = await lastValueFrom(this.servicio.addUser(newUser));
      console.log('Registro de usuario exitoso:', response);
      this.presentAlert('Éxito', 'Usuario registrado exitosamente');
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      this.presentAlert('Error', 'Hubo un error al registrar el usuario');
    }
  }
  
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
  }



  }

 

    





   


  

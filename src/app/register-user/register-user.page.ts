import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ServiceService } from '../service/service.service';
import { ModelLog } from '../modelo/ModelLog';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.page.html',
  styleUrls: ['./register-user.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RegisterUserPage implements OnInit {
  NameUser: string | undefined;
  AppUser: string | undefined;
  RunUser: string | undefined;
  EmailUser: string | undefined;
  PassUser: string | undefined;
  ConfirmUser: string | undefined;
  CelUser: string | undefined;

  constructor(private router: Router, private servicio: ServiceService, private alertController: AlertController) {}

  ngOnInit() {}

  async registerUser() {
    if (
      !this.NameUser ||
      !this.AppUser ||
      !this.RunUser ||
      !this.EmailUser ||
      !this.PassUser ||
      !this.ConfirmUser ||
      !this.CelUser
    ) {
      this.presentAlert('Error', 'Por favor, complete todos los campos.');
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(this.EmailUser)) {
      this.presentAlert('Error', 'La dirección de correo electrónico no es válida. Por favor, inténtalo de nuevo.');
      return;
    }

    if (!this.NameUser || this.NameUser.trim().length === 0 || this.NameUser.trim().split(' ').length > 1) {
      this.presentAlert('Error', 'El primer nombre debe ser un solo nombre sin espacios.');
      return;
    }

    if (!this.AppUser || this.AppUser.trim().length === 0 || this.AppUser.trim().split(' ').length > 1) {
      this.presentAlert('Error', 'El primer apellido debe ser un solo apellido sin espacios.');
      return;
    }

    const rutPattern = /^[1-9][0-9]{0,1}\.?[0-9]{3}\.?[0-9]{3}-[0-9kK]{1}$/;
    if (!this.RunUser || !rutPattern.test(this.RunUser)) {
      this.presentAlert('Error', 'El RUT es obligatorio y debe estar en el formato correcto (12.345.678-9).');
      return;
    }

    if (this.PassUser.length < 7) {
      this.presentAlert('Error', 'La contraseña debe tener al menos 7 caracteres.');
      return;
    }

    if (!/[A-Z]/.test(this.PassUser)) {
      this.presentAlert('Error', 'La contraseña debe contener al menos una mayúscula.');
      return;
    }

    if (!/[$&+,:;=?@#|'<>.^*()%!-]/.test(this.PassUser)) {
      this.presentAlert('Error', 'La contraseña debe contener al menos un caracter especial.');
      return;
    }

    if (this.PassUser !== this.ConfirmUser) {
      this.presentAlert('Error', 'Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
      return;
    }

    const celular = Number(this.CelUser);
    if (isNaN(celular) || celular.toString().length < 8 || celular.toString().length > 9) {
      this.presentAlert('Error', 'Asegurate de ingresar un número válido, debe contener entre 8 y 9 dígitos.');
      return;
    }

    const newUser: ModelLog = {
      id: undefined,
      primer_nombre: this.NameUser,
      segundo_nombre: '',
      tipo_usuario: 3, // Tipo de usuario para register-user
      primer_apellido:this.AppUser,
      segundo_apellido: '',
      rut: this.RunUser,
      telefono: this.CelUser,
      email: this.EmailUser,
      contraseña: this.PassUser,
      verificado: true,
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

  GetBack() {
    this.router.navigate(['principal-page']);
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
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

  constructor(private router: Router, private servicio: ServiceService) {}

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
      alert('Por favor, complete todos los campos.');
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(this.EmailUser)) {
      alert('La dirección de correo electrónico no es válida. Por favor, inténtalo de nuevo.');
      return;
    }

    if (this.PassUser.length < 7) {
      alert('La contraseña debe tener al menos 7 caracteres.');
      return;
    }

    if (!/[A-Z]/.test(this.PassUser)) {
      alert('La contraseña debe contener al menos una mayúscula.');
      return;
    }

    if (!/[$&+,:;=?@#|'<>.^*()%!-]/.test(this.PassUser)) {
      alert('La contraseña debe contener al menos un caracter especial.');
      return;
    }

    if (this.PassUser !== this.ConfirmUser) {
      alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
      return;
    }

    const celular = Number(this.CelUser);
    if (isNaN(celular) || celular.toString().length < 8 || celular.toString().length > 9) {
      alert('Asegurate de ingresar un número válido, debe contener entre 8 y 9 dígitos.');
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
      // Puedes mostrar un mensaje de éxito o redirigir a otra página aquí
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      // Puedes mostrar un mensaje de error aquí
    }
  }

  GetBack() {
    this.router.navigate(['principal-page']);
  }
}


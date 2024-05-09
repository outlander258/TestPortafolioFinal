import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModelLog } from '../modelo/ModelLog';
import { ServiceService } from '../service/service.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-register-driver',
  templateUrl: './register-driver.page.html',
  styleUrls: ['./register-driver.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RegisterDriverPage implements OnInit {
  NameDriver : string | undefined;
  AppDriver :string | undefined;
  RunDriver :string | undefined;
  EmailDriver:string | undefined;
  PassDriver :string | undefined;
  ConfirmDriver :string | undefined;
  CelDriver :string | undefined;
  







  constructor( private router :Router, private servicio :ServiceService) { }

  ngOnInit() {
 
  }

  GetBack(){
    this.router.navigate(['principal-page']);
  }
  async registerDriver() {
    if (
      !this.NameDriver||
      !this.AppDriver ||
      !this.RunDriver ||
      !this.EmailDriver ||
      !this.PassDriver ||
      !this.ConfirmDriver ||
      !this.CelDriver
    ) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(this.EmailDriver)) {
      alert('La dirección de correo electrónico no es válida. Por favor, inténtalo de nuevo.');
      return;
    }

    if (this.PassDriver.length < 7) {
      alert('La contraseña debe tener al menos 7 caracteres.');
      return;
    }

    if (!/[A-Z]/.test(this.PassDriver)) {
      alert('La contraseña debe contener al menos una mayúscula.');
      return;
    }

    if (!/[$&+,:;=?@#|'<>.^*()%!-]/.test(this.PassDriver)) {
      alert('La contraseña debe contener al menos un caracter especial.');
      return;
    }

    if (this.PassDriver !== this.ConfirmDriver) {
      alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
      return;
    }

    const celular = Number(this.CelDriver);
    if (isNaN(celular) || celular.toString().length < 8 || celular.toString().length > 9) {
      alert('Asegurate de ingresar un número válido, debe contener entre 8 y 9 dígitos.');
      return;
    }

    const newUser: ModelLog = {
      id: undefined,
      primer_nombre: this.NameDriver,
      segundo_nombre: '',
      tipo_usuario: 2, 
      primer_apellido:this.AppDriver,
      segundo_apellido: '',
      rut: this.RunDriver,
      telefono: this.CelDriver,
      email: this.EmailDriver,
      contraseña: this.PassDriver,
      verificado: false,
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


  
}

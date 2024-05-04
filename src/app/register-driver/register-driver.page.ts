import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

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
  DirectDriver :string| undefined;
  PassDriver :string | undefined;
  ConfirmDriver :string | undefined;
  CelDriver :string | undefined;
  







  constructor( private router :Router) { }

  ngOnInit() {
 
  }

  GetBack(){
    this.router.navigate(['principal-page']);
  }


  ValidarFormDriver() {
    console.log('Nombre : ', this.NameDriver);
    console.log('Apellido : ', this.AppDriver);
    console.log('RUN : ', this.RunDriver);
    console.log('Dirección : ', this.DirectDriver)
    console.log('Contraseña : ', this.PassDriver);
    console.log('Confir Contaseña : ', this.ConfirmDriver);
    console.log ('número de contacto : ',this.CelDriver);
  
    if (!this.NameDriver?.trim()) {
      alert('Por favor, ingresa tu nombre.');
      return;
    }
  
    if (this.NameDriver.length < 8) {
      alert('El nombre debe tener al menos 8 caracteres.');
      return;
    }
  
    if (!this.AppDriver?.trim()) {
      alert('Por favor, ingresa tu apellido');
      return;
    }
  
    if (this.AppDriver.length < 6) {
      alert('El apellido debe contener al menos 6 caracteres');
      return;
    }
  
    if (!this.RunDriver?.trim()) {
      alert('Por favor, ingresa tu RUN ');
      return;
    }
  
    if (this.RunDriver.length < 7) {
      alert('Ingresa tu RUN sin dígito verificador : EJEMPLO : 18033767');
      return;
    }

    if(!this.EmailDriver?.trim()){
      alert('Ingresa un Email para tu registro')
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
if (!emailPattern.test(this.EmailDriver || '')) {
  alert('La dirección de correo electrónico no es válida. Por favor, inténtalo de nuevo.');
  return;
}





    if (!this.DirectDriver?.trim()){
      alert('Ingresa tu dirección')
    }
  
    if (!this.PassDriver?.trim()) {
      alert('Por favor, ingresa tu contraseña.');
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
  
    if (!this.ConfirmDriver) {
      alert('Por favor, confirma tu contraseña.');
      return;
    }
  
    if (this.PassDriver !== this.ConfirmDriver) {
      alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
      return;
    }

    if (!this.CelDriver?.trim()) {
      alert('Por favor, ingresa tu número de celular.');
      return;
    }
    
    const celular = Number(this.CelDriver);
    if (isNaN(celular) || celular.toString().length < 8 || celular.toString().length > 9) {
      alert('Asegurate de ingresar un número válido, debe contener entre 8 y 9 dígitos.');
      return;
    }



 


  
    console.log('Registro exitoso');
  

}
}

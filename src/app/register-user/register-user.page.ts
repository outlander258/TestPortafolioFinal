import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.page.html',
  styleUrls: ['./register-user.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RegisterUserPage implements OnInit {
  NameUser :String | undefined;
  AppUser :String | undefined;
  RunUser :String | undefined;
  EmailUser :string | undefined;
  PassUser :String | undefined;
  ConfirmUser:string | undefined;
  CelUser :string | undefined;
  


  constructor( private router : Router) { }

  ngOnInit() {
   
  }


  GetBack(){
    this.router.navigate(['principal-page']);
  }

  ValidarFormUser() {
    console.log('Nombre : ', this.NameUser);
    console.log('Apellido : ', this.AppUser);
    console.log('RUN : ', this.RunUser);
    console.log('Contraseña : ', this.PassUser);
    console.log('Confir Contaseña : ', this.ConfirmUser);
    console.log('Celular : ' ,this.CelUser);
  
    if (!this.NameUser?.trim()) {
      alert('Por favor, ingresa tu nombre.');
      return;
    }
  
    if (this.NameUser.length < 8) {
      alert('El nombre debe tener al menos 8 caracteres.');
      return;
    }
  
    if (!this.AppUser?.trim()) {
      alert('Por favor, ingresa tu apellido');
      return;
    }
  
    if (this.AppUser.length < 6) {
      alert('El apellido debe contener al menos 6 caracteres');
      return;
    }
  
    if (!this.RunUser?.trim()) {
      alert('Por favor, ingresa tu RUN ');
      return;
    }
  
    if (this.RunUser.length < 7) {
      alert('Ingresa tu RUN sin dígito verificador : EJEMPLO : 18033767');
      return;
    }

    if(!this.EmailUser?.trim()){
      alert('Ingresa un Email para tu registro')
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
if (!emailPattern.test(this.EmailUser|| '')) {
  alert('La dirección de correo electrónico no es válida. Por favor, inténtalo de nuevo.');
  return;
}

  








  
    if (!this.PassUser?.trim()) {
      alert('Por favor, ingresa tu contraseña.');
      return;
    }
  
    const passUserString: string = this.PassUser.toString();
  
    if (passUserString.length < 7) {
      alert('La contraseña debe tener al menos 7 caracteres.');
      return;
    }
  

    if (!/[A-Z]/.test(passUserString)) {
      alert('La contraseña debe contener al menos una mayúscula.');
      return;
    }
  
    if (!/[$&+,:;=?@#|'<>.^*()%!-]/.test(passUserString)) {
      alert('La contraseña debe contener al menos un caracter especial.');
      return;
    }
  
    if (!this.ConfirmUser) {
      alert('Por favor, confirma tu contraseña.');
      return;
    }
  
    if (passUserString !== this.ConfirmUser) {
      alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
      return;
    }

    if(!this.CelUser?.trim()){
      alert('Ingresa tu número de teléfono .');
      return;
    }

    const celular = Number(this.CelUser);
    if (isNaN(celular) || celular.toString().length < 8 || celular.toString().length > 9) {
      alert('Asegurate de ingresar un número válido, debe contener entre 8 y 9 dígitos.');
      return;
    }


    


  
    console.log('Registro exitoso...');
  }
}




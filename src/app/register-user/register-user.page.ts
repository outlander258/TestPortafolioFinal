import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

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
  PassUser :String | undefined;
  ConfirmUser:string | undefined;
  


  constructor() { }

  ngOnInit() {
   
  }

ValidarFormUser(){
  console.log('Nombre : ' ,this.NameUser)
  console.log('Apellido : ' ,this.AppUser)
  console.log('RUN : ' , this.RunUser)
  console.log('Contraseña : ', this.PassUser)
  console.log('Confir Contaseña : ', this.ConfirmUser)


  if (!this.PassUser || !this.ConfirmUser) {
    alert('Por favor, ingresa y confirma tu contraseña.');
    return;
  }

  if (this.PassUser !== this.ConfirmUser) {
    alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
    return;
  }

  console.log('contraseñas coinciden')


}




}






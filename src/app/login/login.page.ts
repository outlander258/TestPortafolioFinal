import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
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
  UserLogin :ModelLog ={
    id : undefined ,
    primer_nombre:'',
    segundo_nombre :'',
    tipo_usuario : 0,
    primer_apellido: '',
    segundo_apellido: '',
    rut :'',
    telefono : '',
    email : '',
    contraseña :'',
    verificado : false,


  }

 

  constructor(private router : Router, private servicio :ServiceService) { }


 







  ngOnInit() {

  }

  async login(){
    if (this.UserName && this.UserPassword) {
      this.UserLogin.email = this.UserName!;
      this.UserLogin.contraseña = this.UserPassword!;
    
      const respuesta = await lastValueFrom(this.servicio.getLogin(this.UserLogin));
      if (respuesta && respuesta.email && respuesta.email.toLowerCase() === this.UserLogin.email.toLowerCase() && respuesta.contraseña === this.UserLogin.contraseña){
        console.log('inicio de sesión exitoso')
        if(respuesta.tipo_usuario === 1){
          localStorage.setItem('tipo_usuario', 'ADMIN');
          this.router.navigate(['admin-page']);
        } else if (respuesta.tipo_usuario === 2) {
          localStorage.setItem('tipo_usuario', 'DRIVER'); 
          this.router.navigate(['driver-page']);
        } else if (respuesta.tipo_usuario === 3) {
          localStorage.setItem('tipo_usuario', 'USER'); 
          this.router.navigate(['user-page']);
        } else {
          console.log('Tipo de usuario desconocido');
        }
      } else {
        console.log('credenciales inválidas');
      }
    } else {
      console.log('Nombre de usuario o contraseña no válidos');
    }
  }
GetBack(){
  this.router.navigate(['principal-page']);
}

 

}

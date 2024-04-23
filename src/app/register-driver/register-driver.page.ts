import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

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
  PassDriver :string | undefined;
  ConfirmDriver :string | undefined;



  constructor() { }

  ngOnInit() {
 
  }


  ValidarFormDriver(){
    console.log('Nombre : ' ,this.NameDriver)
    console.log('Apellido : ' ,this.AppDriver)
    console.log('RUN : ' , this.RunDriver)
    console.log('Contraseña : ', this.PassDriver)
    console.log('Confir Contaseña : ', this.ConfirmDriver)
  
  
    if (!this.PassDriver || !this.ConfirmDriver) {
      alert('Por favor, ingresa y confirma tu contraseña.');
      return;
    }
  
    if (this.PassDriver !== this.ConfirmDriver) {
      alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
      return;
    }
  
    console.log('contraseñas coinciden')
  
  
  }
  

}

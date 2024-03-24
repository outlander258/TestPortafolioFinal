import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.page.html',
  styleUrls: ['./new-account.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class NewAccountPage implements OnInit {
  newUserRegisterId : string | undefined;
  newUserRegisterPassword : string | undefined;
  newUserConfirmPassword: string | undefined;

  constructor() { }

  ngOnInit() {

  }

  SamePassword() {

    console.log('ID', this.newUserRegisterId)
    console.log('CONTRASEÑA',this.newUserRegisterPassword)
    console.log('COINCIDIR CONTRASEÑA ',this.newUserConfirmPassword)
    if (!this.newUserRegisterPassword || !this.newUserConfirmPassword) {
      alert('Por favor, ingresa y confirma tu contraseña.');
      return;
    }
  
    if (this.newUserRegisterPassword !== this.newUserConfirmPassword) {
      alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
      return;
    }

    console.log('contraseñas coinciden')
  

  }






}

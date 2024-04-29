import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {

  UserName: string | undefined;
  UserPassword : string | undefined;

  constructor(private router : Router) { }

  ngOnInit() {

  }

  login(){
    console.log('Nombre Usuario: ',this.UserName)
    console.log('CONTRASEÑA USUARIO : ',this.UserPassword)


  }

  newUser(){
    console.log("antes boton")
    this.router.navigate(['principal-page']);
    console.log("despues boton")



  }
GetBack(){
  this.router.navigate(['principal-page']);
}

 

}

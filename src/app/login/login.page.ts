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

  UserId : string | undefined;
  UserPassword : string | undefined;

  constructor(private router : Router) { }

  ngOnInit() {

  }

  login(){
    console.log('ID USUARIO : ',this.UserId)
    console.log('CONTRASEÑA USUARIO : ',this.UserPassword)


  }

  newUser(){
    this.router.navigate(['/new-account']);


  }
  

}

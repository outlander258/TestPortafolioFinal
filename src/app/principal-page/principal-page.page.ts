import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-principal-page',
  templateUrl: './principal-page.page.html',
  styleUrls: ['./principal-page.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PrincipalPagePage implements OnInit {

  constructor( private router :Router, private service: ServiceService) { }

  ngOnInit() {
  }

  RegisterUser(){
    this.router.navigate(['/register-user']);


  }

  RegisterDriver(){
    this.router.navigate(['/register-driver']);

  }

  LoginAccount(){
    this.router.navigate(['/login'])
  }

  Test(){
    this.service.consulta().subscribe((data) => {
      console.log(data); // Aquí puedes trabajar con los datos devueltos por el servicio
    });
  }

}

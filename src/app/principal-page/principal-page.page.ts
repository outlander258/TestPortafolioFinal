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

  constructor(private router: Router, private service: ServiceService) { }

  ngOnInit() {
    this.datos();
  }

  RegisterUser() {
    this.router.navigate(['/register-user']);


  }

  RegisterDriver() {
    this.router.navigate(['/register-driver']);

  }

  LoginAccount() {
    this.router.navigate(['/login'])
  }

  datos() {
    this.service.getDatos().subscribe((datos:any) => {
      console.log('Datos obtenidos',datos);

    }, (error: any) => {
      console.log('Error al obtener los datos',error);
    });
  }
}

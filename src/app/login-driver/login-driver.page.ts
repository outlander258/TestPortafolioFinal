import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-login-driver',
  templateUrl: './login-driver.page.html',
  styleUrls: ['./login-driver.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginDriverPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

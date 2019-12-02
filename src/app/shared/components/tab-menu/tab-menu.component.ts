import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.scss'],
})
export class TabMenuComponent implements OnInit {
  private iconHome;
  private labelHome;
  private iconCultos;
  private labelCultos;
  private iconAdmin;
  private labelAdmin;
  private primaryColor: string = '#292525';
  private secondaryColor: string = '#001facf6';
//#292525
//#474952f6
  constructor(private router: Router) { 
    
  }

  ngOnInit() {
    this.iconHome = document.getElementById('icon-home');
    this.labelHome = document.getElementById('label-home');
    this.iconCultos = document.getElementById('icon-cultos');
    this.labelCultos = document.getElementById('label-cultos');
    this.iconAdmin = document.getElementById('icon-admin');
    this.labelAdmin = document.getElementById('label-admin');

    this.iconHome.style.color = this.secondaryColor;
    this.labelHome.style.color = this.secondaryColor;
    this.iconCultos.style.color = this.primaryColor;
    this.labelCultos.style.color = this.primaryColor;
    this.iconAdmin.style.color = this.primaryColor;
    this.labelAdmin.style.color = this.primaryColor;
  }

  redirecionarHome(){
    // let iconHome = document.getElementById('icon-home');
    // iconHome.style.color = 'red';
    this.setStyle('home');
    // this.iconCultos = document.getElementById('icon-cultos');
    // this.labelCultos = document.getElementById('label-cultos');
    // this.iconAdmin = document.getElementById('icon-admin');
    // this.labelAdmin = document.getElementById('label-admin');
    // this.iconHome.style.color = 'red';
    // this.labelHome.style.color = 'red';
    // this.iconCultos.style.color = 'grey';
    // this.labelCultos.style.color = 'grey';
    // this.iconAdmin.style.color = 'grey';
    // this.labelAdmin.style.color = 'grey';
    this.router.navigate(['home']);
  }

  redirecionarCultos(){
    this.setStyle('cultos');
    // this.iconCultos = document.getElementById('icon-cultos');
    // this.labelCultos = document.getElementById('label-cultos');
    // this.iconAdmin = document.getElementById('icon-admin');
    // this.labelAdmin = document.getElementById('label-admin');
   
    // this.iconCultos.style.color = 'red';
    // this.labelCultos.style.color = 'red';
    // this.iconHome.style.color = 'grey';
    // this.labelHome.style.color = 'grey';
    // this.iconAdmin.style.color = 'grey';
    // this.labelAdmin.style.color = 'grey';
    // let element = document.getElementById('icon-cultos');
    // element.style.color = 'blue';
    this.router.navigate(['cultos']);
  }

  redirecionarLogin(){
    this.setStyle('admin');
    // this.iconAdmin = document.getElementById('icon-admin');
    // this.labelAdmin = document.getElementById('label-admin');
    // this.iconCultos = document.getElementById('icon-cultos');
    // this.labelCultos = document.getElementById('label-cultos');
    // this.iconAdmin.style.color = 'red';
    // this.labelAdmin.style.color = 'red';
    // this.iconCultos.style.color = 'grey';
    // this.labelCultos.style.color = 'grey';
    // this.iconHome.style.color = 'grey';
    // this.labelHome.style.color = 'grey';
    this.router.navigate(['login']);
  }

  setStyle(secao){
    // this.iconCultos = document.getElementById('icon-cultos');
    // this.labelCultos = document.getElementById('label-cultos');
    // this.iconAdmin = document.getElementById('icon-admin');
    // this.labelAdmin = document.getElementById('label-admin');

    if(secao === 'home'){
      this.iconHome.style.color = this.secondaryColor;
      this.labelHome.style.color = this.secondaryColor;
      this.iconCultos.style.color = this.primaryColor;
      this.labelCultos.style.color = this.primaryColor;
      this.iconAdmin.style.color = this.primaryColor;
      this.labelAdmin.style.color = this.primaryColor;
    }else if(secao === 'cultos'){
      this.iconCultos.style.color = this.secondaryColor;
      this.labelCultos.style.color = this.secondaryColor;
      this.iconHome.style.color = this.primaryColor;
      this.labelHome.style.color = this.primaryColor;
      this.iconAdmin.style.color = this.primaryColor;
      this.labelAdmin.style.color = this.primaryColor;
    }else if(secao === 'admin'){
      this.iconAdmin.style.color = this.secondaryColor;
      this.labelAdmin.style.color = this.secondaryColor;
      this.iconCultos.style.color = this.primaryColor;
      this.labelCultos.style.color = this.primaryColor;
      this.iconHome.style.color = this.primaryColor;
      this.labelHome.style.color = this.primaryColor;
    }
  }
}

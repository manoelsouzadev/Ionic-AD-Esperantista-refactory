import { NavController, Platform, ToastController } from '@ionic/angular';
import { OnInit, Component } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { SharedModalService } from '../../shared/services/shared-modal/shared-modal.service';

@Component({
  selector: 'login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage implements OnInit {
  private usuario: Usuario = new Usuario();
  private autenticado: boolean;

  constructor(
    private loginService: LoginService,
    private sharedModalService: SharedModalService) {}

  ngOnInit() {}

  fazerLogin() {
    this.autenticado = this.loginService.fazerLogin(this.usuario);

    if (this.autenticado == false) {
      this.presentToast();
    }
  }


  async presentToast() {
   await this.sharedModalService.presentToast(
    'Senha Incorreta. Tente novamente!',
    'danger',
    'custom-modal',
    2000
  );
   }
  //   const toast = await this.toastController.create({
  //     message: 'Senha Incorreta!',
  //     color: 'danger',
  //     mode: 'ios',
  //     duration: 2000
  //   });
  //   toast.present();
  // }
}

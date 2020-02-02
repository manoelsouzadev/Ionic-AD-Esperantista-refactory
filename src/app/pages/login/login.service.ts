import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private usuarioAutenticado: boolean = false;
  constructor(private router: Router) { }

  fazerLogin(usuario: Usuario) {
    if(usuario.senha === '12345678'){
      console.log("funcionou!!");
      this.usuarioAutenticado = true;
      this.router.navigate(['cadastro/categorias']);
    }else{
      return false;
    }
  }
}

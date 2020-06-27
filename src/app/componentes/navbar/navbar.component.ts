import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  logueado: boolean = false;

  constructor(private usuarioService: UsuarioService) {
    this.logueado = this.estaLogueado();
  }

  ngOnInit(): void { }

  logout() {
    this.usuarioService.logout();
    this.logueado = false;
  }

  estaLogueado(): boolean {
    return this.usuarioService.estaLogueado();
  }

  esUsuario() {
    return this.usuarioService.esUsuarioLogueado();
  }

}

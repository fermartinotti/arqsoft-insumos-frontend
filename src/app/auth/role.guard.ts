import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../servicios/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private authService: UsuarioService,
    private router: Router
  ) { }

  canActivate(): boolean {
    if (!this.authService.estaLogueado()) {
      this.router.navigate(['/inicio']);
      return false;
    }
    return true;
  }
}
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { LoginRequest } from 'src/app/modelo/loginRequest';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalCloseComponent } from '../../modals/modal-close/modal-close.layout';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  formularioLogin: FormGroup;
  submitted = false;

  constructor(private router: Router, private formBuilder: FormBuilder, private usuarioService: UsuarioService, 
    private _modalService: NgbModal) { }

  get f() { return this.formularioLogin.controls; }

  async login(): Promise<void> {
    this.submitted = true;
    try {
      if (this.formularioLogin.valid) {
        const loginRequest: LoginRequest = new LoginRequest(
          this.formularioLogin.get('email').value,
          this.formularioLogin.get('password').value
        );

        await this.usuarioService.login(loginRequest).then(resultado => this.setearRoles(resultado));

        if(this.usuarioService.esAdminLogueado()){
          this.router.navigate(['/inicio']);
        }
        else{
          this.router.navigate(['/pedido']);
        }         
      }
    }
    catch (error) {
      console.log(error);
      this.crearModal('LOGIN', 'El usuario y/o contraseña ingresados es/son incorrecto/s');
    }
  }

  ngOnInit() {
    this.formularioLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  crearModal(titulo: string, descripcion: string) {
    const modalInform = this._modalService.open(ModalCloseComponent);
    modalInform.componentInstance.title = titulo;
    modalInform.componentInstance.description = descripcion;
  }

  setearRoles(resultado) {
    localStorage.setItem('token', resultado.token);
    localStorage.setItem('role', resultado.role);
  }
}

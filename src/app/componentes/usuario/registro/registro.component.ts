import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modelo/usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../../validaciones/must-match.validator';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalCloseComponent } from '../../modals/modal-close/modal-close.layout';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent implements OnInit {
  formularioRegistro: FormGroup;
  submitted = false;
  
  constructor(private router: Router, private formBuilder: FormBuilder, private usuarioService:UsuarioService, 
    private modalService: NgbModal) {}

  get f() { return this.formularioRegistro.controls; }

  async registrar(): Promise<void> {
    this.submitted = true;
    try {
      if (this.formularioRegistro.valid){
        const usuario: Usuario = new Usuario (
          this.formularioRegistro.get('nombre').value,
          this.formularioRegistro.get('email').value,
          this.formularioRegistro.get('telefono').value,
          this.formularioRegistro.get('entidad').value,
          this.formularioRegistro.get('cargo').value,
          this.formularioRegistro.get('localidad').value,
          this.formularioRegistro.get('password').value
        );
        
        await this.usuarioService.crearUsuario(usuario);
        this.crearModal('Alta de usuario', 'El usuario se ha dado de alta satistfactoriamente');
        this.router.navigate(['/login']); 
      }
    } catch (error) {
        const errorPantalla:string = error.error.Error;
        console.log(errorPantalla);
        this.crearModal('Alta de usuario', errorPantalla);
    }
  }

  ngOnInit() {
    this.formularioRegistro = this.formBuilder.group({
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      entidad: ['', Validators.required],
      cargo: ['', Validators.required],
      localidad: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmarPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmarPassword')
    });
  }

  crearModal(titulo: string, descripcion: string){
    const modalInform = this.modalService.open(ModalCloseComponent);
    modalInform.componentInstance.title = titulo;
    modalInform.componentInstance.description = descripcion;
    this.router.navigate(['/inicio']);
  }
}



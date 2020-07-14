import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CrearTicketDTO } from 'src/app/modelo/crearTicketDTO';
import { Insumo } from 'src/app/modelo/insumo';
import { Medicamento } from 'src/app/modelo/medicamento';
import { Pedido } from 'src/app/modelo/pedido';
import { Area } from 'src/app/modelo/area';
import { ModalCloseComponent} from '../../modals/modal-close/modal-close.layout';

@Component({
  selector: 'app-crear-pedido',
  templateUrl: './crear-pedido.component.html',
  styleUrls: ['./crear-pedido.component.css']
})

export class CrearPedidoComponent implements OnInit {
  formularioCrearPedido: FormGroup;
  submitted = false;
  insumoSeleccionado='1';
  idAreaSeleccionada= 1;

  insumos:string[] = [ 'Mascara', 'Barbijo', 'Respirador', 'Medicamento', 'Guante' ];
  areas:Area[];

  @Output() mensaje = new EventEmitter<Pedido[]>();

  constructor(private router: Router, private formBuilder: FormBuilder, private usuarioService: UsuarioService, 
    private _modalService: NgbModal) { }

  get f() { return this.formularioCrearPedido.controls;}

  ngOnInit(): void {
    this.formularioCrearPedido = this.formBuilder.group({
      insumo:['', Validators.required],
      area:['', Validators.required],
      medicamento:new FormControl('')
    });
    this.usuarioService.getAreas().then(areas => this.areas = areas);
  }

  async crearPedido(): Promise<void>{
    this.submitted = true;
    if('Medicamento' === this.insumoSeleccionado){
      this.formularioCrearPedido.addControl('medicamento', new FormControl('', Validators.required));
    }
      
    try{
      if(this.formularioCrearPedido.valid){
        if('Medicamento' === this.insumoSeleccionado){
          const medicamento:Medicamento = new Medicamento(
            this.formularioCrearPedido.get('insumo').value,
            this.formularioCrearPedido.get('medicamento').value
            );
          const ticket:CrearTicketDTO = new CrearTicketDTO(medicamento, this.idAreaSeleccionada);
          await this.usuarioService.crearPedido(ticket);
          this.actualizarPedidos();       
          this.crearModal('Crear pedido', 'El pedido se ha creado de forma satisfactoria');
        }
        else{
          this.formularioCrearPedido.removeControl('medicamento')
          const insumo:Insumo = new Insumo(this.formularioCrearPedido.get('insumo').value);
          const ticket:CrearTicketDTO = new CrearTicketDTO(insumo, this.idAreaSeleccionada);       
          await this.usuarioService.crearPedido(ticket);
          this.actualizarPedidos();          
          this.crearModal('Crear pedido', 'El pedido se ha creado de forma satisfactoria');
        }
      } 
      
    }
    catch(error){
      console.log(error);
      this.crearModal('Crear pedido', 'Falló');
    }
    this.formularioCrearPedido= this.formBuilder.group({
      insumo:['1', Validators.required],
      area:['1', Validators.required],
      medicamento:new FormControl('')
    });
  }

  crearModal(titulo: string, descripcion: string) {
    const modalInform = this._modalService.open(ModalCloseComponent);
    modalInform.componentInstance.title = titulo;
    modalInform.componentInstance.description = descripcion;
  }

  actualizarPedidos(){
    this.usuarioService.getPedidos().then(resultado =>this.mensaje.emit(resultado));
  }
  
}
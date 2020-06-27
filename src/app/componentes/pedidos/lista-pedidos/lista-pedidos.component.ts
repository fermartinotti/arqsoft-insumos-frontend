import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Pedido } from 'src/app/modelo/pedido';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ModalCloseComponent } from '../../modals/modal-close/modal-close.layout';
import { ModalListComponent } from '../../modals/modal-list/modal-list.component';
import { CancelarTicketRequest } from 'src/app/modelo/cancelarTicketRequest';


@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.css']
})
export class ListaPedidosComponent implements OnInit {
  
  @Input() pedidos:Pedido[]; 
  paginaActual:number = 1; 
  modalOptions: NgbModalOptions;

  constructor(private usuarioService:UsuarioService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.usuarioService.getPedidos().then(pedidos => this.setearPedido(pedidos));
  }

  setearPedido(pedidos){
    this.pedidos = pedidos;
    // console.log(pedidos)
  }

  async cancelarPedido(id:number):Promise<any> {
      try{
        const ticket:CancelarTicketRequest = new CancelarTicketRequest(id);
        await this.usuarioService.cancelarPedido(ticket);
        this.usuarioService.getPedidos().then(pedidos => this.setearPedido(pedidos));
        this.crearModal('Cancelación pedido', 'El pedido se ha cancelado satistfactoriamente');     
      }
      catch(error){
        console.log(error);
        this.crearModal('Cancelación pedido', 'No se pudo cancelar el pedido. Intente nuevamente mas tarde');
      }
  }

  async cancelarPedidoFuncion(ticket){
    await this.usuarioService.cancelarPedido(ticket);
  }

  crearModal(titulo:string, descripcion:string){
    const modalInform = this.modalService.open(ModalCloseComponent);
    modalInform.componentInstance.title = titulo;
    modalInform.componentInstance.description = descripcion;
  }

  historialDeEstados(listaEstados){
    const modalList = this.modalService.open(ModalListComponent);
    modalList.componentInstance.estados = listaEstados;
  }
}

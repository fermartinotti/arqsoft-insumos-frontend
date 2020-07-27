import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Pedido } from 'src/app/modelo/pedido';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ModalCloseComponent } from '../../modals/modal-close/modal-close.layout';
import { ModalListComponent } from '../../modals/modal-list/modal-list.component';
import { CancelarTicketRequest } from 'src/app/modelo/cancelarTicketRequest';
import { NGXLogger } from 'ngx-logger';


@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.css']
})
export class ListaPedidosComponent implements OnInit {
  
  @Input() pedidos:Pedido[]; 
  paginaActual:number = 1; 
  modalOptions: NgbModalOptions;

  constructor(private usuarioService:UsuarioService, private modalService: NgbModal, private logger: NGXLogger) { }

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
        await this.usuarioService.cancelarPedido(ticket).then(r=>
          this.logger.info("El pedido con id " + id.toString() + " ha sido cancelado de forma exitosa"));
        this.usuarioService.getPedidos().then(pedidos => this.setearPedido(pedidos));
        this.crearModal('Cancelación pedido', 'El pedido se ha cancelado satistfactoriamente');     
      }
      catch(error){
        this.logger.error("El pedido no se pudo cancelar debido a: " + ' ' + error);
        this.crearModal('Cancelación pedido', 'No se pudo cancelar el pedido. Intente nuevamente mas tarde');
      }
  }

  crearModal(titulo:string, descripcion:string){
    const modalInform = this.modalService.open(ModalCloseComponent);
    modalInform.componentInstance.title = titulo;
    modalInform.componentInstance.description = descripcion;
  }

  historialDeEstados(listaEstados){
    console.log(listaEstados);
    const modalList = this.modalService.open(ModalListComponent);
    modalList.componentInstance.estados = listaEstados;
  }
}

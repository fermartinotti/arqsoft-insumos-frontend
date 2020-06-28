import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ModalCloseComponent } from '../../modals/modal-close/modal-close.layout';
import { AdminService } from 'src/app/servicios/admin.service';
import { Pedido } from 'src/app/modelo/pedido';
import { Proveedor } from 'src/app/modelo/proveedor';
import { RechazarTicketRequest } from 'src/app/modelo/rechazarTicketRequest';

@Component({
  selector: 'app-admin-pedidos',
  templateUrl: './admin-pedidos.component.html',
  styleUrls: ['./admin-pedidos.component.css']
})
export class AdminPedidosComponent implements OnInit {
  pedidos: Pedido[];
  proveedores: Proveedor[];

  constructor(private adminService: AdminService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.adminService.getAllPedidos().then(pedidos => this.setearPedidos(pedidos));
    this.adminService.getAllProveedores().then(proveedores => this.setearProveedores(proveedores));
  }

  setearPedidos(pedidos) {
    this.pedidos = pedidos;
    console.log(pedidos);
  }

  setearProveedores(proveedores) {
    this.proveedores = proveedores;
    console.log(proveedores);
  }

  async rechazarPedido(id: number): Promise<any> {
    try {
      const ticket: RechazarTicketRequest = new RechazarTicketRequest(id, 'porque si');
      await this.adminService.rechazarPedido(ticket);
      this.adminService.getAllPedidos().then(pedidos => this.setearPedidos(pedidos));
      this.crearModal('Rechazar pedido', 'El pedido se ha rechazado satistfactoriamente');
    }
    catch (error) {
      console.log(error);
      this.crearModal('Rechazo de pedido', 'No se pudo rechazar el pedido. Intente nuevamente mas tarde');
    }
  }

  crearModal(titulo: string, descripcion: string) {
    const modalInform = this.modalService.open(ModalCloseComponent);
    modalInform.componentInstance.title = titulo;
    modalInform.componentInstance.description = descripcion;
  }

}

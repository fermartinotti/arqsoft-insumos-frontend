import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/servicios/admin.service';
import { Pedido } from 'src/app/modelo/pedido';
import { Proveedor } from 'src/app/modelo/proveedor';
import { ModalRechazoComponent } from '../../modals/modal-rechazo/modal-rechazo.component';

@Component({
  selector: 'app-admin-pedidos',
  templateUrl: './admin-pedidos.component.html',
  styleUrls: ['./admin-pedidos.component.css']
})
export class AdminPedidosComponent implements OnInit {
  pedidos: Pedido[];
  proveedores: Proveedor[];
  solapaAll: boolean = true;
  solapaPendientes: boolean = false;
  solapaRechazados: boolean = false;
  paginaActual:number = 1; 

  constructor(private adminService: AdminService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.adminService.getAllPedidos().then(pedidos => this.setearPedidos(pedidos));
    this.getAllPedidos;
  }

  setearPedidos(pedidos) {
    this.pedidos = pedidos;
    console.log(pedidos);
  }

  setearProveedores(proveedores) {
    this.proveedores = proveedores;
  }
/*
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
  }*/

  rechazarPedido(id: number) {
    const modalRechazo= this.modalService.open(ModalRechazoComponent);
    modalRechazo.componentInstance.idTicket = id;
  }

  getPedidosRechazados(){
    this.adminService.getPedidosRechazados().then(result => this.setearPedidos(result));
    this.solapaAll = false;
    this.solapaRechazados = true;
  }

  getPedidosPendientes(){
    this.adminService.getPedidosPendientes().then(result => this.setearPedidos(result));
    this.solapaAll = false;
    this.solapaRechazados = false;
  }

  getAllPedidos(){
    this.adminService.getAllPedidos().then(result => this.setearPedidos(result));
    this.solapaAll = true;
    this.solapaRechazados = false;
  }
}

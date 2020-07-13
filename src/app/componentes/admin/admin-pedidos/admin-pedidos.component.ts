import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/servicios/admin.service';
import { Pedido } from 'src/app/modelo/pedido';
import { Proveedor } from 'src/app/modelo/proveedor';
import { ModalRechazoComponent } from '../../modals/modal-rechazo/modal-rechazo.component';
import { ModalListComponent } from '../../modals/modal-list/modal-list.component';

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
  solapaActual: string = 'TODOS LOS PEDIDOS'

  constructor(private adminService: AdminService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.adminService.getAllPedidos().then(result => this.setearPedidos(result));
  }

  setearPedidos(pedidos) {
    this.pedidos = pedidos.reverse();
    //console.log(pedidos);
  }

  setearProveedores(proveedores) {
    this.proveedores = proveedores;
  }

  rechazarPedido(id: number) {
    const modalRechazo= this.modalService.open(ModalRechazoComponent);
    modalRechazo.componentInstance.idTicket = id;
    modalRechazo.result.then(result=>{
      this.adminService.getAllPedidos().then(result => this.setearPedidos(result));
    })
    .catch(() => {});
  }

  getPedidosRechazados(){
    this.adminService.getPedidosRechazados().then(result => this.setearPedidos(result));
    this.solapaAll = false;
    this.solapaRechazados = true;
    this.solapaPendientes = false;
    this.solapaActual = 'PEDIDOS RECHAZADOS';
  }

  getPedidosPendientes(){
    this.adminService.getPedidosPendientes().then(result => this.setearPedidos(result));
    this.solapaAll = false;
    this.solapaRechazados = false;
    this.solapaPendientes = true;
    this.solapaActual = 'PEDIDOS PENDIENTES';
  }

  getAllPedidos(){
    this.adminService.getAllPedidos().then(result => this.setearPedidos(result));
    this.solapaAll = true;
    this.solapaRechazados = false;
    this.solapaPendientes = false;
    this.solapaActual = 'TODOS LOS PEDIDOS'
  }

  historialDeEstados(listaEstados){
    const modalList = this.modalService.open(ModalListComponent);
    modalList.componentInstance.estados = listaEstados;
  }
}

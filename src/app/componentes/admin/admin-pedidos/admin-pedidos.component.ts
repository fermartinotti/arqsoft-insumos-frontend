import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/servicios/admin.service';
import { Pedido } from 'src/app/modelo/pedido';
import { Proveedor } from 'src/app/modelo/proveedor';
import { ModalRechazoComponent } from '../../modals/modal-rechazo/modal-rechazo.component';
import { ModalListComponent } from '../../modals/modal-list/modal-list.component';
import { ModalAprobarPedidoComponent } from '../../modals/modal-aprobar-pedido/modal-aprobar-pedido.component';
import { Insumo } from 'src/app/modelo/insumo';

@Component({
  selector: 'app-admin-pedidos',
  templateUrl: './admin-pedidos.component.html',
  styleUrls: ['./admin-pedidos.component.css']
})
export class AdminPedidosComponent implements OnInit {
  pedidos: Pedido[];
  pedidosPendientes: Pedido[];
  proveedores: Proveedor[];
  solapaAll: boolean = true;
  solapaPendientes: boolean = false;
  solapaRechazados: boolean = false;
  paginaActual:number = 1; 
  solapaActual: string = 'Todos los pedidos'

  constructor(private adminService: AdminService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.adminService.getAllPedidos().then(result => this.setearPedidos(result));
    this.adminService.getPedidosPendientes().then(result => this.pedidosPendientes = result);
    this.getProveedores();
  }

  setearPedidos(pedidos) {
    this.pedidos = pedidos;
    //console.log(pedidos);
  }

  obtenerTodosLosPedidos(){
    this.adminService.getAllPedidos().then(result => this.pedidos = result);
  }

  obtenerTodosLosPedidosPendientes(){
    this.adminService.getPedidosPendientes().then(result => this.pedidosPendientes = result);
  }

 getProveedores(){
   this.adminService.getAllProveedores().then(result => this.proveedores = result);
 }

  async rechazarPedido(id: number) {
    const modalRechazo= this.modalService.open(ModalRechazoComponent);
    modalRechazo.componentInstance.idTicket = id;
 
      modalRechazo.result.then(async result=>{
        await this.obtenerTodosLosPedidosPendientes();
        await this.obtenerTodosLosPedidosPendientes();
     })
     .catch(() => {});
  }

  getPedidosRechazados(){
    this.adminService.getPedidosRechazados().then(result => this.setearPedidos(result));
    this.solapaAll = false;
    this.solapaRechazados = true;
    this.solapaPendientes = false;
    this.solapaActual = 'Pedidos rechazados';
  }

  getPedidosPendientes(){
    this.adminService.getPedidosPendientes().then(result => this.pedidosPendientes = result);
    this.solapaAll = false;
    this.solapaRechazados = false;
    this.solapaPendientes = true;
    this.solapaActual = 'Pedidos pendientes';
  }

  getAllPedidos(){
    this.adminService.getAllPedidos().then(result => this.setearPedidos(result));
    this.solapaAll = true;
    this.solapaRechazados = false;
    this.solapaPendientes = false;
    this.solapaActual = 'Todos los pedidos'
  }

  historialDeEstados(listaEstados){
    const modalList = this.modalService.open(ModalListComponent);
    console.log(listaEstados);
    modalList.componentInstance.estados = listaEstados;
  }

  aprobarPedido(pedido){
    const modalAprobacion= this.modalService.open(ModalAprobarPedidoComponent);
    modalAprobacion.componentInstance.pedido = pedido;
    modalAprobacion.componentInstance.proveedores = this.filtrarProveedores(this.proveedores, pedido);
    modalAprobacion.result.then(async result=>{
      await this.obtenerTodosLosPedidos();
      await this.obtenerTodosLosPedidosPendientes();
    })
    .catch(() => {});
  }

  filtrarProveedores(proveedores:Array<Proveedor>, pedido: Pedido): Array<Proveedor>{
    let proveedoresFiltrados = new Array<Proveedor>();
    for(let proveedor of proveedores){
      if(this.trabajaInsumo(proveedor.insumos, pedido)){
        proveedoresFiltrados.push(proveedor);
      }
    }
    return proveedoresFiltrados;
  }

  trabajaInsumo(insumos: Array<Insumo>, pedido: Pedido): boolean{
    for(let insumo of insumos){
      if(insumo.type == pedido.insumo.type){
        return true;
      }
    }
    return false;
  }
}


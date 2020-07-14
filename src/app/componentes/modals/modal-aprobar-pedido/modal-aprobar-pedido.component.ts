import { Component, Input } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/servicios/admin.service';
import { Proveedor } from 'src/app/modelo/proveedor';
import { AprobarTicketRequest } from 'src/app/modelo/aprobarTicketRequest';
import { Pedido } from 'src/app/modelo/pedido';

@Component({
  selector: 'app-modal-aprobar-pedido',
  templateUrl: './modal-aprobar-pedido.component.html',
  styleUrls: ['./modal-aprobar-pedido.component.css']
})
export class ModalAprobarPedidoComponent {

  @Input()
  pedido: Pedido;

  @Input()
  proveedores: Array<Proveedor>;

  proveedorSeleccionado: Proveedor = new Proveedor("", "", []);

  constructor(public modal: NgbActiveModal, private adminService: AdminService) { }

  async aprobarPedidoModal(){
    const aprobarTicketRequest = new AprobarTicketRequest(this.pedido.id, this.proveedorSeleccionado.id);
    await this.adminService.aprobarPedido(aprobarTicketRequest);
    this.modal.close()
  }
}

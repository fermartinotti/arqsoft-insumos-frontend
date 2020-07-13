import { Component, Input } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/servicios/admin.service';
import { RechazarTicketRequest } from 'src/app/modelo/rechazarTicketRequest';

@Component({
  selector: 'app-modal-rechazo',
  templateUrl: './modal-rechazo.component.html',
  styleUrls: ['./modal-rechazo.component.css']
})
export class ModalRechazoComponent {
  
  @Input()
  idTicket: number;

  motivo: string = '';

  constructor(public modal: NgbActiveModal, private adminService: AdminService) { }

  async rechazarPedidoModal(){
    const rechazarTicketRequest = new RechazarTicketRequest(this.idTicket, this.motivo);
    await this.adminService.rechazarPedido(rechazarTicketRequest);
    console.log("Rechazo pedido");
    this.modal.close()
  }
}

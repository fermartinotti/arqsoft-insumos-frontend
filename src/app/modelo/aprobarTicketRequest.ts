export class AprobarTicketRequest{
    ticketId;
    proveedorId;
 
     constructor(ticketId, proveedorId){
         this.ticketId = ticketId;
         this.proveedorId = proveedorId;
     }
 }
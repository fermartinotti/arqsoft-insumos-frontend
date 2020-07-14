export class RechazarTicketRequest{
    idTicket;
    motivo:string;
 
     constructor(idTicket, motivo:string){
         this.idTicket = idTicket;
         this.motivo = motivo;
     }
 }
import { Insumo } from './insumo';
import { Estado } from './estado';
import { Area } from './area';

export class Pedido{
    id:number;
    email:string;
    insumo:Insumo;
    area:Area;
    estados:Array<Estado>;

    constructor(email:string, insumo:Insumo, area:Area, estados:Array<Estado>){
        this.email = email;
        this.insumo = insumo;
        this.area = area;
        this.estados = estados;
    }
    static crearDesdeJson(json:any): Pedido{
        const ticket = new Pedido(json.cliente.email, json.insumo, Area.crearDesdeJson(json.area), 
                                json.estados.map(estado => Estado.crearDesdeJson(estado)));
        ticket.setId(json.id);
        return ticket;
      }

    public setId(id:number){
        this.id = id;
    }
}
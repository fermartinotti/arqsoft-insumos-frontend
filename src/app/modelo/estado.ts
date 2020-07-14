import { Proveedor } from './proveedor';

export class Estado {
    type:string; 
    fecha:string;
    motivo:string;
    proveedor:Proveedor;
    
    constructor(type: string, fecha: string, motivo?:string, proveedor?:Proveedor){
        this.type = type;
        this.fecha = fecha;
        this.motivo = motivo;
        this.proveedor = proveedor;
    }

    static crearDesdeJson(json: any): Estado {
        return new Estado(json.type, json.fecha, json.motivo, json.proveedor);
    }
}
export class Estado {
    type:string; 
    fecha:string;
    motivo:string;
    
    constructor(type: string, fecha: string, motivo?:string){
        this.type = type;
        this.fecha = fecha;
        this.motivo = motivo;
    }

    static crearDesdeJson(json: any): Estado {
        return new Estado(json.type, json.fecha, json.motivo);
    }
}
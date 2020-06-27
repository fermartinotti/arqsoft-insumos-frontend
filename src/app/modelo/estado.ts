export class Estado{
    type:string; 
    fecha:string;
    
    constructor(type: string, fecha: string){
        this.type = type;
        this.fecha = fecha;
    }

    static crearDesdeJson(json: any): Estado{
        const estado = new Estado(json.type, json.fecha);
        return estado;
      }
}
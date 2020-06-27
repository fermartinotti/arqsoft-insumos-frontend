export class Area{
    id;
    nombre:string; 

    constructor(id, nombre: string){
        this.id = id;
        this.nombre = nombre;
    }
    
    static crearDesdeJson(json: any): Area{
        const area = new Area(json.id, json.nombre);
        return area;
      }
}
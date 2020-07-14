import { Insumo } from './insumo';

export class Proveedor{
    id:string;
    nombre:string; 
    insumos:Array<Insumo>;
    
    constructor(id: string, nombre: string, insumos: Array<Insumo>) {
        this.id = id;
        this.nombre = nombre;
        this.insumos = insumos;
    }

    static crearDesdeJson(json: any): Proveedor{
        const proveedor = new Proveedor(json.id, json.nombre, json.insumos.map(insumo => Insumo.crearDesdeJson(insumo)));
        return proveedor;
      }
}
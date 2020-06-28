import { Insumo } from './insumo';

export class Proveedor{
    nombre:string; 
    insumos:Array<Insumo>;
    
    constructor(nombre: string, insumos: Array<Insumo>){
        this.nombre = nombre;
        this.insumos = insumos;
    }

    static crearDesdeJson(json: any): Proveedor{
        const proveedor = new Proveedor(json.nombre, json.insumos.map(insumo => Insumo.crearDesdeJson(insumo)));
        return proveedor;
      }
}
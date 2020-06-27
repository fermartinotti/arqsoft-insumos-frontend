import { Insumo } from './insumo';

export class Medicamento extends Insumo{
    nombre:string
 
     constructor(type:string, nombre:string){
         super(type);
         this.nombre = nombre;
     }
 }
export class Insumo{
   type: string;

    constructor(type: string){
        this.type = type;
    }

    static crearDesdeJson(json: any): Insumo{
        const insumo = new Insumo(json.type);
        return insumo;
      }
}
export class Usuario{
    nombre: string;
    email: string;
    telefono: string;
    cargo: string;
    localidad: string;
    entidad: string;
    password: string;

    constructor(nombre: string, email: string, telefono: string, cargo: string, localidad: string, entidad: string, password: string){
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
        this.cargo = cargo;
        this.localidad = localidad;
        this.entidad = entidad;
        this.password = password;
    }
}
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import {map} from 'rxjs/operators';


// * Modelos **//
import { Usuario } from '../modelo/usuario';
import { LoginRequest } from '../modelo/loginRequest';
import { CrearTicketDTO } from '../modelo/crearTicketDTO';
import { Pedido } from '../modelo/pedido';
import { CancelarTicketRequest } from '../modelo/cancelarTicketRequest';
import { Area } from '../modelo/area';


export const baseURL = 'http://localhost:4200'

@Injectable()
export class UsuarioService {
    constructor(private httpClient: HttpClient, private router: Router ) {}

    async crearUsuario(usuario: Usuario): Promise<any>{
        return await this.httpClient.post(baseURL + '/insumos/auth/registro', usuario).toPromise();
    }

    async login(loginRequest:LoginRequest): Promise<any>{
        return await this.httpClient.post(baseURL + '/insumos/auth/login', loginRequest).toPromise();
    }

    async crearPedido(ticketDto:CrearTicketDTO): Promise<any> {
        return await this.httpClient.post(baseURL + '/insumos/ticket/nuevo', ticketDto, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`)
          }).toPromise()    
    }

    async getPedidos(): Promise<Array<Pedido>> {
        return await this.httpClient.get<Array<Pedido>>(baseURL + '/insumos/ticket/misTickets', {
            headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`)
          }).pipe(map(respuesta => respuesta.map(pedido => Pedido.crearDesdeJson(pedido)))).toPromise();  
    }

    async cancelarPedido(ticket:CancelarTicketRequest): Promise<any> {
        return await this.httpClient.post(baseURL + '/insumos/ticket/cancelarTicket', ticket, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`)
          }).toPromise();  
    }

    async getAreas():Promise<Array<Area>>{
        return await this.httpClient.get<Array<Area>>(baseURL + '/insumos/ticket/areas')
            .pipe(map(respuesta => respuesta.map(area => Area.crearDesdeJson(area)))).toPromise();  
    }

    estaLogueado():boolean{
        return !! localStorage.getItem('token');
    }

    getRole(){
        return localStorage.getItem('role')
    }

    esAdminLogueado(){
        if(this.estaLogueado()){
            return 'ROLE_ADMIN' === this.getRole(); 
        }
        return false;
    }

    esUsuarioLogueado(){
        if(this.estaLogueado()){
            return 'ROLE_USER' === this.getRole(); 
        }
        return false;
    }
    
    getToken() {
        return localStorage.getItem('token');
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        this.router.navigate(['/inicio']);
    }
}

import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Pedido } from '../modelo/pedido';
import { RechazarTicketRequest } from '../modelo/rechazarTicketRequest';
import { AprobarTicketRequest } from '../modelo/aprobarTicketRequest';
import { Proveedor } from '../modelo/proveedor';

export const baseURL = 'http://localhost:4200'

@Injectable()
export class AdminService {

    constructor(private httpClient: HttpClient) {}

    async getAllPedidos(): Promise<Array<Pedido>> {
        return await this.httpClient.get<Array<Pedido>>(baseURL + '/insumos/ticket/todos', {
            headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`)
          }).pipe(map(respuesta => respuesta.map(pedido => Pedido.crearDesdeJson(pedido)))).toPromise();  
    }

    async getPedidosRechazados(): Promise<Array<Pedido>> {
        return await this.httpClient.get<Array<Pedido>>(baseURL + '/insumos/ticket/rechazados', {
            headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`)
          }).pipe(map(respuesta => respuesta.map(pedido => Pedido.crearDesdeJson(pedido)))).toPromise();  
    }

    async getPedidosPendientes(): Promise<Array<Pedido>> {
        return await this.httpClient.get<Array<Pedido>>(baseURL + '/insumos/ticket/enviados', {
            headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`)
          }).pipe(map(respuesta => respuesta.map(pedido => Pedido.crearDesdeJson(pedido)))).toPromise();  
    }

    async rechazarPedido(ticket:RechazarTicketRequest): Promise<any> {
        return await this.httpClient.post(baseURL + '/insumos/ticket/rechazarTicket', ticket, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`)
          }).toPromise();  
    }

    async aprobarPedido(ticket:AprobarTicketRequest): Promise<any> {
        return await this.httpClient.post(baseURL + '/insumos/ticket/aprobar', ticket, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`)
          }).toPromise();  
    }

    async getAllProveedores(){
        return await this.httpClient.get<Array<Pedido>>(baseURL + '/insumos/proveedores', {
            headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`)
          }).pipe(map(respuesta => respuesta.map(proveedor => Proveedor.crearDesdeJson(proveedor)))).toPromise()          
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

}
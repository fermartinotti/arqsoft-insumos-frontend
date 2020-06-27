import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/modelo/pedido';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  enviarAListado:Pedido[];

  mensajeParaListado(mensaje: Pedido[]){
    this.enviarAListado = mensaje;
  }

  constructor() { }

  ngOnInit(): void {
  }

}

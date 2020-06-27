/* Módulos */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

/* Componentes */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/usuario/login/login.component';
import { RegistroComponent } from './componentes/usuario/registro/registro.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { CrearPedidoComponent } from './componentes/pedidos/crear-pedido/crear-pedido.component';
import { ListaPedidosComponent } from './componentes/pedidos/lista-pedidos/lista-pedidos.component';
import { PedidosComponent } from './componentes/pedidos/pedidos.component';

/* Servicios */

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

/* Modals */
import { ModalCloseComponent } from './componentes/modals/modal-close/modal-close.layout';

/* Guards */
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './auth/role.guard';
import { ModalConfirmacionComponent } from './componentes/modals/modal-confirmacion/modal-confirmacion.component';

/* Externals */
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalListComponent } from './componentes/modals/modal-list/modal-list.component';

import { UsuarioService } from './servicios/usuario.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    NavbarComponent,
    InicioComponent,
    ModalCloseComponent,
    ModalConfirmacionComponent,
    CrearPedidoComponent,
    ListaPedidosComponent,
    PedidosComponent,
    ModalConfirmacionComponent,
    ModalListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgxPaginationModule
  ],
  exports: [
    HttpClientModule
  ],
  providers: [UsuarioService, AuthGuard, RoleGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

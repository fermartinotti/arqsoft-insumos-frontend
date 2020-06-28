import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './auth/role.guard';

// ** Components ** //
// import {InicioComponent} from './componentes/inicio/inicio.component';
import {RegistroComponent} from './componentes/usuario/registro/registro.component';
import {LoginComponent} from './componentes/usuario/login/login.component';
import { PedidosComponent } from './componentes/pedidos/pedidos.component';
import { AdminPedidosComponent } from './componentes/admin/admin-pedidos/admin-pedidos.component';



const routes: Routes = [  
  {path: '', component:LoginComponent},
  {path: 'inicio', component:LoginComponent},
  {path: 'registro', component:RegistroComponent},
  {path: 'login', component:LoginComponent},
  {path: 'pedido', component:PedidosComponent, canActivate: [AuthGuard]},
  {path:'adminPedidos', component:AdminPedidosComponent, canActivate: [RoleGuard]},
  {path: '**', redirectTo: 'inicio'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

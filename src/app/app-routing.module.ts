import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import { ConfiguracionComponent } from './pages/configuracion/configuracion.component';
import { AgendasComponent } from './pages/agendas/agendas.component';
import { ContactosComponent } from './pages/contactos/contactos.component'
import {AdminCitasComponent} from "./pages/admin-citas/admin-citas.component";
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path:'Contactos/:advertiser_id',
    component: ContactosComponent,
  },
  {
    path:'Configuracion/:advertiser_id',
    component: ConfiguracionComponent
  },
  {
    path:'administrarCitas/:advertiser_id',
    component: AdminCitasComponent
  },
  {
    path:'agendas/:advertiser_id',
    component: AgendasComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

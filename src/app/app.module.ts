import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { modalAddContact } from "./components/modalAddContact/modalAddContact.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//FontAwesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

//materialComponents
import {MaterialExampleModule} from '../material.module';
import {MatPaginatorModule} from '@angular/material/paginator';



import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { modalEditContact } from './components/modalEditContact/modalEditContact.component';
import { ListadoBcProduct } from './components/listBcProducts/listBcProduct.component';


// calendario
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';



//COMPONENTES
import { HomeComponent } from './pages/home/home.component';
import { ButtonConofig } from './components/buttonConfig/buttonConfig.component';
import { ConfiguracionComponent } from './pages/configuracion/configuracion.component';
import { AgendasComponent } from './pages/agendas/agendas.component';
import { ContactosComponent } from './pages/contactos/contactos.component';
import { RecursosCardComponent } from './components/recursos-card/recursos-card.component';
import { AdminCitasComponent } from './pages/admin-citas/admin-citas.component';
import { CalendarComponent } from './components/calendar/calendar.component'
import { CitaCalendarComponent } from './components/cita-calendar/cita-calendar.component';


import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { RecursosViewCalendarComponent } from './components/recursos-view-calendar/recursos-view-calendar.component';
import { MultiselectRecursosComponent } from './components/multiselect-recursos/multiselect-recursos.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import { CreateCitaComponent } from './components/create-cita/create-cita.component';
import { DetailCitaComponent } from './components/detail-cita/detail-cita.component';
import { SelectRecursosComponent } from './components/select-recursos/select-recursos.component';
import { RecursosConfigComponent } from './components/recursos-config/recursos-config.component';
import { AgendarRecursoComponent } from './components/agendar-recurso/agendar-recurso.component';
import { InteraccionContactoComponent } from './components/interaccion-contacto/interaccion-contacto.component';
import { UrlSerializer } from '@angular/router';
import { LowerCaseUrlSerializer } from './Utils/LowerCaseUrlSerializer';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import {StoreModule} from "@ngrx/store";
import {calendarReducer} from "./reducers/calendar.reducer";
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DetailInteractionComponent } from './components/detalleInteraccion/detalle-interaccion.component';

registerLocaleData(localeEs);

@NgModule({
    declarations: [
        HomeComponent,
        AppComponent,
        FormComponent,
        NavBarComponent,
        modalAddContact,
        modalEditContact,
        ButtonConofig,
        ListadoBcProduct,
        ConfiguracionComponent,
        AgendasComponent,
        ContactosComponent,
        RecursosCardComponent,
        AdminCitasComponent,
        CalendarComponent,
        CitaCalendarComponent,
        RecursosViewCalendarComponent,
        MultiselectRecursosComponent,
        CreateCitaComponent,
        DetailCitaComponent,
        SelectRecursosComponent,
        RecursosConfigComponent,
        AgendarRecursoComponent,
        InteraccionContactoComponent,
        LoadingSpinnerComponent,
        DetailInteractionComponent
    ],
    providers: [
        {
            provide: UrlSerializer,
            useClass: LowerCaseUrlSerializer
        },
        {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        BrowserAnimationsModule,
        FontAwesomeModule,
        MaterialExampleModule,
        AngularMultiSelectModule,
        MatPaginatorModule,
        [SweetAlert2Module.forRoot()],
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
        }),
        MatDatepickerModule,
        StoreModule.forRoot({ calendar: calendarReducer }),

    ]
})
export class AppModule { }

import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import { InteraccionModel } from 'src/app/models/InteraccionModel';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faIdCard } from '@fortawesome/free-solid-svg-icons';


import { ServiceContact } from '../../services/contacto/contacto.service'

import { ServiceInteraction } from '../../services/Interaccion/interaccion.service'
import {InteraccionesContacto} from "../../models/InteraccionesContacto";
import Swal from 'sweetalert2';
import { DetailInteractionModel } from 'src/app/models/DetailInteractionModel';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { utilsFunctions } from 'src/app/Utils/UtilsFunctions';


@Component({
  selector: 'app-interaccion-contacto',
  templateUrl: './interaccion-contacto.component.html',
  styleUrls: ['./interaccion-contacto.component.scss']
})
export class InteraccionContactoComponent implements OnInit{

  @Input() inputContactId: number;
  @Input() loadInteraccion: boolean;
  @Input() advertiser: number;


  public bcProductId = new utilsFunctions;
  public listInteracciones: InteraccionesContacto[] = [];
  public loadingInteracciones: boolean;
  public errorAlCargarInteracciones: boolean;
  public detailInteraction: DetailInteractionModel[];
  public bcProduct = new utilsFunctions();
  public getadvertiser: number;

  faPhoneAlt=faPhoneAlt;
  faCalendarAlt=faCalendarAlt;
  faInfoCircle=faInfoCircle;
  faIdCard=faIdCard;


  constructor(private  ServiceInteraction: ServiceInteraction,
              private  ServiceContact: ServiceContact,
              private modalService: NgbModal){}


  ngOnInit(): void {
 this.getadvertiser = this.advertiser;
  }

  ngOnChanges(changes: any) {
      if (changes.loadInteraccion.currentValue == false ){          
          this.GetInteractionByIdContact(this.inputContactId);
      }
       // You can also use categoryId.previousValue and
        // categoryId.firstChange for comparing old and new values

    }

  public GetInteractionByIdContact(contactId: number){
    let bcproduct = this.bcProduct.getBcProduct();
      this.loadingInteracciones = true;
      this.errorAlCargarInteracciones = false;
      this.ServiceContact.getInteractionByIdContact(contactId, bcproduct)
          .subscribe(
              res => {               

                this.listInteracciones = res;
                  this.loadingInteracciones = false;

              },
              err => {
                  this.loadingInteracciones = false;
                  this.errorAlCargarInteracciones = true;

              }

          /*  if(response.length > 0) {


              var fechaTipo = response[0].dateInteracction.split('T')
              this.listInteracciones = []
              response.forEach((element: { type: any; statusCode: any; }) => {

                this.interaccion = { }

                this.interaccion = {
                  tipo: element.type,
                  status: element.statusCode,
                  fecha: fechaTipo[0] + ' '+ fechaTipo[1]
                }

                this.listInteracciones.push(this.interaccion)

              });

            }*/


          )


  }
  public openLg(content: any, itemId:any) {
    
        this.modalService.open(content, {size: 'lg'});
  

}
  public detailInteration(id:any){
    let pipe = new DatePipe("es");
    this.ServiceInteraction.getDetailInteractionById(id)
    .subscribe((response)=>{
      console.log(response)
      let dinamycInteraccion = [
        {nombre: "Nombre del Padre",value:"Jesus Rodriguez"},
        {nombre: "Lugar de Nacimiento",value:"Veracruz"},
        {nombre: "Fecha de nacimiento",value:"12-12-1987"}
      ]
      //let dinamycInteraccion: any[]=[];
      let htmlDinamycField = this.mapHtml(response[0].dinamycData);
      let fechaCita = (response[0].initialDate != null) ? pipe.transform(response[0].initialDate, "mediumDate"): "Fecha no capturada";
      let horaCita = (response[0].initialDate != null) ? pipe.transform(response[0].initialDate, "hh:mm a")+" — "+ pipe.transform(response[0].finalDate, "hh:mm a"): "Hora no capturada"
      let statusInteraccion = `${(response[0].statusCode == "A") ? "Aceptada" : (response[0].statusCode == "P") ? "Pendiente" : (response[0].statusCode == "R") ? "Rechazada" : "No Aplica"}`;
      let recurso = `${(response[0].resource != null) ? response[0].resource : "Agenda no capturada"}`;
      Swal.fire({
        title: 'Detalle de Interacción',
        icon: 'info',
        html:
        `<div id="container table" style="max-height: 300px;overflow: scroll;">
        <div class="header" style="display:flex; margin-bottom: 8px; border-bottom: 1px solid gray;padding-bottom: 4px;">
          <div class="col-6 td" style="display:flex"><strong>Dato</strong></div>
          <div class="col-6" style="display:flex"><strong>Informacion</strong></div>
        </div>
        <div class="filas">
    
        <div> <div class="row" >    </div>
        <div style="display:flex; margin-bottom: 8px; border-bottom: 1px solid gray;padding-bottom: 4px;">  <div class="col-6" style="display:flex">Tipo de cita:</div> <div class="col-6" style="display:flex">${response[0].interactionType}</div></div>
        <div style="display:flex; margin-bottom: 8px; border-bottom: 1px solid gray;padding-bottom: 4px;">  <div class="col-6" style="display:flex">Estatus de la cita:</div> <div class="col-6" style="display:flex"><strong>${statusInteraccion}</strong></div></div>
        <div style="display:flex; margin-bottom: 8px; border-bottom: 1px solid gray;padding-bottom: 4px;">  <div class="col-6" style="display:flex">Fecha de la cita:</div> <div class="col-6" style="display:flex">${fechaCita}</div></div>
        <div style=" display:flex; margin-bottom: 8px; border-bottom: 1px solid gray;padding-bottom: 4px;"> <div class="col-6" style="display:flex">Hora de la cita:</div> <div class="col-6" style="display:flex">${horaCita}</div></div>
        <div style="display:flex; margin-bottom: 8px; border-bottom: 1px solid gray;padding-bottom: 4px;"> <div class="col-6" style="display:flex">Agenda:</div> <div class="col-6" style="display:flex">${recurso}</div> </div>
        ${htmlDinamycField}
        </div style="display:flex; margin-bottom: 8px; border-bottom: 1px solid gray;padding-bottom: 4px;">
    </div>`,
        showCloseButton: true,
        focusConfirm: false
      })
    },err =>{
      console.log(err)
    })

  }
  public mapHtml(arrayfields:any){
    let resultHtml=""
    if(arrayfields.length > 0){
      for(var i = 0; i < arrayfields.length; i++) {
        resultHtml += `<div style="display:flex; margin-bottom: 8px; border-bottom: 1px solid gray;padding-bottom: 4px;"> <div class="col-6" style="display:flex">${arrayfields[i].name}:</div> <div class="col-6" style="display:flex">${arrayfields[i].value}</div> </div>`;
      }
      return resultHtml;
    }else {
      return '';
    }
  }


}

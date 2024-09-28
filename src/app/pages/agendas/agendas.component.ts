import { Component, OnInit } from '@angular/core';
import {faInbox, faPlus} from '@fortawesome/free-solid-svg-icons';
import { RecursoModel } from 'src/app/models/recursoModel';
import { horariosModel } from 'src/app/models/horarios';
import { ServiceContact } from '../../services/contacto/contacto.service'
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { ServiceCalendario } from 'src/app/services/Calendario/Calendario.service';
import { ActivatedRoute,Router } from '@angular/router';
import Swal from "sweetalert2";
import { utilsFunctions } from 'src/app/Utils/UtilsFunctions';

@Component({
  selector: 'app-agendas',
  templateUrl: './agendas.component.html',
  styleUrls: ['./agendas.component.scss']
})
export class AgendasComponent    implements OnInit {
  faInbox=faInbox;

  public faAd = faPlus;
  
    Recurso: RecursoModel []=[];
    siteNAmeByBcProduct: any;
    public closeResult = '';
    BcProductId: any;
    SiteName: any;
    public advertiser: any;
    public recursosLength: number;
    public bcProductId2 = new utilsFunctions;

    constructor(
      private  ServiceContact: ServiceContact,
      private  ServiceCalendario: ServiceCalendario,
      private modalService: NgbModal,
      private activatedRoute: ActivatedRoute,
      private router: Router,
    ){}
    ngOnInit(): void {
   
      this.advertiser = this.activatedRoute.snapshot.params["advertiser_id"];   
    }
    public renderContacts(data: any){
     this.siteNAmeByBcProduct = data[0].siteName;
     this.BcProductId=data[0].id;
     this.SiteName= data[0].siteName;

     this.GetCalendar() ;
    }
    public open(item: any) {
        if (this.recursosLength>0 && this.recursosLength<=3){
         
            this.modalService.open(item, { ariaLabelledBy: 'modal-basic-title' }).result.then(
                (result) => {
                    this.closeResult = `Closed with: ${result}`;
                },
                reason => {
                    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
                }

            );
        }else {
            Swal.fire(
                'No se pueden Agregar más Agendas',
                'Has alcanzado el límite de Agendas',
                'info'
            )
        }

    }
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return `with: ${reason}`;
      }
      }
  public closeModalCitas($event: boolean) {
 
    if ($event == false)
    {
      this.modalService.dismissAll();
      this.GetCalendar() ;
    }
  
  }
  public GetCalendar() {
  this.ServiceCalendario.getListCalendar(this.BcProductId).subscribe(response =>
      {
      this.Recurso=[];
      for(let recur of response)
       {
        let horarios: horariosModel[]=[];
        for(let day of recur.openingDays)
        for(let hour of day.hours)
        horarios.push({ dia: day.dayName,closedDay: day.closedDay,horarioApertura: hour.startTime,horarioCierre: hour.endTime});
        
        let rec={
          resourceId:recur.calendarId,
          tipo: recur.calendarType,
          nombre:recur.resource,
          typeId:recur.calendarTypeId,
          horarios:horarios,
          bcProductId:this.BcProductId ,
          siteName:this.SiteName,
        };

        this.Recurso.push(rec);
       }
      },error => { console.log(error)});
  }

}

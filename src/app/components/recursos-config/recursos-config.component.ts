import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ServiceContact } from '../../services/contacto/contacto.service'
import { faInbox } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { RecursoModel } from 'src/app/models/recursoModel';
import { horariosModel } from 'src/app/models/horarios';
import { ServiceCalendario} from 'src/app/services/Calendario/Calendario.service';
import Swal from 'sweetalert2';
import { ModalDismissReasons,NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OpeningCalendarResponse } from 'src/app/models/OpeningCalendarResponse';
import { OpeningDayResponse } from 'src/app/models/OpeningDayResponse';

@Component({
  selector: 'app-recursos-config',
  templateUrl: './recursos-config.component.html',
  styleUrls: ['./recursos-config.component.scss']
})
export class RecursosConfigComponent implements OnInit {
  faInbox=faInbox;
  faCalendarAlt=faCalendarAlt;
  faPhoneAlt=faPhoneAlt;
  faTrashAlt=faTrashAlt;
  facog=faCog;
  public newRecurso?: RecursoModel[];

  public modalRecurso: RecursoModel={
    tipo:"",
    nombre: "",
    typeId: 0,
    calendarId:0,
    horarios: [],
    bcProductId: ""
  };
  public newBcProductId: any;
  public newSiteName: any;
  public closeResult = '';
  BcProductId: any;
  public CalendarId: any;
  public OpeningDay:OpeningDayResponse[] = []
  public Calendar: OpeningCalendarResponse={
    calendarId: 0,
    resource:"",
    bcProductId:0,
    calendarTypeId:0,
    timeAppointment:"00:30",
    isDeleted:false,
    isActive:true,
    openingDays: this.OpeningDay
  }
  @Output() closeModal = new EventEmitter<boolean>();
  @Output() recursosLength = new EventEmitter<number>();
  @Input() recurso?: RecursoModel[];
  @Input() bcProductId?: string;
  @Input() siteName?: string;
  constructor(
    private  ServiceCalendario: ServiceCalendario,
    private modalService: NgbModal
  ) {
   
   }
  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges) //recursos
  {
   if(changes["recurso"]!=null)
    this.newRecurso=changes["recurso"].currentValue;
    this.recursosLength.emit(this.newRecurso?.length);
    console.log( this.newRecurso)
  }

  public testTypeResource(item:any){
    if(item.typeId == '2'){
      return 'containerCardCallBack'
    }else {
      return 'containerCardAgendarCita'
    }
  }

  public DeleteCalendar(item:any)
  {
    Swal.fire({
      title: 'Eliminar.',
      html: "Si elimina esta agenda las citas pendientes seran borradas. <b>¿Estas seguro que desea eliminar la agenda "+item.nombre+"?</b>",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
    this.ServiceCalendario.delCalendar(item.resourceId).subscribe(response =>
      {
     // this.GetCalendar();     
       Swal.fire(
        'Eliminado!',
        'El recurso ha sido eliminado.',
        'success'
      )
      this.closeModal.emit(false);
     },error => { console.log(error)});
      }
    })
  }
 
  public open(content: any,item: any) 
  {
    this.BcProductId=item.bcProductId;
    this.Calendar.resource=item.nombre;
    this.CalendarId=item.resourceId;
    this.newSiteName=item.siteName;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
    );
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

    this.BcProductId=this.BcProductId;
    if ($event == false)
    {
     this.modalService.dismissAll();
     this.closeModal.emit(false);
    }
  }

}

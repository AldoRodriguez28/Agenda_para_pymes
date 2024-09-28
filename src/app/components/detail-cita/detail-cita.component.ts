import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {CalendarEvent} from "angular-calendar";
import {RecursoModel} from "../../models/recursoModel"
import { ServiceCalendario } from '../../services/Calendario/Calendario.service'
import { pipe } from 'rxjs/internal/util/pipe';
import { DatePipe } from '@angular/common';
import { time } from '../../Utils/Times'
import { StatusApoimentEnum } from 'src/app/models/StatusApoimentEnum';
import { StatusApoiment } from 'src/app/models/StatusApoiment';
import Swal from 'sweetalert2';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentUpdate } from 'src/app/models/AppoinmentUpdate';
import { TimeInitModel } from 'src/app/models/TimeInitModel';
import { utilsFunctions } from 'src/app/Utils/UtilsFunctions';


@Component({
  selector: 'app-detail-cita',
  templateUrl: './detail-cita.component.html',
  styleUrls: ['./detail-cita.component.scss'],
  
})
export class DetailCitaComponent {
  @Input() event: CalendarEvent;
  @Input() recursos: RecursoModel[];
  @Input() siteName?: any;
  @Input() idAppointment?: any;
  @Input() flagExpired?: boolean;



  @Output() close = new EventEmitter<()=> {}>();
  @Output() EventCalendar = new EventEmitter<number>();
  @Output() UpdateAppointment = new EventEmitter<() =>{}>();

  statusApoiment = StatusApoimentEnum;
  public bcProductIdUtils = new utilsFunctions;
  public idCita: any;
  public idRecursoSelecte: any;
  public timeInit: TimeInitModel[] = [];
  public newTimeInit:TimeInitModel = {
    calendarId: 0,
    dateCalendar: null,
    dayNumber:0,
    endHour:"",
    excuteTime:null,
    initialDate:"",
    startHour:"",
    typeCalendar:0

  }
  public listaRecursos: RecursoModel[];
  public appointmentUpdate: AppointmentUpdate ={
    parentLocation: "",
    sendEmailClient: false,
    sendEmailBussines: false,
    contactRequest: {
      contactName: "",
      phone: "",
      mobil: "",
      eMail: "",
      comment: "",
      siteName: "",
      interactionType: 0},
    scheduleRequest: {
      appointmentId: 0,
      calendarId: 0,
      dateCalendar: "",
      appointmentTime: "",
      observations: "",
      statusCode: ""},
    notificationCode: ""
  };
  public detailCita: any = {
    recurso: "",
    fecha: "",
    hora:"",
    nombre:"",
    telefono:"",
    movil:"",
    email:"",
    comentario:"",
    statusCode:""

  }

  public aceptandoEstatus = false;
  public rechazandoEstatus = false;
  public errorActualizarEstatus = false;

  public regexPhone:string = "^[0-9]{10}$";
  public regexEmail = "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$";
  public pipe = new DatePipe("en-US");

  public bcProductId:any;
  public input_bcProduct:any;
  public statusExpirado?: boolean;
  constructor(
    private  ServiceCalendario : ServiceCalendario

  ) {

  }
  ngOnInit(): void {
    if(this.idAppointment){
      this.idCita = this.idAppointment;
    }
    if(this.event){
      this.idCita =this.event.id
    }
      this.ServiceCalendario.getAppointmentByAppointmentId(this.idCita)
      .subscribe(data =>{    
        this.getDetailSelected(data)
      })
      this.listaRecursos = this.recursos;      
      this.input_bcProduct = this.bcProductIdUtils.getBcProduct()
      this.statusExpirado = this.flagExpired;
  }
  public CloseModal () {
    this.close.emit();
  }
  public CalendarEvent($event:any)
  {  
    
    // this.calendarId = $event  
    // this.isSelect = true;
    // this.date = new Date();
    // console.log(this.date);
    // this.GetAppointmentsAvailable()
    
  }
  public getDetailSelected(appointment:any){
    
    this.idRecursoSelecte = appointment.resource;
    this.detailCita.fecha = new Date(appointment.initialDate) ;

    var pipe = new DatePipe("en-US");
    let date = pipe.transform(this.detailCita.fecha, "yyyy-MM-dd");  
    
    let dateService = date as string
    this.ServiceCalendario.getHoursAvailableByDate(this.input_bcProduct, dateService, appointment.calendarTypeId,appointment.calendarId)
    .subscribe((response) => {       
      this.timeInit = response;
      
      let initialDate = this.pipe.transform(appointment.initialDate,"HH:mm") as string;
      let finalDate = this.pipe.transform(appointment.finalDate,"HH:mm") as string;
     
      this.newTimeInit.calendarId = this.timeInit[0].calendarId
      this.newTimeInit.dateCalendar = this.timeInit[0].dateCalendar
      this.newTimeInit.dayNumber = this.timeInit[0].dayNumber
      this.newTimeInit.endHour = finalDate
      this.newTimeInit.excuteTime = this.timeInit[0].excuteTime
      this.newTimeInit.initialDate = null
      this.newTimeInit.startHour = initialDate
      this.newTimeInit.typeCalendar = this.timeInit[0].typeCalendar

      
      this.timeInit.push(this.newTimeInit)

      this.newTimeInit=
      {
        calendarId: 0,
        dateCalendar: null,
        dayNumber:0,
        endHour:"",
        excuteTime:null,
        initialDate:"",
        startHour:"",
        typeCalendar:0
      }

      this.detailCita.hora = this.pipe.transform(appointment.initialDate,"HH:mm");    
      this.detailCita.nombre = appointment.contactName;
      this.detailCita.telefono = appointment.phone;
      this.detailCita.movil = appointment.mobil;
      this.detailCita.email = appointment.eMail;
      this.detailCita.comentario = appointment.observations;
      this.detailCita.statusCode = appointment.statusCodeId;

    });
    
  }
  public getDataToUpdate(){
    var pipe = new DatePipe("en-US");
    let date = pipe.transform(this.detailCita.fecha, "yyyy-MM-dd");  
  
    //this.appointmentUpdate.parentLocation = "";
    this.appointmentUpdate.contactRequest.contactName = this.detailCita.nombre;
    this.appointmentUpdate.contactRequest.phone = this.detailCita.telefono;
    this.appointmentUpdate.contactRequest.eMail = this.detailCita.email;
    this.appointmentUpdate.contactRequest.phone = this.detailCita.telefono;
    this.appointmentUpdate.contactRequest.comment = this.detailCita.comentario;
    this.appointmentUpdate.contactRequest.siteName = this.input_bcProduct;
    //this.appointmentUpdate.contactRequest.interactionType = ;
    this.appointmentUpdate.scheduleRequest.appointmentId = this.idCita;
   // this.appointmentUpdate.scheduleRequest.calendarId = ;
   this.appointmentUpdate.scheduleRequest.dateCalendar = date!;
   
   let timeSelected = this.timeInit.filter( x => x.startHour == this.detailCita.hora)
   this.appointmentUpdate.scheduleRequest.appointmentTime =  timeSelected[0].startHour+"-"+timeSelected[0].endHour;
 


   this.appointmentUpdate.scheduleRequest.observations = this.detailCita.comentario;
   this.appointmentUpdate.scheduleRequest.statusCode = this.detailCita.statusCode;
   
   return this.appointmentUpdate
  }
  public putAppointment(){
    let appointmentUpdate = this.getDataToUpdate()
    this.ServiceCalendario.putAppointmentByAppointment(appointmentUpdate)
    .subscribe((response)=>{
      
      Swal.fire({
        icon: 'success',
        title: 'Actualizado.',
        text: 'Se actualizo correctamente.',
      })
      this.UpdateAppointment.emit()
    }, err =>{ 
      Swal.fire({
        icon: 'error',
        title: 'Error.',
        text: 'Hubo un error al actualizar tu cita.',
      }) 
      console.log(err) 
    })
    this.close.emit();

    
  }
  //actualizando y rechazando o aceptando cita
  public updateCita(idApoiment: number, status: StatusApoimentEnum){
    const statusApoimens: StatusApoiment = {
      appointmentId: idApoiment,
      statusCode: status
    }
    if (status == StatusApoimentEnum.Rechazado){
      this.rechazandoEstatus = true;
    }
    if (status == StatusApoimentEnum.Aceptado){
      this.aceptandoEstatus = true;
    }
    this.errorActualizarEstatus = false;
    this.ServiceCalendario.updateStatusAppoiment(statusApoimens)
        .subscribe((response) => {

            let title = "";
            let text = "";
              if (status == StatusApoimentEnum.Rechazado){
                this.rechazandoEstatus = false;   
                title = "Rechazado." 
                text = "Se rechazo correctamente."            
              }
              if (status == StatusApoimentEnum.Aceptado){
                this.aceptandoEstatus = false;
                title = "Aceptado." 
                text = "Fue aceptado correctamente."

              }
              this.UpdateAppointment.emit();
              this.close.emit();

              Swal.fire({
                icon: 'success',
                title: title,
                text:  text,
              }) 

            },
            (error) => {
              if (status == StatusApoimentEnum.Rechazado){
                this.rechazandoEstatus = false;
              }
              if (status == StatusApoimentEnum.Aceptado){
                this.aceptandoEstatus = false;
              }
              this.errorActualizarEstatus = false;
            });
  }


}

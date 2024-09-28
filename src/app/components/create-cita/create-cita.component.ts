import { DatePipe } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { DateAdapter } from "@angular/material/core";
import { AddContactModel } from "src/app/models/ContactModel";
import { RecursoModel } from "src/app/models/recursoModel";
import { ServiceCalendario } from "src/app/services/Calendario/Calendario.service";
import { selectTime, time } from "src/app/Utils/Times";
import Swal from "sweetalert2";

@Component({
  selector: "app-create-cita",
  templateUrl: "./create-cita.component.html",
  styleUrls: ["./create-cita.component.scss"],
})
export class CreateCitaComponent {
  @Output() closeModal = new EventEmitter<boolean>(); 
  @Output() scheduleCreate = new EventEmitter<()=>{}>; 
  @Input() recursos: RecursoModel[];
  @Input() siteName: any;
  @Input() bcProduct: any;

  public typeCalendar: number = 0; 
  public isSelect:boolean = false;
  public timeInit: any = [];
  public date: Date = new Date();
  public calendarId: number = 0;
  public fullName:string = "";
  public phone:string = "";
  public comment:string = "";
  public email:string = "";
  public selectSchedule:string = "";
  public regexPhone:string = "^[0-9]{10}$";
  public regexEmail = "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$";
  public siteNameCita:any;
  public minDate:Date = new Date()
  public contactoSchedule: AddContactModel = {
    parentLocation: "",
    sendEmailClient: false,
    sendEmailBussines:false,
    contactRequest: {
      contactName: "",
      phone: "",
      eMail: "",
      comment: "",
      siteName: "",
      mobil:"",
      interactionType:0,
      device:"",
      origin:"",
      data:"",
      uri:"",
      bcProduct:0
    },
    scheduleRequest: {
      calendarId: 0,
      dateCalendar: "",
      appointmentTime: "",
      observations: "",
      statusCode: "P"
    },
    notificationCode: ""
  };

  public guardando: boolean = false;

  constructor(private service: ServiceCalendario,
    private dateAdapter: DateAdapter<Date>) {
      this.dateAdapter.setLocale('es');

    }



  ngOnInit(): void {
    this.siteNameCita = this.siteName;
}

  public closeModalCitas(isOpen: boolean) {
    this.closeModal.emit(isOpen);
  }

  public TypeCalendarEvent($event:any)
  {
    this.typeCalendar = $event   
    this.GetAppointmentsAvailable() 
  }

  public CalendarEvent($event:any)
  {    
    this.calendarId = $event  
    this.isSelect = true;
    this.date = new Date();     
  }

  

  public GetAppointmentsAvailable() {
    let pipe = new DatePipe("en-US");
    let date = pipe.transform(this.date, "yyyy-MM-dd");      
    console.log('BCProduct',this.bcProduct)
    if (this.calendarId > 0 && date != null) {
      this.service
        .getHoursAvailableByDate(this.bcProduct, date, this.typeCalendar,this.calendarId )
        .subscribe((response) => {  
          console.log(response)
          //response.sort((hora1:any, hora2:any) => this.horaAMinutos(hora1.startHour) - this.horaAMinutos(hora2.startHour));     
          this.timeInit = response;
        });
      }
  }
  
  public horaAMinutos(horaStr:any) {
    let [hora, minutos] = horaStr.split(":").map(Number);
    return hora * 60 + minutos;
  }

  public CreateAppointment() {
    this.guardando = true;

    if(!this.ValidateCreateAppointment()){

      var device = "Desktop";
      this.contactoSchedule.contactRequest.comment = this.comment
      this.contactoSchedule.contactRequest.contactName = this.fullName
      this.contactoSchedule.contactRequest.eMail = this.email
      this.contactoSchedule.contactRequest.phone = this.phone
      this.contactoSchedule.contactRequest.mobil = ""
      this.contactoSchedule.contactRequest.siteName = "0"
      this.contactoSchedule.contactRequest.bcProduct = Number(this.bcProduct)
      this.contactoSchedule.contactRequest.interactionType = this.typeCalendar;

      if( navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i))
      {
        device = "Mobile"
      }

      if(navigator.userAgent.match(/iPad/i)){device = "Tablet"}
      
      this.contactoSchedule.contactRequest.device = device
      this.contactoSchedule.contactRequest.origin = "MiNegocio"
      this.contactoSchedule.contactRequest.uri = window.location.toString()
      this.contactoSchedule.contactRequest.data = ""
      
      var pipe = new DatePipe("en-US");
      let date = pipe.transform(this.date, "yyyy-MM-dd");   
      
      var timeSchedule = selectTime;
      let scheduleSelected = timeSchedule.filter( x => x.value == this.selectSchedule)      
      
      this.contactoSchedule.scheduleRequest.calendarId = this.calendarId;
      this.contactoSchedule.scheduleRequest.observations = this.comment;
      this.contactoSchedule.scheduleRequest.dateCalendar = date as string;;
      this.contactoSchedule.scheduleRequest.appointmentTime = scheduleSelected[0].schedule;
      this.contactoSchedule.scheduleRequest.statusCode = "P";

      this.service.InsertAppointment(this.contactoSchedule).subscribe(data => {
        
        if(data.success) {
          this.guardando =false;
          this.scheduleCreate.emit();
          this.closeModalCitas(false)
          Swal.fire({
            icon: 'success',
            title: 'Agendada.',
            text: 'Se agrego correctamente.',
          }) 
        }
        
      },
      err => {
          console.log(err);
        this.guardando =false;
      });
    
    }else {
      this.guardando = false
    }
  }

  ValidateCreateAppointment()
  {
    var errorInput= "";
    var phoneExpression = RegExp(this.regexPhone)
    var emailRegex = RegExp(this.regexEmail)
    
    if(!phoneExpression.test(this.phone.toString()))
      errorInput = " * telefono"
    if(!emailRegex.test(this.email.toString()))
      errorInput = errorInput + " * email"  
    console.log('validate',this.selectSchedule)
    if(!this.selectSchedule)
      errorInput = errorInput + " * Horario"  

    if(errorInput)
    {

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hay errores en los siguientes campos: '+ errorInput +' favor de validar!',
      }) 
      
    }
    return errorInput
  } 
 
}

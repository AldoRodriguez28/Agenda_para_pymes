import {Component,Input, EventEmitter,SimpleChanges, Output,OnInit,OnChanges} from '@angular/core';
import {faCalendar, faPhone, faPlus, faTrashAlt,faCog} from "@fortawesome/free-solid-svg-icons";
import { ServiceCalendario} from 'src/app/services/Calendario/Calendario.service';
import { CalendarAddUpdModel } from 'src/app/models/CalendarAddUpdModel';
import { OpeningCalendarResponse } from 'src/app/models/OpeningCalendarResponse';
import { OpeningDayResponse } from 'src/app/models/OpeningDayResponse';
import { HoursResponse } from 'src/app/models/HoursResponse';
import { HorarioAtencion } from 'src/app/models/HorarioAtencion';
import { dayOfWeek, time } from 'src/app/Utils/Times';
import { HourBussinesDetailResponse } from 'src/app/models/HourBussinesDetailResponse';
import Swal from 'sweetalert2';
import { utilsFunctions } from 'src/app/Utils/UtilsFunctions';
import { ServiceConfiguracion } from '../../services/Configuracion/Configuracion.service'

@Component({
  selector: 'app-agendar-recurso',
  templateUrl: './agendar-recurso.component.html',
  styleUrls: ['./agendar-recurso.component.scss']
})
export class AgendarRecursoComponent  implements OnChanges {
  faGears= faCog; 
  faPlus = faPlus;
  faTrashAlt=faTrashAlt;
  public bcProductId2 = new utilsFunctions;


  @Output() closeModal = new EventEmitter<boolean>();
  @Input() bcProductId?: string;
  @Input() calendarId?: number;
  @Input() siteName?: string;
  @Input() calendar: OpeningCalendarResponse;

  //timeInit =[] = time
  //timeEnd =[] = time
  //week=[] = dayOfWeek


public timeInit:HourBussinesDetailResponse[] =[] 
  /*  timeEnd =[] 
  week=[] 
  */
  public AgBcProductId: any;
  public AgCalendarId: any;
  public AgSiteName: any;
  public OpeningDay:OpeningDayResponse[] = []

  public AgCalendar:OpeningCalendarResponse={
  calendarId: 0,
	resource:"",
	bcProductId:0,
	calendarTypeId:0,
	timeAppointment:"00:30",
	isDeleted:false,
	isActive:true,
  openingDays: this.OpeningDay
};
  
  constructor(
    private  ServiceCalendario: ServiceCalendario,
    private  ServiceConfiguracion: ServiceConfiguracion
  ) {
   
   }
  public faAd = faPlus;
  public faPhone = faPhone;
  public faCalendar = faCalendar;
  ngOnInit(): void
   {


    this.OpeningDay.push(
      {
      dayId: 1,
      dayName: "Domingo",
      closedDay:false,
      closedDayB:false,
      hours: [{
        scheduleServiceId: 0,
        startTime: "",
        endTime:""
      }
    ]
     },
     {
      dayId: 2,
      dayName: "Lunes",
      closedDay:false,
      closedDayB:false,
      hours: [{
        scheduleServiceId: 0,
        startTime: "",
        endTime:""
      }
    ]
     },
     {
      dayId: 3,
      dayName: "Martes",
      closedDay:false,
      closedDayB:false,
      hours: [{
        scheduleServiceId: 0,
        startTime: "",
        endTime:""
      }
    ]
     },
     {
      dayId: 4,
      dayName: "Miercoles",
      closedDay:false,
      closedDayB:false,
      hours: [{
        scheduleServiceId: 0,
        startTime: "",
        endTime:""
      }
    ]
     },
     {
      dayId: 5,
      dayName: "Jueves",
      closedDay:false,
      closedDayB:false,
      hours: [{
        scheduleServiceId: 0,
        startTime: "",
        endTime:""
      }
    ]
     },
     {
      dayId: 6,
      dayName: "Viernes",
      closedDay:false,
      closedDayB:false,
      hours: [{
        scheduleServiceId: 0,
        startTime: "",
        endTime:""
      }
    ]
     },
     {
      dayId: 7,
      dayName: "Sábado",
      closedDay:false,
      closedDayB:false,
      hours: [{
        scheduleServiceId: 0,
        startTime: "",
        endTime:""
      }
    ]
     }
     
     
     );

   }
  ngOnChanges(changes: SimpleChanges)  //Agendar
  {
    this.AgBcProductId=changes["bcProductId"].currentValue;
    if(changes["calendarId"]!=null)
    this.AgCalendarId=changes["calendarId"].currentValue;
    if(changes["bcProductId"]!=null)
    {

    this.AgCalendarId = (this.AgCalendarId == undefined) ? 0: this.AgCalendarId;

    this.ServiceConfiguracion.ObtenerHorariosDetalleConfiguracion(this.bcProductId2.getBcProduct(),this.AgCalendarId).subscribe(response =>
      {   
        this.timeInit=[];
        response.forEach((element:HourBussinesDetailResponse)  => {
            this.timeInit.push(  
              {dayId :element.dayId,dayName:element.dayName, startTime: element.startTime.substring(0,5)}
              );
        });        
      
      },error => { console.log(error)});

      this.calendarId=this.calendarId==undefined?0:this.calendarId;
    this.ServiceCalendario.getListCalendar(this.bcProductId2.getBcProduct()).subscribe(response =>
      {  
     
        console.log(response)
        console.log(this.calendarId)

        let result=response.filter(
          (book: any) => book.calendarId == this.calendarId);
          console.log(result)

       let agCalendar=result[0];
if(agCalendar!=undefined)
{
        this.AgCalendar={
            calendarId: agCalendar.calendarId,
            resource:agCalendar.resource,
            bcProductId:agCalendar.bcProductId,
            calendarTypeId:agCalendar.calendarTypeId,
            timeAppointment:agCalendar.timeAppointment,
            isDeleted:agCalendar.isDeleted,
            isActive:agCalendar.isActive,
            openingDays: []
          };

          result[0].openingDays.forEach((dayresponse:OpeningDayResponse)  => 
          { 
           let _hours : HoursResponse[]=[];
            dayresponse.hours.forEach((hourresponse:HoursResponse)  => 
              {
                     var oursResponse: HoursResponse={
                      startTime:hourresponse.startTime.substring(0,5),
                      scheduleServiceId:hourresponse.scheduleServiceId,
                      endTime:hourresponse.endTime.substring(0,5)};
                _hours.push( oursResponse);
                 
              });

              this.AgCalendar.openingDays.push(
                {
                dayId: dayresponse.dayId,
                dayName: dayresponse.dayName,
                closedDay: dayresponse.closedDay,
                closedDayB:dayresponse.closedDayB,
                hours: _hours
               });
           
          });
        }
      },error => { console.log(error)});

    }
  }

  public listRecusos: {idRecurso: number, nombre: string} []= [
    {idRecurso: 2, nombre: 'Retorno de llamada 2'},
    {idRecurso: 1, nombre: 'Agendar Cita 1'}
  ];

  public closeModalCitas(isOpen: boolean): void 
  { 
   this.closeModal.emit(isOpen);
  }
  public AddResource()
  {
    this.AgCalendar.bcProductId=this.AgBcProductId;
    this.AgCalendar.isActive=true;
    this.ServiceCalendario.insUpdCalendar(this.AgCalendar).subscribe
    (data => 

            {
            Swal.fire
            (
             (data.success)? 'Guardado':'Alerta',
                data.responseText,
              (data.success)? 'success':'warning'
            )
            this.closeModal.emit(false);
          },error => { console.log(error)}
     
    );

  
  }

  public eliminarSeccion(day?:String, indexSeccion?:number){
    let indexOfDay = this.AgCalendar.openingDays?.findIndex((otherDay) => otherDay.dayName == day  )
    if(indexOfDay != undefined && this.AgCalendar.openingDays != undefined){      
      this.AgCalendar.openingDays[indexOfDay].hours?.splice(indexSeccion!,1)
    } 
    
  }

  public addSeccion(day?:String){
  
    let newSeccion: HoursResponse={
      scheduleServiceId: 0,
      startTime: '',
      endTime:''
    }
    let indexOfDay = this.AgCalendar.openingDays?.findIndex((otherDay) => otherDay.dayName == day  )
    if(this.AgCalendar.openingDays != undefined)
    {
      this.AgCalendar.openingDays[indexOfDay!].hours?.push(newSeccion)    
    } 
  }
  public findHoursByDayId(dayId: number): any[] {

    return this.timeInit.filter(p => p.dayId ==dayId);
  }
 
}

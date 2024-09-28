import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { RecursoModel } from 'src/app/models/recursoModel';
import { ContactModel } from 'src/app/models/ContactModel';
import { HorarioAtencion } from 'src/app/models/HorarioAtencion';
import { ServiceContact } from '../../services/contacto/contacto.service'
import { ServiceConfiguracion } from '../../services/Configuracion/Configuracion.service'
import { dayOfWeek, time } from 'src/app/Utils/Times';
import { HorarioAtencion2 } from 'src/app/models/HorariosAtencion2';
import { HoursBussinesResponse } from 'src/app/models/HoursBussinesResponse';
import { ActivatedRoute } from '@angular/router';
import { OpeningDayBussinesResponse } from 'src/app/models/OpeningDayBussinesResponse';
import { OpeningCalendarBussinesResponse } from 'src/app/models/OpeningCalendarBussinesResponse';
import { HoursBussinesRequest } from 'src/app/models/HoursBussinesRequest';
import Swal from 'sweetalert2';
import {ServiceCalendario} from 'src/app/services/Calendario/Calendario.service';



declare var $: any; 
@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnChanges {
  faGears= faCog; 
  faPlus = faPlus;
  faTrashAlt=faTrashAlt;
  public tienehorarios = false;
  public HoursBussinesResponse:HoursBussinesResponse[] = []
  public hours: HoursBussinesResponse =
  {
    bussinessId:0,
    startTime: '',
    endTime: ''

  }
  
  public BussinesRecords:HoursBussinesRequest[] =[]
  public HoursBussionesRequest:HoursBussinesRequest ={

    bussinessId: 0,
    bc_product_id:0,
    dayId:0,
    dayName:'',
    startTime: '',
    endTime:'',
    closeDay:false

  }
  public OpeningDay:OpeningDayBussinesResponse[] = []
  public OpeningCalendar: OpeningCalendarBussinesResponse = {

    calendarId: 0,
    resource:"",
    bcProductId:0,
    calendarTypeId:0,
    timeAppointment:"00:30",
    isDeleted:false,
    isActive:true,
    openingDays: this.OpeningDay

  }
  public horariosAtencion2?:HorarioAtencion2[] = []
  public horariosAtencion: HorarioAtencion[] = []
  public horarioAtencion:HorarioAtencion = {
    calendarId: 0,
    scheduleServiceId: 0,
    dayId: 0,
    dayName: '',
    startTime: '',
    endTime: ''
  }
  
  timeInit =[] = time
  timeEnd =[] = time
  week=[] = dayOfWeek

  
  public startTime : any;
  public recursos: RecursoModel []= []
  public recurso: RecursoModel = {

    tipo: '',
    nombre: '',
    typeId: 0,
    calendarId:0,
    horarios: [],
    bcProductId: ''
  }

  public listContacto:ContactModel[] =[];
  public bcProductId = '';

  public advertiser: any;  

  constructor(    
    private  ServiceContact: ServiceContact,
    public  serviceConfiguracion : ServiceConfiguracion,
    private ServiceCalendario: ServiceCalendario,
    private route: ActivatedRoute
   

    ) { }

  ngOnInit(): void { 
    this.advertiser = this.route.snapshot.params["advertiser_id"];
    }
   
    ngOnChanges(changes: SimpleChanges): void {
        
    }

  public renderContacts(data: any){      
    this.bcProductId = data[0].bcProductId 
    this.recursos = []
    this.getResourceCalendar(this.bcProductId)    
  }
  public getResourceCalendar(bcProductId: any) {    
    this.ServiceCalendario.getListCalendar(bcProductId.toString())
        .subscribe(response => {          
          response.forEach((element:any)  => {        

            this.recurso = {
    
              tipo: '',
              nombre: '',
              typeId: 0,
              calendarId:0,
              horarios: [],
              bcProductId: ''
            }
            this.recurso.nombre = element.resource
            this.recurso.tipo = element.calendarType
            this.recurso.typeId = element.typeId
            this.recurso.calendarId = element.calendarId
    
            
            this.recursos.push(this.recurso);
          }) 
        });        
      }
 
  public obtenerHorarios(event: any) {    
    let idBcProduct = event.srcElement.id
    this.serviceConfiguracion.ObtenerHorariosConfiguracion(idBcProduct).subscribe(response=>{
               
      response.openingDays.forEach((element:any)  => {
        element.hours.forEach((el:HoursBussinesResponse)=> {
          
          el.startTime = el.startTime.substring(0,5);
          el.endTime = el.endTime.substring(0,5); 
        });
      });          
      
      this.OpeningCalendar = response            
    },error => { console.log(error)})
  }  

  public Guardar()
  {  
    this.OpeningCalendar.openingDays.forEach(openingDay => {
      
      openingDay.hours.forEach(hours => {
        this.HoursBussionesRequest ={
          bussinessId: 0,
          bc_product_id:0,
          dayId:0,
          dayName:'',
          startTime: '',
          endTime:'',
          closeDay:false      
        }
        this.HoursBussionesRequest.bussinessId = hours.bussinessId
        this.HoursBussionesRequest.bc_product_id = this.OpeningCalendar.bcProductId
        this.HoursBussionesRequest.dayId = openingDay.dayId
        this.HoursBussionesRequest.dayName = openingDay.dayName
        this.HoursBussionesRequest.startTime = hours.startTime + ":00"
        this.HoursBussionesRequest.endTime = hours.endTime + ":00"
        this.HoursBussionesRequest.closeDay = openingDay.closedDay
        
        this.BussinesRecords.push(this.HoursBussionesRequest)
        
      });
    });   
    
    this.serviceConfiguracion.agregarModificarEliminarHorariosNegocio(this.BussinesRecords).subscribe(response =>{     
      Swal.fire({
        icon: 'success',
        title: 'Configuración.',
        text: 'Los horarios se actualizaron correctamente.',
      })      
      },error => { 
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Hubo un error, favor de comunicarse con su administrador!',
        })      
      }
    );    
    this.BussinesRecords =[];
  }
/*begin arodriguez*/
  public eliminarSeccion(day?:String, indexSeccion?:number){
    let indexOfDay = this.OpeningCalendar.openingDays?.findIndex((otherDay) => otherDay.dayName == day  )
    if(indexOfDay != undefined && this.OpeningCalendar.openingDays != undefined){      
      this.OpeningCalendar.openingDays[indexOfDay].hours?.splice(indexSeccion!,1)
    } 
    
  }

  public addSeccion(day?:String){
    let newSeccion: HoursBussinesResponse={
      bussinessId: 0,
      startTime: '',
      endTime:''
    }
    let indexOfDay = this.OpeningCalendar.openingDays?.findIndex((otherDay) => otherDay.dayName == day  )
    if(this.OpeningCalendar.openingDays != undefined){
      this.OpeningCalendar.openingDays[indexOfDay!].hours?.push(newSeccion)    } 
    
  }
  /*end arodriguez*/



}





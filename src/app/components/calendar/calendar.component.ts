import {
    AfterViewChecked,
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    TemplateRef,
    ViewChild
} from '@angular/core';
import {isSameDay, isSameMonth,} from 'date-fns';
import {ServiceCalendario} from 'src/app/services/Calendario/Calendario.service';
import {Subject} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {
    CalendarEvent,
    CalendarEventAction,
    CalendarEventTimesChangedEvent,
    CalendarView,
    DAYS_OF_WEEK,
} from 'angular-calendar';
import {EventColor} from 'calendar-utils';
import {faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {CitaModel} from "../../models/citaModel";
import {RecursoModel} from "../../models/recursoModel"
import {
    obtenerFechaFinDeMes,
    obtenerFechaInicioDeMes,
    obtenerFechaDia,
    obtenerNombreMes, obtenerFechaInicioNMes, obtenerFechaFinNMes, formatearFecha, diasEnUnMes
} from "../../../common/common";
import { DatePipe } from '@angular/common';
import {CalendarTypeEnum} from "../../models/CalendarTypeEnum";
import {OnLoadDatesModel} from "../../models/OnLoadDatesModel";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/internal/Observable";
import {onLoadDatesActions} from "../../actions/calendar.actions";


const colors: Record<string, EventColor> = {
    red: {
        primary: '#f8dad8',
        secondary: '#f8dad8',
    },
    green: {
        primary: '#e1f1e0',
        secondary: '#e1f1e0',
    },
};

declare var $: any;
declare function onLoadCalendarInnerHtml(event: string, events: CalendarEvent[]): void;
@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit {
    @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

    @Input () citas: CitaModel[] =[];
    @Input () recursos: RecursoModel[] =[];
    @Input () siteName:any;
    @Input () bcProduct:any;

    @Output() daySelected = new EventEmitter<Date>();
    @Output() onLoadDates = new EventEmitter<OnLoadDatesModel>();
    @Output() selectedDate = new EventEmitter<string>();
    @Output() typeView = new EventEmitter<CalendarView>();
    @Output() actualizeAppointment = new EventEmitter<() =>{}>();

    public view: CalendarView = CalendarView.Month;

    public CalendarView = CalendarView;

    public viewDate: Date = new Date();

    modalData: {
        action: string;
        event: CalendarEvent;
    };
    public idAppointment:any;

    public actions: CalendarEventAction[] = [
        {
            label: '<i class="fas fa-fw fa-pencil-alt"></i>',
            a11yLabel: 'Edit',
            onClick: ({ event }: { event: CalendarEvent }): void => {
                this.handleEvent('Edited', event);
            },
        },
        {
            label: '<i class="fas fa-fw fa-trash-alt"></i>',
            a11yLabel: 'Delete',
            onClick: ({ event }: { event: CalendarEvent }): void => {
                this.events = this.events.filter((iEvent) => iEvent !== event);
                this.handleEvent('Deleted', event);
            },
        },
    ];

    public events: CalendarEvent[] = [];

    public refresh = new Subject<void>();

    public activeDayIsOpen: boolean = true;

    public  locale: string = 'es';

    public weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

    public faAngleLeft = faAngleLeft;

    public faAngleRight = faAngleRight;

    public fechaSeleccionada = '';

    public arrayRecursos: RecursoModel[];

    public attr_siteName:any;

    public bcproductId:any;

    public calendar$: Observable<number> | undefined;

    public startHour2: number = 0;
    public endHour2: number = 0;

    constructor(private modal: NgbModal,
        private ServiceCalendario: ServiceCalendario,
        private store: Store<{ count: number } >) {
        this.calendar$ = store.select('count');
    }
    

    ngOnInit(): void {
        this.onLoadFechaInicial();
        this.attr_siteName = this.siteName;
    }
    
    public onLoadFechaInicial() {
        const fecha = new Date();
        // cargar el mes actual
        this.fechaSeleccionada = obtenerNombreMes(fecha.getMonth()+1)   +" "+fecha.getFullYear();
        this.selectedDate.emit(this.fechaSeleccionada);
        // detectar el mes actual
        this.onLoadDates.emit({initialDate:obtenerFechaInicioDeMes(), finalDate:obtenerFechaFinDeMes()});
    }

    public ngOnChanges(changes: any) {
        let counter = 0;
        if(changes["siteName"]){
            this.attr_siteName =changes["siteName"].currentValue
          }
          if(changes["bcproduct"]){
            this.bcproductId  =changes["bcproduct"].currentValue
          }else{
            this.bcproductId  =this.bcProduct
          }
        this.arrayRecursos=this.recursos;
        this.calMinHours(this.arrayRecursos);

        if (changes.citas && changes!.citas.currentValue != changes.citas.previousValue ){
            this.events.length = 0;
            this.citas.map((i, index) => {
                this.events = [
                    ...this.events,
                    {
                        id: i.appointmentId,
                        start: new Date(i.initialDate),
                        end: new Date(i.finalDate),
                        title: i.observations.replace( /(<([^>]+)>)/ig, ''),
                        color: (i.calendarTypeId== CalendarTypeEnum.reservaLinea)?colors['green']:colors['red'] ,
                        actions: this.actions,
                        cssClass:'event-calendar-' + index

                    },
                ];
            })
        }
    }

    public calMinHours(recursos: RecursoModel[]){
        this.getHoursCalendar(this.bcproductId,'2023-01-24','2023-12-24')
/*
        let pivoteStartHours = '';
        let pivoteEndHours = '';

        if (recursos.length> 0){
         //   console.log(recursos);
            for (const i of  recursos){

                for (const j of i.openingDays!){
                  //  console.log(j.hours)
                    for (const k of j.hours){
                    //    console.log('start ' + k.startTime);
                        if (pivoteStartHours.length>0 ){
                            if (pivoteStartHours > k.startTime){
                                pivoteStartHours = k.startTime;
                            }
                        }
                        else {
                            pivoteStartHours = k.startTime
                        }
                        if (pivoteEndHours.length>0){
                            if (pivoteEndHours < k.endTime){
                                pivoteEndHours = k.endTime;
                            }
                        }else {
                            pivoteEndHours = k.endTime
                        }


                    }
                }
            }


            this.startHour = parseInt(pivoteStartHours.substring(0,2));
            this.endHour = parseInt(pivoteEndHours.substring(0,2));
            console.log(this.startHour)
            console.log(this.endHour)



        }*/


    }
    public getHoursCalendar(bcProductId:any, fechaInicio:string, fechaFin:string){
        //peticion de horario max y minimo de calendario
        if(bcProductId){
            this.ServiceCalendario.getAppointmentHours(bcProductId, fechaInicio, fechaFin)
                .subscribe((response) => {
                    console.log(response)
                    this.startHour2 = response[0].initialDate.toString().split(":")[0]
                    this.endHour2 = response[0].finalDate.toString().split(":")[0]
                    },
                    (error) => {
                       console.log(error)
                    })
        }
       
        }

    public AppointmentUpdate() {

        this.onloadView(this.view);
    }

    public convertEvent(){
        onLoadCalendarInnerHtml('cal-event-title', this.events)
    }

    public dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
        if (isSameMonth(date, this.viewDate)) {
            if (
                (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
                events.length === 0
            ) {
            } else {
            }
            this.viewDate = date;
            this.daySelected.emit(date);
        }
    }

    public eventTimesChanged({event, newStart, newEnd,}: CalendarEventTimesChangedEvent): void {
        this.events = this.events.map((iEvent) => {
            if (iEvent === event) {
                return {
                    ...event,
                    start: newStart,
                    end: newEnd,
                };
            }
            return iEvent;
        });
        this.handleEvent('Dropped or resized', event);
    }

    public handleEvent(action: string, event: CalendarEvent): void {
        this.modalData = { event, action };
        this.modal.open(this.modalContent );
        this.idAppointment = event.id;
    }

    public deleteEvent(eventToDelete: CalendarEvent) {
        this.events = this.events.filter((event) => event !== eventToDelete);
    }


    public closeOpenMonthViewDay() {
        this.activeDayIsOpen = false;
    }

    public setView(view: CalendarView) {
        this.view = view;
        this.typeView.emit(view);
        this.onloadView(view);

    }

    public prevDate(){
        this.onloadView(this.view);

    }
    public nextDate(){
        this.onloadView(this.view);
    }

    public onloadView(view: CalendarView){

        let nMes = this.viewDate.getMonth();
        if (nMes <= 0 ){
            nMes = 11;
        }
        switch (view) {
            case CalendarView.Day:
                // cargar el día                
                this.fechaSeleccionada = this.viewDate.getDate()+ ' de ' + obtenerNombreMes(this.viewDate.getMonth()+1);
                this.selectedDate.emit(this.fechaSeleccionada);
                this.onLoadDates.emit({initialDate: formatearFecha(this.viewDate), finalDate: formatearFecha(this.viewDate)});

                break;
            case CalendarView.Week:
                let first = this.viewDate.getDate() - this.viewDate.getDay(); // First day is the day of the month - the day of the week
                let last = first + 6; // last day is the first day + 6         

                const diasEnUnMesAux = diasEnUnMes(this.viewDate.getMonth()+1, this.viewDate.getFullYear());

                if (first<= 0){
                    first =1
                }
                if (last>diasEnUnMesAux){
                    last = diasEnUnMesAux;
                }
               // const firstDayS =
                let firstday: Date =  new Date( this.viewDate.getFullYear()+'-'+ (this.viewDate.getMonth()+1) +'-' + first);
                let lastday: Date = new Date(this.viewDate.getFullYear()+'-'+ (this.viewDate.getMonth()+1) +'-' + last );         
                this.onLoadDates.emit({initialDate: formatearFecha(firstday),finalDate: formatearFecha(lastday)});       

                break;
            case CalendarView.Month:               

                this.fechaSeleccionada = obtenerNombreMes(nMes+1)+" "+this.viewDate.getFullYear();
                this.selectedDate.emit( this.fechaSeleccionada);
                this.onLoadDates.emit({initialDate:obtenerFechaInicioNMes(nMes, this.viewDate.getFullYear()),
                    finalDate: obtenerFechaFinNMes(nMes, this.viewDate.getFullYear())});


               break;
        }
    }

    public verifyDayClicked(event: any){
         let pipe = new DatePipe("es");
         let date = pipe.transform(event.day.date, "longDate");
         let mes = pipe.transform(event.day.date, "MMMM");
         let dia = pipe.transform(event.day.date, "d");
         let mesYdia= mes+" "+dia;         
        let span =  $("div[aria-label*='"+mesYdia+"'] span[class*='cal-day-number']")       
        span[0].classList.add("dayClicked")       
        this.styleDayCliked(span[0])
    }

    public findNodeByInnerHTML(nodelist:any, innerHTML:any){
        for(let ii = 0; ii < nodelist.length; ii++){
            if(nodelist[ii].innerHTML === innerHTML)
                return nodelist[ii]
        }
    }

    public styleDayCliked(element:any){
        $(".cal-day-number").removeClass("dayClicked");
        element.classList.add("dayClicked")
    }
}

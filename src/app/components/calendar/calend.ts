import {
    AfterViewChecked,
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    TemplateRef,
    ViewChild
} from '@angular/core';
import {
    startOfDay,
    endOfDay,
    subDays,
    addDays,
    endOfMonth,
    isSameDay,
    isSameMonth,
    addHours,
    format,
} from 'date-fns';
import  mn  from 'date-fns/locale/es'
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
    CalendarEvent,
    CalendarEventAction,
    CalendarEventTimesChangedEvent,
    CalendarView, DAYS_OF_WEEK,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { faAngleLeft  } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import {CitaModel} from "../../models/citaModel";

const colors: Record<string, EventColor> = {
    red: {
        primary: '#ad2121',
        secondary: '#FAE3E3',
    },
    blue: {
        primary: '#1e90ff',
        secondary: '#D1E8FF',
    },
    yellow: {
        primary: '#e3bc08',
        secondary: '#FDF1BA',
    },
    green: {
        primary: '#388E3C',
        secondary: '#4CAF50',
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
export class CalendarComponent implements OnInit, AfterViewChecked {
    @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

    @Input () citas: CitaModel[] =[];

    @Output() daySelected = new EventEmitter<Date>();

    @Output() prevMonth = new EventEmitter<()=> void>();

    @Output() nextMonth = new EventEmitter<()=> void>();


    view: CalendarView = CalendarView.Month;

    CalendarView = CalendarView;

    viewDate: Date = new Date();

    modalData: {
        action: string;
        event: CalendarEvent;
    };

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

    public events: CalendarEvent[] = [
        /*
              {
                   id: 1,
                   start: addHours(new Date(), 2),
                   end: addHours(new Date(), 4),
                   title: 'Un evento para aldo de 2 horas',
                   color: colors['red'],
                   actions: this.actions,
                 cssClass:'event-calendar-' + 1

               },
        /*
            {
              id: 2,
              start: addHours(new Date(), 2),
              end: addHours(new Date(), 4),
              title: 'segundo evento a la misma hora',
              color: colors['yellow'],
              actions: this.actions,
              cssClass:'event-calendar-' + 2
            },
            {
              id: 3,
              start: subDays(endOfMonth(new Date()), 3),
              end: addDays(endOfMonth(new Date()), 3),
              title: 'Un evento largo que se extiende por 2 meses.',
              color: colors['blue']  ,
              allDay: true,
              cssClass:'event-calendar-' + 3
            },*/

    ];

    refresh = new Subject<void>();



    activeDayIsOpen: boolean = true;

    public  locale: string = 'es';

    weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

    public faAngleLeft = faAngleLeft;

    public faAngleRight = faAngleRight;

    constructor(private modal: NgbModal) {}

    ngOnInit(): void {
    }

    ngAfterViewChecked() {
    }

    ngOnChanges(changes: any) {
        //console.log(changes);

        if (changes.citas.currentValue != changes.citas.previousValue ){
            //  console.log(this.citas);
            this.events.length = 0;
            /*   this.events.push(
                     {
                         id: 1,
                         start: addHours(new Date(), 2),
                         end: addHours(new Date(), 4),
                         title: 'Un evento para aldo de 2 horas',
                         color: colors['red'],
                         actions: this.actions,
                         cssClass:'event-calendar-' + 1

                     }
                 )*/

            /*  console.log(this.events[0].start);
              console.log(this.events[0].end);
              console.log('*****************')
              console.log(new Date('2023-03-03T17:30:00'))*/



            this.citas.map((i, index) => {
                console.log(i);

                this.events = [
                    ...this.events,
                    {
                        id: index,
                        start: new Date(i.initialDate),
                        end: new Date(i.finalDate),
                        title: i.observations,
                        color: colors['red'],
                        actions: this.actions,
                        cssClass:'event-calendar-' + index

                    },
                ];
            })
        }
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
                this.activeDayIsOpen = false;
            } else {
                this.activeDayIsOpen = true;
            }
            this.viewDate = date;
            this.daySelected.emit(date);
            console.log(date);
        }
    }

    eventTimesChanged({
                          event,
                          newStart,
                          newEnd,
                      }: CalendarEventTimesChangedEvent): void {
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

    handleEvent(action: string, event: CalendarEvent): void {
        console.log(event.id);
        this.modalData = { event, action };
        this.modal.open(this.modalContent );
    }

    addEvent(): void {
        this.events = [
            ...this.events,
            {
                title: 'New event',
                start: startOfDay(new Date()),
                end: endOfDay(new Date()),
                color: colors['red'],
                draggable: true,
                resizable: {
                    beforeStart: true,
                    afterEnd: true,
                },
            },
        ];
    }

    deleteEvent(eventToDelete: CalendarEvent) {
        this.events = this.events.filter((event) => event !== eventToDelete);
    }

    setView(view: CalendarView) {
        this.view = view;
    }

    closeOpenMonthViewDay() {
        this.activeDayIsOpen = false;
    }

    /*public daySelected(date:any){
    $(".toDay")[0].innerText = format(date,"dd, MMMM",{locale:mn});
    this.daySelectedOuth.emit(format(date,"yyyy-MM-dd",{locale:mn}))
//console.log(format(date,"hh:mm:ss",{locale:mn}))
}*/

}

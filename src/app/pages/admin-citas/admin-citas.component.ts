import {Component, OnInit} from '@angular/core';
import {CitaModel} from 'src/app/models/citaModel';
import {ServiceContact} from '../../services/contacto/contacto.service'
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {RecursoModel} from 'src/app/models/recursoModel';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute} from '@angular/router';
import {ServiceCalendario} from 'src/app/services/Calendario/Calendario.service';
import {obtenerFechaDia} from "../../../common/common";
import {RangoCitasModel} from "../../models/RangoCitasModel";
import {CalendarView} from "angular-calendar";
import { DatePipe } from '@angular/common';

declare var $: any;

@Component({
    selector: 'app-admin-citas',
    templateUrl: './admin-citas.component.html',
    styleUrls: ['./admin-citas.component.scss']
})
export class AdminCitasComponent implements OnInit {

  public recurso: RecursoModel []= []
  public siteName:string = ""
  // citas del calendario
  public listaCitas: CitaModel[] =[]
  public listaCalendar: CitaModel[] =[]
  public loadingCitas: boolean = false;
  public errorCitas: boolean = false;

    public DiaOMesSeleccionado: Date = new Date();
    public DiaOMesSeleccionadoText = '';
    public rangoFechasCitas: RangoCitasModel = {
        fechaInicial: '',
        fechaFinal: ''
    }

    public bcProductId: any;
    public advertiser: any;
    public bcProductIdSelected: any;
    public startHour: number;
    public endHour:number

    public faAd = faPlus;

    public visibleCitas =true

    constructor(
        private route: ActivatedRoute,
        private ServiceContact: ServiceContact,
        private ServiceCalendario: ServiceCalendario,
        private modalService: NgbModal) {
    }

    public closeResult = '';
    public time = {hour: 13, minute: 30};

    ngOnInit(): void {
        let date= new Date()
        this.DiaOMesSeleccionadoText = date.toString()
        this.advertiser = this.route.snapshot.params["advertiser_id"];
        this.addEventViewCalendar();
        
    }

    public onLoadDatesCalendar(initialDate: string, finalDate?: string) {
        //  alert(initialDate +' - ' +  finalDate)
        this.rangoFechasCitas = {fechaInicial: initialDate, fechaFinal: finalDate}
        this.getAppointment(this.advertiser, initialDate, finalDate)

    }

    public selectedDate(dateSelected: string) {
        this.DiaOMesSeleccionadoText = dateSelected;
    }

    public selectTypeView(view: CalendarView){
        if (view == CalendarView.Day || view == CalendarView.Week){
            this.visibleCitas = false;
        }else {
            this.visibleCitas = true;
        }

    }

    public open(content: any) {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(
            (result) => {
                this.closeResult = `Closed with: ${result}`;
            },
            (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            },
        );
    }

    public openLg(content: any) {
        this.modalService.open(content, {size: 'lg'});
    }

    public reloadSchedules()
    {
        this.getAppointment(this.advertiser, this.rangoFechasCitas.fechaInicial, this.rangoFechasCitas.fechaFinal)
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

    public renderContacts(data: any){        
      this.bcProductId = data[0].bcProductId     
      this.getResourceCalendar(this.bcProductId )
    }

    public addEventViewCalendar() {
        let date= new Date()
        $(".btn-group-calendar .btn-primary").on("click", () => {
            let activeView = $(".btn-group-calendar .active")[0].innerText;
            if (activeView != 'Mes') {
                $(".left.row.container").addClass("nodisplay")
                $(".row.right.container").addClass("widthNoMonth")
            } else {
                $(".left.row.container").removeClass("nodisplay")
                $(".row.right.container").removeClass("widthNoMonth")
            }
        });
    }

    public renderResource(data: any) {       
        this.bcProductId  = data[0].bcProductId          
        this.getResourceCalendar(this.bcProductId)
    }

    public getbcProductId(data: any) {
        this.bcProductIdSelected = data;
        this.getAppointment(this.advertiser, this.rangoFechasCitas.fechaInicial,  this.rangoFechasCitas.fechaFinal)
    }

    public closeModalCitas($event: boolean) {
        if ($event == false) {
            this.modalService.dismissAll();
        }
    }

    public getResourceCalendar(bcProductId: number) {
        this.ServiceCalendario.getListCalendar(bcProductId.toString())
            .subscribe(response => {
                this.recurso = response;
            })
    }

    public getDaySelected(dateI: Date) {
        let pipe = new DatePipe("es");
        let date = pipe.transform(dateI, "mediumDate");
        this.DiaOMesSeleccionadoText = date!.toString();
        this.rangoFechasCitas = {fechaInicial: dateI.getFullYear() + '-' + (dateI.getMonth() + 1) + '-' + dateI.getDate(),
            fechaFinal: dateI.getFullYear() + '-' + (dateI.getMonth() + 1) + '-' + dateI.getDate()}

        this.ServiceCalendario.getAppointmentByDaySelected(this.advertiser, this.bcProductIdSelected,
            dateI.getFullYear() + '-' + (dateI.getMonth() + 1) + '-' + dateI.getDate())

            .subscribe((response) => {
                    this.loadingCitas = false;
                    this.listaCitas = response;
                },
                (error) => {
                    this.loadingCitas = false;
                    this.errorCitas = true;
                })

        // this.getAppointment(this.advertiser, data[0])
    }

    public getAppointment(advertiser: string, fechadeInicio: string, fechaFinal?: string) {
        this.loadingCitas = true;
        this.errorCitas = false;
        if(this.bcProductIdSelected){
            this.ServiceCalendario.getAppointmentByDaySelected(advertiser, this.bcProductIdSelected, fechadeInicio, fechaFinal!)
                .subscribe((response) => {
                        this.loadingCitas = false;
                        this.listaCitas = response;
                        this.listaCalendar = response
                    },
                    (error) => {
                        this.loadingCitas = false;
                        this.errorCitas = true;
                    })
        }
        
        }
      
        
}




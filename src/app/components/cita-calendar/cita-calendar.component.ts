import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { CitaModel } from "src/app/models/citaModel";

//Icons
import {
  faCheck,
  faExclamationTriangle,
  faWindowClose,
  faHourglassEnd,
} from "@fortawesome/free-solid-svg-icons";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { StatusApoimentEnum } from "../../models/StatusApoimentEnum";

import { ServiceCalendario } from "src/app/services/Calendario/Calendario.service";
import { StatusApoiment } from "../../models/StatusApoiment";
import { CalendarEvent } from "angular-calendar";
import { RecursoModel } from "src/app/models/recursoModel";
import Swal from "sweetalert2";

declare var $: any;

@Component({
  selector: "app-cita-calendar",
  templateUrl: "./cita-calendar.component.html",
  styleUrls: ["./cita-calendar.component.scss"],
})
export class CitaCalendarComponent implements OnInit {
  public faCheck = faCheck;
  public faExclamationTriangle = faExclamationTriangle;
  public faWindowClose = faWindowClose;
  public faHourglassEnd = faHourglassEnd;
  public idAppointment: any;
  modalData: {
    action: string;
    event: CalendarEvent;
  };

  @Input() siteName: any;
  @Input() listCitas?: CitaModel[];
  @Input() recursos: RecursoModel[] = [];

  @Output() scheduleUpdated = new EventEmitter<() => {}>();
  //@Output() updateCitas = new EventEmitter<()=> void>();
  public arrayCitas?: CitaModel[];
  public arrayRecursos: RecursoModel[];
  public citaSelected: CitaModel = {
    appointmentId: 0,
    calendarId: 0,
    contactId: 0,
    initialDate: "",
    finalDate: "",
    appointSchedType: null,
    observations: "",
    statusCodeId: "",
    statusCode: "",
    calendarTypeId: 0,
    calendarType: "",
    resource: "",
  };

  public aceptandoEstatus = false;

  public rechazandoEstatus = false;

  public errorActualizarEstatus = false;

  statusApoiment = StatusApoimentEnum;

  public siteNameCitaCalendar: any;
  public statusExpired = false;
  constructor(
    private modalService: NgbModal,
    private ServiceCalendario: ServiceCalendario
  ) {}

  ngOnInit(): void {   
    this.siteNameCitaCalendar = this.siteName;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.arrayRecursos = this.recursos;
    if (changes["listCitas"]) {
      this.arrayCitas = changes["listCitas"].currentValue;    
      console.log('array',this.arrayCitas)      
    }
  }

  public openLg(content: any, itemId: any) {
    const found = this.listCitas?.find((cita) => cita.appointmentId == itemId);
    var today = new Date();
    this.statusExpired = found?.statusCodeId == "E" ? true : false;

    this.appointmentId(itemId);
    this.modalService.open(content, { size: "lg" });
  }

  public testTypeCita(item: any) {
    if (item.statusCode != "Aceptada") {
      $("[id=" + item.appointmentId + "]").on("click", function () {});
    }
    if (item.calendarType == "Reserva en Linea") {
      return "containerCardAgendarCita";
    } else {
      return "containerCardCallBack";
    }
  }

  public selectCita(modal: any, cita: CitaModel) {
    this.modalService.open(modal);
    this.citaSelected = cita;
  }

  public updateCita(idApoiment: number, status: StatusApoimentEnum) {
    const statusApoimens: StatusApoiment = {
      appointmentId: idApoiment,
      statusCode: status,
    };
    if (status == StatusApoimentEnum.Rechazado) {
      this.rechazandoEstatus = true;
    }
    if (status == StatusApoimentEnum.Aceptado) {
      this.aceptandoEstatus = true;
    }
    this.errorActualizarEstatus = false;
    this.ServiceCalendario.updateStatusAppoiment(statusApoimens).subscribe(
      (response) => {
        if (status == StatusApoimentEnum.Rechazado) {
          this.rechazandoEstatus = false;
        }
        if (status == StatusApoimentEnum.Aceptado) {
          this.aceptandoEstatus = false;
        }

        // actualizar el objeto que estamos actualizando

        const index = this.listCitas!.findIndex((object) => {
          return object.appointmentId === idApoiment;
        });
        this.listCitas![index] = response;
        this.modalService.dismissAll();
      },
      (error) => {
        if (status == StatusApoimentEnum.Rechazado) {
          this.rechazandoEstatus = false;
        }
        if (status == StatusApoimentEnum.Aceptado) {
          this.aceptandoEstatus = false;
        }
        this.errorActualizarEstatus = false;
      }
    );
  }

  public appointmentId(id: any) {
    this.idAppointment = id;
  }

  public AppointmentUpdate() {
    this.scheduleUpdated.emit();
  }
}

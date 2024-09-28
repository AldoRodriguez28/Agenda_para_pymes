import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { RecursoModel } from '../../models/recursoModel'
import { ServiceCalendario} from 'src/app/services/Calendario/Calendario.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-RecursosCard',
  templateUrl: './recursos-card.component.html',
  styleUrls: ['./recursos-card.component.scss']
})
export class RecursosCardComponent implements OnInit {
public faCalendarAlt = faCalendarAlt;
public faPhoneAlt = faPhoneAlt;
public facog = faCog;
public faTrashAlt = faTrashAlt;
public newRecurso?: RecursoModel[]
public itemRecurso?: RecursoModel
public advertiser : any;

@Input() recursos?: RecursoModel[];
constructor(
  private  ServiceCalendario: ServiceCalendario,
  private route: ActivatedRoute,
  ){}
  ngOnInit(): void {
   this.newRecurso = this.recursos;
   this.advertiser = this.route.snapshot.params["advertiser_id"];
   console.log(this.advertiser)
   console.log(this.newRecurso)
  }
  ngOnChanges(changes: SimpleChanges): void {
        this.newRecurso = changes["recursos"].currentValue;
        console.log(this.newRecurso)
  }
public testTypeResource(item:any){
  if(item.tipo == 'Retorno de Llamada'){
    return 'containerCardCallBack'
  }else {
    return 'containerCardAgendarCita'
  }
}
public configurarRecurso(index: number){
  alert(index)
}

public eliminarRecurso(item: RecursoModel){  
  Swal.fire({
    title: 'Eliminar.',
    text: "¿Estas seguro que desea eliminar el recurso "+ item.nombre,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {   

    this.ServiceCalendario.delCalendar(item.calendarId!).subscribe(response =>{

      console.log(response);
      Swal.fire(
        'Eliminado!',
        'El recurso ha sido eliminado.',
        'success'
      )

      var filtered = this.newRecurso!.filter((el) => el.calendarId !== item.calendarId);
      this.newRecurso = filtered   

    },error => { 
      Swal.fire(
        'Eliminado!',
        'El recurso ha sido eliminado.',
        'error'
      )
      console.log(error)}
      );    
     
    }
  })
}



}

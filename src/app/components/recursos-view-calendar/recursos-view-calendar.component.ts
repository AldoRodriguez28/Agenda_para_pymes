import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { RecursoModel } from 'src/app/models/recursoModel';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recursos-view-calendar',
  templateUrl: './recursos-view-calendar.component.html',
  styleUrls: ['./recursos-view-calendar.component.scss']
})
export class RecursosViewCalendarComponent implements OnInit {
  public newRecurso?: any[];
  public faCalendarAlt= faCalendarAlt;
public faPhoneAlt= faPhoneAlt;
public advertiser: any;
  @Input() recursos?: RecursoModel[];

  constructor(
    private route: ActivatedRoute,
  ){}
  ngOnInit(): void {
    this.advertiser = this.route.snapshot.params["advertiser_id"];
    this.newRecurso = this.recursos;
   }
   ngOnChanges(changes: SimpleChanges) //recursos
  {
    if(this.recursos){
      this.newRecurso=changes["recursos"].currentValue
    }
  }

   public testTypeResource(item:any){
    if(item.calendarType == 'Retorno de Llamada'){
      return 'containerCardCallBack'
    }else {
      return 'containerCardAgendarCita'
    }
  }

}

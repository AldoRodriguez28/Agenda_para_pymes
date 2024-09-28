import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { RecursoModel } from 'src/app/models/recursoModel';

@Component({
  selector: 'app-select-recursos',
  templateUrl: './select-recursos.component.html',
  styleUrls: ['./select-recursos.component.scss']
})
export class SelectRecursosComponent {
  public listRecusos?: any[]=[];
  public selectedRecurso = 1;
  public selectedRecursoid = 0; 
  public idrecursoSelected?="";

@Input() recursos?: RecursoModel[];
@Input() recursoSelected?: string;
@Output() EventCalendar = new EventEmitter<number>();
@Output() EventTypeCalendar = new EventEmitter<number>();


  ngOnInit(): void {
    this.selectedRecurso = 3;
    this.listRecusos = this.recursos;  
    this.idrecursoSelected = this.recursoSelected
  }
  ngOnChanges(changes: SimpleChanges)
  {if(changes["recursoSelected"]){
    this.idrecursoSelected =changes["recursoSelected"].currentValue
  }
  }
  public SelectedCalendar(idCalendar:number)
  {        
    this.EventCalendar.emit(idCalendar);       
  }

  public SelectedTypeCalendar(typeCalendar:number)
  {        
    this.EventTypeCalendar.emit(typeCalendar);       
  }

 


}

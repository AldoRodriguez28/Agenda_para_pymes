import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


@Component({
    selector: 'app-detalle-interaccion',
    templateUrl: './detalle-interaccion.component.html',
    styleUrls: ['./detalle-interaccion.component.scss'],
    
  })
  export class DetailInteractionComponent implements OnInit {
    @Input() detailInteraction:any;

    @Output() close = new EventEmitter<()=> {}>();


    public detailInteractionlocal:any;
    

    ngOnInit(): void {
        this.detailInteractionlocal = this.detailInteraction;
        console.log(this.detailInteractionlocal)
    }

    public CloseModal () {
        this.close.emit();
      }

  }
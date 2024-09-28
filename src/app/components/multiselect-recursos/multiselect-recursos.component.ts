import { Component } from '@angular/core';
import {DropdownSettings} from "angular2-multiselect-dropdown/lib/multiselect.interface";

@Component({
  selector: 'app-multiselect-recursos',
  templateUrl: './multiselect-recursos.component.html',
  styleUrls: ['./multiselect-recursos.component.scss']
})

export class MultiselectRecursosComponent {

  dropdownList: list [] = [];
  selectedItems: list [] = [];
  dropdownSettings: DropdownSettings = {};

  ngOnInit(){
    this.dropdownList= [
      {id:1,itemName:'Aldo'},
      {id:2,itemName:'Nicolas'},
      {id:3,itemName:'Samuel'},
      {id:3,itemName:'Enrique'},
    ];
    this.selectedItems = [
      {id:2,itemName:'Aldo'},
      {id:3,itemName:'Nicolas'},
      {id:4,itemName:'Samuel'}
    ];
    this.dropdownSettings = {
      singleSelection: false,
      text: 'Selecciona los recursos',
      selectAllText:'Seleciona Todos',
      unSelectAllText:'Desmarcar todos',
      enableSearchFilter: true,
      classes:'form-control ',
      searchPlaceholderText: 'Buscar Recurso'
    };
  }
  onItemSelect(item:any){
    console.log(item);
    console.log(this.selectedItems);
  }
  OnItemDeSelect(item:any){
    console.log(item);
    console.log(this.selectedItems);
  }
  onSelectAll(items: any){
    console.log(items);
  }
  onDeSelectAll(items: any){
    console.log(items);
  }
}

interface list {
  id: number;
  itemName: string;
}

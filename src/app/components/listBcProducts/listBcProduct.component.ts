import { Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BcProductModel } from 'src/app/models/BcProductModel';
import { ServiceContact } from '../../services/contacto/contacto.service'
import {ContactModel} from "../../models/ContactModel";

declare var $: any; 
@Component({
  selector: 'app-ListadoBcProduct',
  templateUrl: './listBcProduct.component.html',
  styleUrls: ['./listBcProduct.component.scss']
})
export class ListadoBcProduct implements OnInit {
public advertiser_id : any;
public listaBcProduct: BcProductModel[] =[];
public siteNameSelected?: any;
public dataOutput?: any = {
  id: 0,
  bcProductId: 0
};
@Input() advertiser:string;
@Output() listadoContacto = new EventEmitter<any>();
@Output() bcProductId = new EventEmitter<any>();

  constructor(   
    private  ServiceContact: ServiceContact
    ) {
   }

  ngOnInit(): void {
    this.advertiser_id = this.advertiser
    this.ServiceContact.getListBcProduct(this.advertiser_id)
    .subscribe(data =>{
      this.listaBcProduct = data;
       if(data.length > 0){
         this.clickFirstProduct(this.listaBcProduct[0].bc_product_id)
       }
    },error => {console.log('oops', error)}) 
  }
  getListContactForBcProduct(id: number){    
    this.emitbcProductId(id)
    this.siteNameSelected = this.listaBcProduct.find(x => x.bc_product_id === id)
    this.dataOutput.id = id;
    this.dataOutput.bcProductId = this.siteNameSelected.bc_product_id;
    this.listadoContacto.emit(this.dataOutput)
    this.buttonPildoraStyleSelected(id.toString())
  }
  emitbcProductId(id:any){
    this.bcProductId.emit(id)
  }
  buttonPildoraStyleSelected(id:string){
    $(".buttonPildora").removeClass("bcProoduct_click");
    let buttonSelected = document.getElementById(id);
    buttonSelected?.classList.add("bcProoduct_click");
  }
  clickFirstProduct(id:any){
      $("[id='div_listaBcProduct_"+id+"']").ready(() =>{
        const firstProduct= document.getElementById(id)
        firstProduct?.click()
      })
  }

}
import { Component, OnInit, Renderer2 } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {ContactModel, PaginacionContactsModel} from "../../models/ContactModel";
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'
import { ServiceContact } from '../../services/contacto/contacto.service'
import { InteraccionModel } from 'src/app/models/InteraccionModel';
import {MatPaginatorIntl, PageEvent} from '@angular/material/paginator';
import {FiltersSearchModel} from "../../models/FiltersSearchModel";
import { ActivatedRoute } from '@angular/router';
import { utilsFunctions } from 'src/app/Utils/UtilsFunctions';
//import { jQuery } from ''

declare var $: any; 
@Component({
  selector: 'app-Contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.scss']
})
export class ContactosComponent implements OnInit {
  public editFlag = true;
  public contacto : ContactModel={
      contactId: 0,
      contactName: "",
      phone: "",
      eMail: "",
      mobil:""
  };
  public advertiser: any;
  public listCollapsed: Boolean[] =[];
  public bcProductId = new utilsFunctions;
  public siteNAmeByBcProduct = '';
  public idBcProductSelect = '';
  public today = new Date();
  public initListContacts: PaginacionContactsModel = {
    actualPage: 1,
    totalPage: 0,
    registerByPage:10,
    registrerTotal:0,
    data: []
  }

  public listContacts: PaginacionContactsModel = this.initListContacts;
  public listInteracciones: InteraccionModel[];
  public interaccion: InteraccionModel ={
    tipo : '',
    status: '',
    fecha:''
  } 
  closeResult = '';
  faTrashAlt = faTrashAlt;
  faInfoCircle = faInfoCircle;
  faUserFriends = faUserFriends;
  faChevronDown = faChevronDown;

  //inician variables paginador
  pageSizeOptions = [10, 25, 50, 75];
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  //terminan variables paginador

  public filtersSearch: FiltersSearchModel = {
    id: true,
    nombre: true,
    telefono: true,
    email: true
  }
  public searchText: string = ''
  public arrayValidadJSON: String[]=[]

  constructor(
    private modalService: NgbModal,
    private  ServiceContact: ServiceContact,
    private paginator: MatPaginatorIntl,
    private route: ActivatedRoute
  ) {
    this.paginator.itemsPerPageLabel = "Registros por página";

  }
    
  ngOnInit(): void {
    this.advertiser = this.route.snapshot.params["advertiser_id"];
    console.log(this.advertiser)
    
  }
  public renderContacts(data: any){
    this.siteNAmeByBcProduct = data[0].siteName;
    this.idBcProductSelect = data[0].id;
    this.getListContacts(0, data[0].id,10, 1);
  }


  public getListContacts(Advertiser:number,BCproductId: string, RegisterByPage: number, page: number, search?: string){

    this.ServiceContact.getListContacts(Advertiser, BCproductId,RegisterByPage, page, search)

        .subscribe(response =>{
          this.listContacts = response;          
        })
      
  }
  updateListContact(){
    let id = this.bcProductId.getBcProduct();
     //$(".bcProoduct_click")[0].id
    this.getListContacts(0, id,10, 1);
    
  }
  
  public detailContacto(id: number, content?: any ){
   let detalleContacto = this.listContacts.data.find(x => x.contactId === id);
    this.contacto = {
      contactId: detalleContacto!.contactId,
      contactName: detalleContacto!.contactName,
      phone: detalleContacto!.phone,
      eMail: detalleContacto!.eMail,
      mobil:detalleContacto!.mobil
     }
    
    this.open(content)
  }
  public resetCollapseInteraction(){
    this.listCollapsed.forEach((elemento, indice) => {
      if (elemento === true) {
        this.listCollapsed[indice] = false;
      }
    });
  }
  public GetInteractionByIdContact(index: any,contactId:any){
    let bcproduct = this.bcProductId.getBcProduct();
   this.listCollapsed[index] = !this.listCollapsed[index] 

   if(this.listCollapsed[index] ){    
    this.ServiceContact.getInteractionByIdContact(contactId,bcproduct)
    .subscribe(response =>{
      
      if(response.length > 0) {


        var fechaTipo = response[0].dateInteracction.split('T')
        this.listInteracciones = []
        response.forEach((element: { type: any; statusCode: any; }) => {
 
        this.interaccion = { }        
 
        this.interaccion = {
         tipo: element.type,
         status: element.statusCode,
         fecha: fechaTipo[0] + ' '+ fechaTipo[1]
       }
 
       this.listInteracciones.push(this.interaccion) 
       
     });  

      }
       
 
    })    
   } 
    
  }
  
  public deleteContacto(id: number){
   let name = this.listContacts.data.find(x => x.contactId === id)?.contactName;
    Swal.fire({
      title: 'Eliminar !',
      text: "¿Estas seguro que deseas eliminar su contacto "+name+"?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#292263',
      cancelButtonColor: '#d33',
      cancelButtonText:'Cancelar',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ServiceContact.deleteContact(id.toString())
        .subscribe(response =>{
         console.log(response)
         Swal.fire(
           'Eliminado!',
           'Su contacto ha sido eliminado.',
           'success',
         )
          this.updateListContact()
        }, err =>{ console.log(err) })
      } 
    })

  }
  public open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
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
  public editarContacto(event: any){ 
    if(this.editFlag == false){
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Actualizado.',
        text: 'Su contacto ha sido actualizado correctamente',
        showConfirmButton: false,
        timer: 3000
      })
    }else {
     
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Los campos estan incorrectos!',
      })
    }
    this.editFlag = !this.editFlag;
  }
  public testFunctionActualizar(){
    let fieldError = ""
   if(this.editFlag){
      this.editFlag =!this.editFlag
    }else {
      this.arrayValidadJSON =[]      
      if(this.validateJson(this.contacto)){
        this.ServiceContact.putContact(this.contacto)
        .subscribe(response =>{
         
         Swal.fire(
           'Actualizado!',
           'Su contacto ha sido actualizado.',
           'success',
         )
         this.modalService.dismissAll()
         this.updateListContact()
        },err =>{ console.log(err) })
      }else{
        console.log(this.arrayValidadJSON)
        this.arrayValidadJSON.forEach((item,index)=>{
          fieldError += this.arrayValidadJSON[index]+" "
        })
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "Error al actualizar "+fieldError+" volver!",
        }) 
      }
      this.editFlag =!this.editFlag
    }
  }
  public validateJson(valueInputs: ContactModel):boolean{
    let  phoneExpression = new RegExp('^[0-9]{10}$');
    const emailExpression = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(valueInputs.contactName?.length == 0){
      
      this.arrayValidadJSON.push('Nombre')
      Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Algunos de los campos estan incoorrectos!',
    }) 
    return false}     
    if(!phoneExpression.test(valueInputs.phone!.toString())){
      console.log(valueInputs.phone.length)
      if(valueInputs.phone.length == 0){
        return true
      }
      this.arrayValidadJSON.push('Teléfono')
      return false
    }
    if(!emailExpression.test(valueInputs.eMail!.toString())){
      console.log(valueInputs.eMail)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El campo correo electronico  tiene errores!',
      }) 
      this.arrayValidadJSON.push('E-mail')
      return false
    }
    return true
  }
  public cancelButtonModal(){
    this.modalService.dismissAll()
    if(!this.editFlag){
      this.editFlag = !this.editFlag
    }
  }
  /*inicia metodos de paginador */
  handlePageEvent(e: PageEvent) {
    console.log(e);

    this.getListContacts(0, this.idBcProductSelect,e.pageSize, e.pageIndex+1);

    this.listContacts.actualPage = e.pageIndex+1;
    this.listContacts.registerByPage = e.pageSize;
    this.listContacts.registrerTotal = e.length;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
  /*Termina metodos de paginador */

  public onSearch(){

 /*   this.listContacts.actualPage = e.pageIndex+1;
    this.listContacts.registerByPage = e.pageSize;
    this.listContacts.registrerTotal = e.length;*/
    this.getListContacts(0, this.idBcProductSelect,
        this.listContacts.registerByPage,  this.listContacts.actualPage, this.searchText);

  }

  getValue(event: Event): string {
    let value=(event.target as HTMLInputElement).value;
    if(value=="")
    this.onSearch();
    
    //Usar esto por si se requiere filtrar al escribir en la caja
    //this.searchText=value;
    //this.onSearch();

    return (event.target as HTMLInputElement).value;
  }

}

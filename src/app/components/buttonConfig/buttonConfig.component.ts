import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { parse } from "@fortawesome/fontawesome-svg-core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
import { ContactModel, AddContactModel } from "../../models/ContactModel";
import { ServiceContact } from "../../services/contacto/contacto.service";
import * as XLSX from 'xlsx';

//import Swal from 'sweetalert2'

declare var $: any;
@Component({
  selector: "app-buttonConfig",
  templateUrl: "./buttonConfig.component.html",
  styleUrls: ["./buttonConfig.component.scss"],
})
export class ButtonConofig implements OnInit {
  public contacto: AddContactModel = {
    parentLocation: "",
    sendEmailClient: false,
    sendEmailBussines:false,
    contactRequest: {
      contactName: "",
      phone: "",
      eMail: "",
      comment: "",
      siteName: "",
      mobil:"",
      device:"",
      origin:"",
      data:"",
      uri:"",
      bcProduct:0
    },
    scheduleRequest: {
      calendarId: 0,
      dateCalendar: "",
      appointmentTime: "",
      observations: "",
      statusCode: "P"
    },
    notificationCode: ""
  };
  public iserrorAddContact = false;
  public errorAddContact: any;
  public ContactsExport: any = []

  public ContactExport:any ={

    Nombre: '',
    Telefono:'',
    Correo:'',
    Movil:''    
  }

  closeResult = "";
  public formAddContact = new FormGroup({
    contactName: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]),
    mobil: new FormControl('', [Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  public loadingInteracciones: boolean;



  @Input() siteName?: string; 
  @Input() Advertiser_id?: number; 
  @Input() Bc_Product_id?: string; 
  @Output()
  addNewContact = new EventEmitter<any>();
  
  constructor(
    private modalService: NgbModal,
    private ServiceContact: ServiceContact,
  ) {
    
  }

  ngOnInit(): void {}

  public addContact(event:any) {
    this.jsonNewContact();
    if(this.formAddContact.valid){
     this.postAddContact()
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algunos de los campos estan incorrectos!',
      })
    }
  }
  public jsonNewContact(){
    
    var device = "Desktop";
    if( navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i))
      {
        device = "Mobile"
      }

    if(navigator.userAgent.match(/iPad/i)){device = "Tablet"}
    this.contacto.sendEmailClient = false,
    this.contacto.sendEmailBussines = false,
    this.contacto.contactRequest.contactName = this.formAddContact.value.contactName!.toString()
    this.contacto.contactRequest.phone = <any> this.formAddContact.value.phone
    this.contacto.contactRequest.mobil = <any> this.formAddContact.value.mobil
    this.contacto.contactRequest.eMail = this.formAddContact.value.email!.toString()
    this.contacto.contactRequest.comment = "Contacto dado de alta desde modulo de contactos"
    this.contacto.contactRequest.siteName = this.siteName == null ? "a": this.siteName;
    this.contacto.contactRequest.device = device
    this.contacto.contactRequest.origin = "MiNegocio"
    this.contacto.contactRequest.uri = window.location.toString()
    this.contacto.contactRequest.data = ""
    this.contacto.contactRequest.bcProduct = Number(this.Bc_Product_id!)    
  }
  public postAddContact(){
    this.loadingInteracciones = true;
    this.ServiceContact.addContact(this.contacto)
    .subscribe((data) => {
        this.addNewContact.emit(data);
        $(".btn-close").trigger("click")
        console.log(data)
        this.loadingInteracciones = false;
        if(data.success == true){
          Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Agregado.',
          text: 'Su contacto ha sido creado correctamente',
          showConfirmButton: false,
          timer: 3000
        })  
        }    
        this.formAddContact.reset()
      },
      err => {
          this.loadingInteracciones = false;
      });
  }

  public openTriggerModal() {
    $("#buttonModal").trigger("click");
    this.formAddContact.value.contactName = ""
    this.formAddContact.value.phone = ""
    this.formAddContact.value.email = ""
    this.formAddContact.value.mobil = ""
  }
  open(content: any) {
    if($(".bcProoduct_click").length == 0){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Primero debes seleccionar un sitio!',
      })
    } else {
      this.modalService
        .open(content, { ariaLabelledBy: "modal-basic-title" })
        .result.then(
          (result) => {
            this.closeResult = `Closed with: ${result}`;
          },
          (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          }
        );
    }
  }
  private getDismissReason(reason: any): string {
    this.formAddContact.reset()
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
  public resetForm(){
    this.formAddContact.reset()
  }

  public exportToExcel(): void { 
    
    if(this.Advertiser_id && this.Bc_Product_id){

      this.ServiceContact.getListContactsAll(this.Advertiser_id,this.Bc_Product_id).subscribe((response: { data: { contactName: string; phone: string; eMail: string; }[]; }) => {

        this.ContactsExport = []
        
        response.data.forEach((element: { contactName: string, phone:string, eMail:string, mobil?:string }) => {
          this.ContactExport = {
            Nombre:element.contactName,
            Telefono:element.phone,
            Correo: element.eMail,
            Movil: element.mobil     
          }

          this.ContactsExport.push(this.ContactExport)
          this.ContactExport = {
            Nombre:'',
            Telefono:'',
            Correo:'',
            Movil:''        
          }
        });

        this.ContactExport = { }
        let fileName="contactos.xlsx";
        const worksheet = XLSX.utils.json_to_sheet(this.ContactsExport);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, fileName).then(function() {

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Exportado.',
            text: 'Su lista de contactos se exporto correctamente.',
            showConfirmButton: false,
            timer: 3000
          })
        },(err: any) =>{  Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Exportado.',
          text: err,
          showConfirmButton: false,
          timer: 3000
        }) }); 
        
      });
    }
    else{

      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Error.',
        text: 'Favor de seleccionar un sitio.',
        showConfirmButton: false,
        timer: 3000
      })

    }
  }

  async  saveAsExcelFile(buffer: any, fileName: string) {
    const data: Blob = new Blob([buffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
    const url = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    window.URL.revokeObjectURL(url);
  }
}

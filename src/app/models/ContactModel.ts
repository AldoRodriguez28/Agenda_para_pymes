
export interface PaginacionContactsModel {
    actualPage: number;
    totalPage: number;
    registerByPage: number;
    registrerTotal: number;
    data: ContactModel[];
};

export interface ContactModel {
    contactId: number;
    contactName: string;
    phone: string;
    eMail: string;
    mobil:string;    
}

export interface AddContactModel {
  parentLocation: string,
  sendEmailClient:boolean,
  sendEmailBussines: boolean,
  contactRequest: {
    contactName: string,
    phone: string,
    eMail: string,
    comment: string,
    siteName: string,
    mobil:string,
    interactionType?:number,
    device:string,
    origin:string,
    data?:string,
    uri:string,
    bcProduct:number
  },
  scheduleRequest: {
    calendarId: number,
    dateCalendar: string,
    appointmentTime: string,
    observations: string,
    statusCode: string
  },
  notificationCode: string
}
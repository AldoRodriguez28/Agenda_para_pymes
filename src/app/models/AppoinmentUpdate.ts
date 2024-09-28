export interface AppointmentUpdate {
    parentLocation: string
    sendEmailClient: boolean
    sendEmailBussines: boolean
    contactRequest: {
      contactName: string
      phone: string
      mobil: string
      eMail: string
      comment: string
      siteName: string
      interactionType: number
    }
    scheduleRequest: {
      appointmentId: number
      calendarId: number
      dateCalendar: string
      appointmentTime: string
      observations: string
      statusCode: string
    }
    notificationCode: string
  }
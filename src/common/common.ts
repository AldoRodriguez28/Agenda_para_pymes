import { AppoimentCalendar } from 'src/app/models/AppoimentCalendarModel';
import * as Times from "src/app/Utils/Times";

export const obtenerFechaInicioDeMes = () => {
    const fechaInicio = new Date();
    // Iniciar en este año, este mes, en el día 1

    return formatearFecha(new Date(fechaInicio.getFullYear(), fechaInicio.getMonth(), 1));
};


export const obtenerFechaFinDeMes = () => {
    const fechaFin = new Date();
    // Iniciar en este año, el siguiente mes, en el día 0 (así que así nos regresamos un día)
    return formatearFecha( new Date(fechaFin.getFullYear(), fechaFin.getMonth() + 1, 0));
};

export const obtenerFechaInicioNMes = (nMes: number, Anio: number) => {
    const fechaInicio = new Date();
    // Iniciar en este año, este mes, en el día 1

    return formatearFecha(new Date(Anio, nMes, 1));
};

export const obtenerFechaFinNMes = (nMes: number, Anio: number) => {
    const fechaFin = new Date();
    // Iniciar en este año, el siguiente mes, en el día 0 (así que así nos regresamos un día)
    return formatearFecha( new Date(Anio, nMes + 1, 0));
};
export const diasEnUnMes = (mes: number, anio: number) => {
    return new Date(anio, mes, 0).getDate();
}

export const obtenerFechaDia = (dateI: Date) => {
    const anio = dateI.getFullYear();
    const mes: number = (dateI.getMonth()+1)<10?  parseInt('0'+ (dateI.getMonth()+1)): (dateI.getMonth()+1);
    const dia = (dateI.getDate()<10)? '0'+ dateI.getDate() : dateI.getDate();
    console.log(anio + '-' + mes + '-' + dia)

    return anio + '-' + mes + '-' + dia;
}


export const formatearFecha = (fecha: Date) => {
    const mes = fecha.getMonth() + 1;
    const dia = fecha.getDate();
    return `${fecha.getFullYear()}-${(mes < 10 ? '0' : '').concat(String(mes))}-${(dia < 10 ? '0' : '').concat(String(dia))}`;
};

export const timeCalendar = (AppoimentCalendar: AppoimentCalendar[]) => {
            let newTime = Times.time         
            AppoimentCalendar.forEach((el: any) => {
              let times = el.initialDate.split("T");
              let date = times[1].substring(0,5);     
              newTime = newTime.filter( x => x.value != date)
            });
    return newTime ;
};

export const obtenerNombreMes = (numMes: number): string => {
    switch (numMes){
        case 1:
            return 'Enero'
            break;
        case 2:
            return 'Febrero'
            break;
        case 3:
            return 'Marzo'
            break;
        case 4:
            return 'Abril'
            break;
        case 5:
            return 'Mayo'
            break;
        case 6:
            return 'Junio'
            break;
        case 7:
            return 'Julio'
            break;
        case 8:
            return 'Agosto'
            break;
        case 9:
            return 'Septiembre'
            break;
        case 10:
            return 'Octubre'
            break;
        case 11:
            return 'Noviembre'
            break;
        case 12:
            return 'Diciembre'
            break;

        default:
            return ''
    }


};
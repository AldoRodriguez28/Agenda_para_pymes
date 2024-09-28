import { horariosModel } from 'src/app/models/horarios';
import {OpeningDays} from "./OpeningDays";
export interface RecursoModel {
    tipo?: string,
    nombre?: string,
    typeId?: number,
    calendarId?:number,
    horarios?: horariosModel[],
    bcProductId?: string,
    siteName?: string
    openingDays?:OpeningDays[];
  };
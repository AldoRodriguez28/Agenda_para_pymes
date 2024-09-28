import {createReducer, on, State} from '@ngrx/store';
import {onLoadDatesActions} from '../actions/calendar.actions';
import {OnLoadDatesModel} from "../models/OnLoadDatesModel";

export const initialState: number = 0;
export const calendarReducer = createReducer(
  initialState,
  on(onLoadDatesActions, (state) => ( state = (state==1)? 0: 1)),
);



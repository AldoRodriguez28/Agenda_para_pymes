export interface OpeningDays {
    dayId: number;
    dayName: string;
    closedDay: boolean;
    hours: HoursOpening[]
}
export interface HoursOpening {
    scheduleServiceId: number
    startTime: string;
    endTime: string;

}
import * as moment from 'moment'

export const getCountdown = (endDate) => {
    const startDate = moment();
    const start_date = moment( startDate, 'YYYY-MM-DD HH:mm' );
    const end_date = moment( endDate, 'YYYY-MM-DD HH:mm' );
    const duration = moment.duration( end_date.diff( start_date ) );
    const days = duration.asDays();
    // Convert days
    const daysInt = Math.floor( days )
    const daysDecimals = days - daysInt
    const hours = daysDecimals * 24
    const hoursInt = Math.floor( hours )
    const hoursDecimals = hours - hoursInt
    const mins = hoursDecimals * 60
    const minsInt = Math.floor( mins )
    return {
      days: daysInt,
      hours: hoursInt,
      mins: minsInt,
      deltaInDays: parseFloat(days.toFixed(2))
    };
}

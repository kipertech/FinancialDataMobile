import moment from 'moment';

// region Get time range format
export function getTimeRangeFormat(startTime, endTime, showMinute = false)
{
    let startMoment = moment.unix(startTime),
        endMoment = moment.unix(endTime),
        timeFormat = showMinute ? 'h:mm A' : 'h A';

    if (startMoment.isSame(endMoment, 'day'))
    {
        return(startMoment.format(timeFormat) + ' - ' + endMoment.format(timeFormat) + ', ' + startMoment.format('MMM D, YYYY'));
    }
    else
    {
        // Has to subtract one day at end date to display since
        // returned data only contains up to 0 AM of the end date
        return(startMoment.format('MMM D, YYYY') + ' - ' + endMoment.format('MMM D, YYYY'));
    }
}
// endregion

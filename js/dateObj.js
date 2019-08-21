const months = [{
        index: 1,
        long: 'January',
        short: 'Jan'
    },
    {
        index: 2,
        long: 'February',
        short: 'Feb'
    },
    {
        index: 3,
        long: 'March',
        short: 'Mar'
    },
    {
        index: 4,
        long: 'April',
        short: 'Apr'
    },
    {
        index: 5,
        long: 'May',
        short: 'May'
    },
    {
        index: 6,
        long: 'June',
        short: 'Jun'
    },
    {
        index: 7,
        long: 'July',
        short: 'Jul'
    },
    {
        index: 8,
        long: 'August',
        short: 'Aug'
    },
    {
        index: 9,
        long: 'September',
        short: 'Sep'
    },
    {
        index: 10,
        long: 'October',
        short: 'Oct'
    },
    {
        index: 11,
        long: 'November',
        short: 'Nov'
    },
    {
        index: 12,
        long: 'December',
        short: 'Dec'
    }
];

const days = [{
        index: 1,
        short: 'Sun',
        long: 'Sunday'
    },
    {
        index: 2,
        short: 'Mon',
        long: 'Monday'
    },
    {
        index: 3,
        short: 'Tue',
        long: 'Tuesday'
    },
    {
        index: 4,
        short: 'Wed',
        long: 'Wednesday'
    },
    {
        index: 5,
        short: 'Thu',
        long: 'Thursday'
    },
    {
        index: 6,
        short: 'Fri',
        long: 'Friday'
    },
    {
        index: 7,
        short: 'Sat',
        long: 'Sunday'
    },
];

const newDate = new Date();
const day = days[newDate.getDay()];
const month = months[newDate.getMonth()];
const date = newDate.getDate();
const year = newDate.getFullYear().toString();
const hour = newDate.getHours();
const hr12 = hour12(hour);
const minute = newDate.getMinutes();
const second = newDate.getSeconds();
const ms = newDate.getMilliseconds();

function getDateObj() {

    const dateObj = {
        d: day.index,
        dd: ("0" + day.index).slice(-2),
        ddd: day.short,
        dddd: day.long,
        M: month.index,
        MM: ("0" + month.index).slice(-2),
        MMM: month.short,
        MMMM: month.long,
        Mo: postfix(month.index),
        D: date,
        DD: ("0" + date).slice(-2),
        Do: postfix(newDate.getDate()),
        Y: year,
        YY: year.slice(2),
        YYYY: year,
        H: hour,
        HH: ("0" + hour).slice(-2),
        Ho: postfix(hour),
        h: hr12,
        hh: ("0" + hr12).slice(-2),
        ho: postfix(hr12),
        m: minute,
        mm: ("0" + minute).slice(-2),
        mo: postfix(minute),
        s: second,
        ss: ("0" + second).slice(-2),
        sss: ms,
        ssss: ("00" + ms).slice(-3),
        so: postfix(second),
    }
    return dateObj;
};

function hour12(hr) {
    return hr == 0 ? hr + 12 : (hr < 13 ? hr : hr - 12);
}


function postfix(x) {
    if (isNaN(Number(x))) {
        return x
    }

    const lastDigit = x.toString().slice(-1);
    if (lastDigit == 1) {
        return x + 'st';
    } else if (lastDigit == 2) {
        return x + 'nd';
    } else if (lastDigit == 3) {
        return x + 'rd';
    } else {
        return x + 'th';
    }
}

const  months = [
  { index: 1, long: 'January', short: 'Jan' },
  { index: 2, long: 'February', short: 'Feb' },
  { index: 3, long: 'March', short: 'Mar' },
  { index: 4, long: 'April', short: 'Apr' },
  { index: 5, long: 'May', short: 'May' },
  { index: 6, long: 'June', short: 'Jun' },
  { index: 7, long: 'July', short: 'Jul' },
  { index: 8, long: 'August', short: 'Aug' },
  { index: 9, long: 'September', short: 'Sep' },
  { index: 10, long: 'October', short: 'Oct' },
  { index: 11, long: 'November', short: 'Nov' },
  { index: 12, long: 'December', short: 'Dec' }
];

const days = [
  { index: 1, short: 'Sun', long: 'Sunday' },
  { index: 2, short: 'Mon', long: 'Monday' },
  { index: 3, short: 'Tue', long: 'Tuesday' },
  { index: 4, short: 'Wed', long: 'Wednesday' },
  { index: 5, short: 'Thu', long: 'Thursday' },
  { index: 6, short: 'Fri', long: 'Friday' },
  { index: 7, short: 'Sat', long: 'Sunday' },
];


function dateObj(dt='') {
  let newDate;
  
  if (dt == '') {
    newDate = new Date();
  } else {
    newDate = new Date(dt);
  }  
  
  const day = days[newDate.getDay()];
  const month = months[newDate.getMonth()];
  const date = newDate.getDate();
  const year = newDate.getFullYear().toString();
  const hour = newDate.getHours(); 
  const hr12 = hour12(hour);
  const minute = newDate.getMinutes();
  const second = newDate.getSeconds(); 
  const ms = newDate.getMilliseconds();
  
  export const dateobj = {
    DayOfWeek: '=======================',
    e: day.index,
    ee: ("0" + day.index).slice(-2),
    eee: day.short,
    eeee: day.long,
    Month: '=======================',
    M: month.index,
    MM: ("0" + month.index).slice(-2),
    MMM: month.short, 
    MMMM: month.long,
    Mo: postfix(month.index),
    DayOfMonth: '=======================',
    d: date,
    dd: ("0" + date).slice(-2),
    do: postfix(newDate.getDate()),
    Year: '=======================',
    y: year,
    yy: year.slice(2),
    yyyy: year,
    Hours_24: '=======================',
    H: hour,
    HH: ("0" + hour).slice(-2),
    Ho: postfix(hour), 
    Hours_12: '=======================',
    h: hr12,
    hh: ("0" + hr12).slice(-2), 
    ho: postfix(hr12),
    Minutes: '=======================',
    m: minute,
    mm: ("0" + minute).slice(-2),
    mo: postfix(minute),
    Seconds: '=======================',
    s: second,
    ss: ("0" + second).slice(-2), 
    sss: ms,
    ssss: ("00" + ms).slice(-3),
    so: postfix(second), 
    AM_PM: '=======================',
    a: getMeridiem(hour).slice(0,1),
    aa: getMeridiem(hour),
    A: getMeridiem(hour).slice(0,1).toUpperCase(),
    AA: getMeridiem(hour).toUpperCase(),
    Formats: '======================='
  } 
  dateobj.short = 
    dateobj.M + "/" +  
    dateobj.d + "/" +  
    dateobj.yy + ", " +
    dateobj.h + ":" +  
    dateobj.mm + " " +  
    dateobj.aa ;
  dateobj.medium = 
    dateobj.MMM + " " +  
    dateobj.d + ", " +  
    dateobj.yyyy + ", " +
    dateobj.h + ":" +  
    dateobj.mm + " " +  
    dateobj.aa ;
  dateobj.long = 
    dateobj.eeee + ",  " +  
    dateobj.MMMM + " " +  
    dateobj.d + ", " +  
    dateobj.yyyy + " - " +
    dateobj.h + ":" +  
    dateobj.mm + ":" + 
    dateobj.ss + " " +  
    dateobj.aa ;
  dateobj.full = 
    dateobj.eeee + ", " +  
    dateobj.MMMM + " " +  
    dateobj.d + ", " +  
    dateobj.y + " - " +
    dateobj.h + ":" +  
    dateobj.mm + ":" + 
    dateobj.ss + " " +  
    dateobj.aa ; 
  
  dateobj.shortDate = 
    dateobj.M + "/" +  
    dateobj.d + "/" +  
    dateobj.yy ;
  dateobj.mediumDate = 
    dateobj.MMM + " " +  
    dateobj.d + ", " +  
    dateobj.y ;
  dateobj.longDate = 
    dateobj.MMMM + " " +  
    dateobj.d + ", " +  
    dateobj.y ;
  dateobj.fullDate = 
    dateobj.eeee + ", " +
    dateobj.MMMM + " " +  
    dateobj.d + ", " +  
    dateobj.y ;  
  
  dateobj.shortTime = 
    dateobj.h + ":" +  
    dateobj.mm + " " +  
    dateobj.aa ;
  dateobj.mediumTime = 
    dateobj.h + ":" +  
    dateobj.mm + ":" +  
    dateobj.ss + " " +  
    dateobj.aa ;
  dateobj.longTime = 
    dateobj.h + ":" +  
    dateobj.mm + ":" +  
    dateobj.ss + " " +  
    dateobj.AA ;
  
    return dateobj;
}

function hour12(hr) { 
  return hr == 0 ? hr + 12 : (hr < 13 ? hr : hr - 12);
}

function getMeridiem(hr) {
  return hr < 12 ? 'am' : 'pm';
}

function postfix(x) {
  if ( isNaN(Number(x)) ) {  return x }
  
  const lastDigit = x.toString().slice(-1);
  if ( x == 0 )             { return x; }
  else if (lastDigit == 1)  { return x + 'st'; }
  else if (lastDigit == 2)  { return x + 'nd'; }
  else if (lastDigit == 3)  { return x + 'rd'; }
  else                      { return x + 'th'; }
}

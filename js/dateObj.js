/*
  This is dateFormat from steven levithan
  I changed a couple of format options
  http://blog.stevenlevithan.com/archives/date-time-format
*/

const dateObj = function () {
	var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LlOoSZYWN]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};  
  
  	// Regexes and supporting functions are cached through closure
    return function (date, mask, utc) {
      var dF = dateObj;

      // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
      if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
        mask = date;
        date = undefined;
      }

      // Passing date through Date applies Date.parse, if necessary
      date = date ? new Date(date) : new Date;
      if (isNaN(date)) throw SyntaxError("invalid date");

      mask = String(dF.masks[mask] || mask || dF.masks["default"]);

      // Allow setting the utc argument via the mask
      if (mask.slice(0, 4) == "UTC:") {
        mask = mask.slice(4);
        utc = true;
      }

      var	_ = utc ? "getUTC" : "get",
        d = date[_ + "Date"](),
        D = date[_ + "Day"](),
        m = date[_ + "Month"](),
        Y = date[_ + "FullYear"](),
        H = date[_ + "Hours"](),
        M = date[_ + "Minutes"](),
        s = date[_ + "Seconds"](),
        L = date[_ + "Milliseconds"](),
        O = utc ? 0 : date.getTimezoneOffset(),
        W = weekOfYear(date),
        N = dayOfWeek(date)
          
        flags = {
          d:    d,
          dd:   pad(d),
          ddd:  dF.i18n.dayNames[D],
          dddd: dF.i18n.dayNames[D + 7],
          m:    m + 1,
          mm:   pad(m + 1),
          mmm:  dF.i18n.monthNames[m],
          mmmm: dF.i18n.monthNames[m + 12],
          yy:   String(Y).slice(2),
          yyyy: Y,
          Y:    Y,
          h:    H % 12 || 12,
          hh:   pad(H % 12 || 12),
          H:    H,
          HH:   pad(H),
          M:    M,
          MM:   pad(M),
          s:    s,
          ss:   pad(s),
          l:    pad(L, 3),
          L:    pad(L > 99 ? Math.round(L / 10) : L),
          t:    H < 12 ? "a"  : "p",
          tt:   H < 12 ? "am" : "pm",
          T:    H < 12 ? "A"  : "P",
          TT:   H < 12 ? "AM" : "PM",
          Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
          O:    (O > 0 ? "-" : "+") + pad(Math.floor(Math.abs(O) / 60) * 100 + Math.abs(O) % 60, 4),
          S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10],
          o:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10],
          W:    W,
          N:    N
        };

      return mask.replace(token, function ($0) {
        return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
      });
    };
  }();

// ===================================================== //

// Some common format strings
dateObj.masks = {
	"default":      "ddd mmm dd yyyy HH:MM:ss",
	shortDate:      "m/d/yy",
	mediumDate:     "mmm d, yyyy",
	longDate:       "mmmm d, yyyy",
	fullDate:       "dddd, mmmm d, yyyy",
	shortTime:      "h:MM tt",
	mediumTime:     "h:MM:ss tt",
	longTime:       "h:MM:ss tt Z",
	isoDate:        "yyyy-mm-dd",
	isoTime:        "HH:MM:ss",
	isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",
};

// Internationalization strings
dateObj.i18n = {
	dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
	monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]
};

isLeapYear = function(year=dateObj("yyyy")) {
  return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

daysInYear = function(year=dateObj("yyyy")) {
  x = 365;
  if (isLeapYear(year)) {
    x += 1;
  }
  return x;
}

daysInMonth = function(date=dateObj()) {
  var year = dateObj(date, "yyyy")
  var month = dateObj(date, "m");
  var numDays = [31,28,31,30,31,30,31,31,30,31,30,31];
  if (isLeapYear(dateObj(date, "yyyy")) && month === "2") {
    return 29;
  }
  return numDays[month-1];
}

dayOfYear = function(date=dateObj()) {
  let x = dateObj(date, "d")*1;
  let year = dateObj(date, "yyyy")
  let month = dateObj(date, "m")*1;

  // console.log(typeof(year));
  for (let i = 1; i < month; ++i) { 
    x += daysInMonth(dateObj( year +" " +  i.toString() ));
  }      
  return x;
}

weekOfYear = function(date=dateObj()) {
  // Remove time components of date
  let targetThursday = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  // Change date to Thursday same week
  targetThursday.setDate(targetThursday.getDate() - ((targetThursday.getDay() + 6) % 7) + 3);
  // Take January 4th as it is always in week 1 (see ISO 8601)
  let firstThursday = new Date(targetThursday.getFullYear(), 0, 4);
  // Change date to Thursday same week
  firstThursday.setDate(firstThursday.getDate() - ((firstThursday.getDay() + 6) % 7) + 3);
  // Check if daylight-saving-time-switch occurred and correct for it
  let ds = targetThursday.getTimezoneOffset() - firstThursday.getTimezoneOffset();
  targetThursday.setHours(targetThursday.getHours() - ds);
  // Number of weeks between target Thursday and first Thursday
  var weekDiff = (targetThursday - firstThursday) / (86400000*7);
  return 1 + Math.floor(weekDiff);  
}

dayOfWeek = function(date=dateObj()) {
  var dow = date.getDay();
  if(dow === 0) {
    dow = 7;
  }
  return dow;
}



// For convenience...
Date.prototype.format = function (mask, utc) {
	return dateObj(this, mask, utc);
};

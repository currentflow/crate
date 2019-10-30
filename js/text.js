var dateObj = function () {
	var	token = /d{1,4}|M{1,4}|yy(?:yy)?|([HhmsTt])\1?|[LloSZzWNqQ]|"[^"]*"|'[^']*'/g,
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
			M = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			m = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			z = utc ? 0 : date.getTimezoneOffset(),
			W = getWeek(date),
			N = dayOfYear(date),
			q = daysInMonth(date),
			Q = daysInYear(date),
			flags = {
				d:    d,
				dd:   pad(d),
				ddd:  dF.i18n.dayNames[D],
				dddd: dF.i18n.dayNames[D + 7],
				M:    M + 1,
				MM:   pad(M + 1),
				MMM:  dF.i18n.monthNames[M],
				MMMM: dF.i18n.monthNames[M + 12],
				yy:   String(y).slice(2),
				yyyy: y,
				h:    H % 12 || 12,
				hh:   pad(H % 12 || 12),
				H:    H,
				HH:   pad(H),
				m:    m,
				mm:   pad(m),
				s:    s,
				ss:   pad(s),
				l:    pad(L, 3),
				L:    pad(L > 99 ? Math.round(L / 10) : L),
				t:    H < 12 ? "a"  : "p",
				tt:   H < 12 ? "am" : "pm",
				T:    H < 12 ? "A"  : "P",
				TT:   H < 12 ? "AM" : "PM",
				Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				z:    (z > 0 ? "-" : "+") + pad(Math.floor(Math.abs(z) / 60) * 100 + Math.abs(z) % 60, 4),
				S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10],
				o:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10],
				W:    W,
				N:    N,
				q:    q,
				Q:    Q
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

// Some common format strings
dateObj.masks = {
	"default":      "ddd MMM dd yyyy HH:mm:ss",
	shortDate:      "M/d/yy",
	mediumDate:     "MMM d, yyyy",
	longDate:       "MMMM d, yyyy",
	fullDate:       "dddd, MMMM d, yyyy",
	shortTime:      "h:mm tt",
	mediumTime:     "h:mm:ss tt",
	longTime:       "h:mm:ss tt Z",
	isoDate:        "yyyy-MM-dd",
	isoTime:        "HH:mm:ss",
	isoDateTime:    "yyyy-MM-dd'T'HH:mm:ss",
	isoUtcDateTime: "UTC:yyyy-MM-dd'T'HH:mm:ss'Z'"
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

isLeapYear = function(year) {
  return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

daysInYear = function(year) { // Q
  x = 365;
  if (isLeapYear(year)) {
    x += 1;
  }
  return x;
}

daysInMonth = function(date) { // q
  var dt = new Date(date);
  let month = dt.getMonth();
  let year = dt.getFullYear();
  var numDays = [31,28,31,30,31,30,31,31,30,31,30,31];
  if (isLeapYear(year) && month === "2") {
    return 29;
  }
  return numDays[month-1];
}

dayOfYear = function(date) { // N
  var dt = new Date(date);
  let x = dt.getDate();
  let month = dt.getMonth();
  let year = dt.getFullYear();
  

  // console.log(typeof(year));
  for (let i = 1; i < month; ++i) { 
    x += daysInMonth(dt);
  }      
  return x;
}

getDayOfWeek = function(date) { // n
  var dow = date.getDay();
  if(dow === 0) {
    dow = 7;
  }
  return dow;
}

getWeek = function(date) { // W
  // Remove time components of date
  var targetThursday = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  // Change date to Thursday same week
  targetThursday.setDate(targetThursday.getDate() - ((targetThursday.getDay() + 6) % 7) + 3);

  // Take January 4th as it is always in week 1 (see ISO 8601)
  var firstThursday = new Date(targetThursday.getFullYear(), 0, 4);

  // Change date to Thursday same week
  firstThursday.setDate(firstThursday.getDate() - ((firstThursday.getDay() + 6) % 7) + 3);

  // Check if daylight-saving-time-switch occurred and correct for it
  var ds = targetThursday.getTimezoneOffset() - firstThursday.getTimezoneOffset();
  targetThursday.setHours(targetThursday.getHours() - ds);

  // Number of weeks between target Thursday and first Thursday
  var weekDiff = (targetThursday - firstThursday) / (86400000*7);
  return 1 + Math.floor(weekDiff);
}

// For convenience...
Date.prototype.format = function (mask, utc) {
	return dateObj(this, mask, utc);
};

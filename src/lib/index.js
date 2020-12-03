export const sortBy = (field, reverse, primer) => {
	var key = primer ?
        function(x) {return primer(x[field])} :
        function(x) {return x[field]};

    reverse = !reverse ? 1 : -1;

    return function (a, b) {
        return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
    }
}

export const toChar = (text) => {

    if (text == null) {
        return null;
    }
    
	var entities = [
        ['amp', '&'],
        ['apos', '\''],
        ['#x27', '\''],
        ['#x2F', '/'],
        ['#39', '\''],
        ['#47', '/'],
        ['lt', '<'],
        ['gt', '>'],
        ['nbsp', ' '],
        ['quot', '"']
    ];

    for (var i = 0, max = entities.length; i < max; ++i) 
        text = text.replace(new RegExp('&'+entities[i][0]+';', 'g'), entities[i][1]);

    return text;
}

export const toSerialize = (obj) => {
    var str = [];
    for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
    return str.join("&");
}

export const strLimit = (str, limit:number) => {
    if(str.length > limit) {
        return str.substring(0,limit)+'...';
    }

    return str;
}

export const convertToRupiah = (angka:number) => {

    var negatif = '';
    var rupiah = '';  

    if (angka < 0)
    {
        angka = Math.abs(angka);
        negatif = '-';
    }

    var angkarev = angka.toString().split('').reverse().join('');
    for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';

    return negatif+'Rp'+rupiah.split('',rupiah.length-1).reverse().join('');
}

export const convertToPoint = (angka:number) => {
    
    var negatif = '';
    var rupiah = '';  

    if (angka < 0)
    {
        angka = Math.abs(angka);
        negatif = '-';
    } 

    var angkarev = angka.toString().split('').reverse().join('');
    for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';

    return negatif+rupiah.split('',rupiah.length-1).reverse().join('')+' Poin';
}

export const formatDate = (date, full) => {

    if (full) {
        var monthNames = [
            "Januari", "Februari", "Maret",
            "April", "Mei", "Juni", "Juli",
            "Agustus", "September", "Oktober",
            "November", "Desember"
        ];
    } else {
        var monthNames = [
            "Jan", "Feb", "Mar",
            "Apr", "Mei", "Jun", "Jul",
            "Agu", "Sep", "Okt",
            "Nov", "Des"
        ];
    }

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

export const nowDate = () => {
    
    let date = new Date();

    let dd = date.getDate();
    let mm = date.getMonth()+1; //January is 0!
    let yyyy = date.getFullYear();
    let hh = date.getHours();
    let ii = date.getMinutes();
    let ss = date.getSeconds();

    if(dd<10){
      dd='0'+dd;
    } 

    if(mm<10){
      mm='0'+mm;
    } 

    if(ii<10){
      ii='0'+ii;
    } 

    if(ss<10){
      ss='0'+ss;
    }

    let nowDate = yyyy+'-'+mm+'-'+dd+' '+hh+':'+ii+':'+ss;
    
    return nowDate;
}

export const timestamp = () => {  
    return new Date().valueOf();
}

export const round = (value, precision) => {

    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

export const dateTime = (date) => {
    if (date == null || typeof date == 'undefined') return 'Belum ada';

    date = typeof date != 'undefined' ? date : nowDate();
    
    let dateTime = typeof date != 'undefined' || date != null ? date.split(' ') : null;
    let time = dateTime != null ? dateTime[1].split(':') : null;

    if (time) {
        return formatDate(new Date(dateTime[0]))+' '+time[0]+':'+time[1];
    } else {
        return formatDate(new Date(dateTime[0]));
    }
}

export const filterItems = (needle, heystack) => {

    let query = needle.toLowerCase();
    return heystack.filter(item => item.name.toLowerCase().indexOf(query) >= 0);
}

export const generateMessageId = () => {
    var d = new Date();

    var s = d.getFullYear() + '-' +
    (d.getMonth() +1) + '-' +
    (d.getDay() +1) + ' ' +
    d.getHours() + ':' +
    d.getMinutes() + ':' +
    d.getSeconds() + ' ' +
    d.getMilliseconds();

    var a = 1, c = 0, h, o;

    if (s) {
        a = 0;

        for (h = s.length - 1; h >= 0; h--) {
          o = s.charCodeAt(h);
          a = (a<<6&268435455) + o + (o<<14);
          c = a & 266338304;
          a = c!==0?a^c>>21:a;
        }
    }

    return String(a);
}

export const nowDateFull = () => {
    
    var bulan = ['jan', 'feb', 'mar', 'apr', 'mei', 'jun', 'jul', 'agust','sept', 'okt', 'nov' , 'des'];
    var currentdate = new Date();
    var datetime = currentdate.getDate() + " "
      + bulan[(currentdate.getMonth()+1) -1]  + " "
      + currentdate.getFullYear() + " "
      + currentdate.getHours() + ":"
      + currentdate.getMinutes();
    return datetime;
}

export const errorMessage = (msg) => {

    if (typeof msg === 'object') {
        msg = msg.property+': '+msg.message;
    }

    return msg;
}

export const generateCode = (length, type) => {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    if (type == 'upper') {
        characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    } else if (type == 'lower') {
        characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    }

    let charactersLength = characters.length;

    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    
    return result;
}

export const dayName = (dateString) => {
    
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var d = new Date(dateString);
    var dayName = days[d.getDay()];

    return dayName;
}

export const capitalizeFirstLetter = (string = 'loading...') => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const timeNow = (string) => {
    let date = nowDate();
    let time = date.split(' ')[1];

    let timeArr = time.split(':');
    time = timeArr[0]+':'+timeArr[1];

    return time;
}


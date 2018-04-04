export function afterDays (days) {
  let data = new Date()
  let timestamp = Date.parse(data)
  timestamp = timestamp / 1000
  timestamp = timestamp + days * 86400
  data.setTime(timestamp * 1000)
  timestamp = data.toLocaleDateString()
  return timestamp.replace(/\//g, '-')
}
export function getDate(_data = null, format="yyyy-MM-dd") {
  let data = null;
  if (_data === null) {
    data = new Date()
  } else {
    data = _data
  }

  var o = {
    "M+" : data.getMonth()+1, //month
    "d+" : data.getDate(), //day
    "h+" : data.getHours(), //hour
    "m+" : data.getMinutes(), //minute
    "s+" : data.getSeconds(), //second
    "q+" : Math.floor((data.getMonth()+3)/3), //quarter
    "S" : data.getMilliseconds() //millisecond
    }
    if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
    (data.getFullYear()+"").substr(4- RegExp.$1.length));
    for(var k in o)if(new RegExp("("+ k +")").test(format))
    format = format.replace(RegExp.$1,
    RegExp.$1.length==1? o[k] :
    ("00"+ o[k]).substr((""+ o[k]).length));
    return format;
}
export function DateAdd (cur,strInterval, Number) {  
  let dtTmp = new Date(cur); 
  switch (strInterval) {  
      case 's' :return new Date(Date.parse(dtTmp) + (1000 * Number)); 
      case 'n' :return new Date(Date.parse(dtTmp) + (60000 * Number)); 
      case 'h' :return new Date(Date.parse(dtTmp) + (3600000 * Number)); 
      case 'd' :return new Date(Date.parse(dtTmp) + (86400000 * Number)); 
      case 'w' :return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number)); 
      case 'q' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number*3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds()); 
      case 'm' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds()); 
      case 'y' :return new Date((parseInt(dtTmp.getFullYear()) + parseInt(Number)), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds()); 
  } 
} 

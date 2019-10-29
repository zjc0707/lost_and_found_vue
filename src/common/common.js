const httpUrl = "http://127.0.0.1:8567/LAF";

function url(api){
  return httpUrl.concat(api);
}

function logError(err){
  if(err.code){
    if(err.code === "2201" || err.code === "1111"){
      //权限不足不作处理
      return;
    }
  }
  console.log(err);
}
function getDate(timeStamp){
  // let isSmall = window.screen.width < 500;
  let isSmall = false;
  if(timeStamp === null || timeStamp === ''){
    return '';
  }
  let date = new Date(timeStamp),
    y = date.getFullYear(),
    m = date.getMonth(),
    d = date.getDate(),
    now = new Date();
  let time = date.toTimeString().substr(0, 5);
  if(y === now.getFullYear() && m === now.getMonth()){
    if(d === now.getDate()){
      return isSmall ? time : "今天 " + time;
    }
    if(d + 1 === now.getDate()){
      return isSmall ? "昨天" : "昨天 " + time;
    }
  }
  m += 1;
  let md = (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d);// + " " + time;
  if(y === now.getFullYear()){
    return isSmall ? md : md + ' ' + time;
  }else{
    return isSmall ? y : y + "-" + md + ' ' + time;
  }
}

function getStringRealLength(str){
  let realLength = 0;
  for(let i = 0; i < str.length; i++){
    let charCode = str.charCodeAt(i);
    if (charCode >= 0 && charCode <= 128)
      realLength += 1;
    else
      realLength += 2;
  }
  return realLength;
}

function isStrLengthBetweenMaxAndMin(str, max, min) {
  let length = getStringRealLength(str);
  return max >= length && length >= min;
}

function stringTooLong(str, max){
  max *= 2;
  let realLength = 0, len = str.length, rs = String();
  for (let i = 0; i < len; i++) {
    let charCode = str.charCodeAt(i);
    let char = str.charAt(i);
    // console.log(char +'_'+ charCode);
    if (charCode >= 0 && charCode <= 128)
      realLength += 1;
    else
      realLength += 2;
    rs = rs.concat(char);
    if(realLength >= max){
      return rs.concat("...");
    }
  }
  return str;
}

function messageTitleResize(str){
  let max = 20;
  if(window.screen.width < 370){
    max = 10;
  }
  else if(window.screen.width < 769){
    max = 15;
  }
  else if(window.screen.width < 1170){
    max = 18;
  }
  else{
    return str;
  }
  return stringTooLong(str, max);
}

export default {
  httpUrl,
  url,
  logError,
  getDate,
  stringTooLong,
  messageTitleResize,
  getStringRealLength,
  isStrLengthBetweenMaxAndMin
}

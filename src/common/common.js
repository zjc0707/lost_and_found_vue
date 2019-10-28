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
  let isSmall = window.screen.width < 500;
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

function getLength(str){
  let realLength = 0, len = str.length, charCode = -1;
  for (let i = 0; i < len; i++) {
    charCode = str.charCodeAt(i);
    if (charCode >= 0 && charCode <= 128)
      realLength += 1;
    else
      realLength += 2;
  }
  return realLength;
}

function stringTooLong(str, max){
  let reg = /[\u4e00-\u9fa5]/g,    //专业匹配中文
    slice = str.substring(0, max),
    chineseCharNum = (~~(slice.match(reg) && slice.match(reg).length)),
    realen = slice.length*2 - chineseCharNum;
  return str.substr(0, realen) + (realen < str.length ? "..." : "");
}

function messageTitleResize(str){
  let max = 10;
  if(window.screen.width < 400){
    max = 8;
  }
  else if(window.screen.width < 500){
    max = 10;
  }else if(window.screen.width < 1170){
    max = 13;
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
  messageTitleResize
}

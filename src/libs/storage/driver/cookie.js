import Memory from './memory'
export default class Cookie extends Memory {
  set(key, value, expire = 0) {
    if (expire > 0) {
      let date=new Date(); //获取当前时间
      date.setTime(date.getTime()+expire); //格式化为cookie识别的时间
      document.cookie=key + "=" + value +";expires="+date.toGMTString();  //设置cookie
    } else {
      document.cookie=key + "=" + value
    }
  }
  get(key, _default) {
    let getCookie = document.cookie.replace(/[ ]/g,"");  //获取cookie，并且将获得的cookie格式化，去掉空格字符
    let arrCookie = getCookie.split(";")  //将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
    let value = _default;  //声明变量tips
    for(let i=0;i<arrCookie.length;i++){   //使用for循环查找cookie中的tips变量
      let arr=arrCookie[i].split("=");   //将单条cookie用"等号"为标识，将单条cookie保存为arr数组
      if(key==arr[0]){  //匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
        value=arr[1];   //将cookie的值赋给变量tips
        break;   //终止for循环遍历
      }
    }

    return value
  }
  rm(key) {
    let date = new Date(); //获取当前时间
    date.setTime(date.getTime()-10000); //将date设置为过去的时间
    document.cookie = key + "=v; expires =" +date.toGMTString();//设置cookie 
  }
  clear () {
    super.clear()
    sessionStorage.clear()
  }
}

/**
 * 邮箱
 * @param {*} s
 */
export function isEmail(s) {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(
    s
  );
}

/**
 * 手机号码
 * @param {*} s
 */
export function isMobile(s) {
  return /^1(3|4|5|6|7|8|9)\d{9}$/.test(s);
}

/**
 * 电话号码
 * @param {*} s
 */
export function isPhone(s) {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s);
}

/**
 * URL地址
 * @param {*} s
 */
export function isURL(s) {
  return /^http[s]?:\/\/.*/.test(s);
}

/**
 * 身份证（第一代和的第二代）
 * @param s
 * @returns {boolean}
 */
export function isIdCard(s) {
  return (
    /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$/.test(
      s
    ) ||
    /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(
      s
    )
  );
}
//去除头尾空格
export function trim(x) {
  return x.replace(/^\s+|\s+$/gm, "");
}
 
export function bindOninput(e) {
  e.value = e.value.replace(" ", "");
}
 
//是否是空字符串
export function isBlank(str) {
  if (
    str == undefined ||
    typeof str == "undefined" ||
    str == null ||
    trim(str) == ""
  ) {
    return true;
  }
  return false;
}
 
//是否是空数组
export function isEmptyArray(array) {
  if (
    array == undefined ||
    typeof array == "undefined" ||
    array == null ||
    array == "" ||
    array.length == 0
  ) {
    return true;
  }
  return false;
}
 
//校验整数
export function validateNumber(value) {
  var reg = new RegExp("^[0-9]*$");
  if (!reg.test(value)) {
    return false;
  }
  return true;
}
 
//校验小数
export function validateDouble(value) {
  if (!validateNumber(value)) {
    var reg = new RegExp(
      "^(([0-9]+.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*.[0-9]+)|([0-9]*[1-9][0-9]*))$"
    );
    if (!reg.test(value)) {
      return false;
    }
  }
  return true;
}
/**
 * 表单转json
 * @param {*} formObj 表单对象
 * @returns 
 */
export function formToJson(formObj) {
  var serializeObj = {};
  var array = formObj.serializeArray();
  $(array).each(function () {
    if (serializeObj[this.name]) {
      if ($.isArray(serializeObj[this.name])) {
        serializeObj[this.name].push(this.value);
      } else {
        serializeObj[this.name] = [serializeObj[this.name], this.value];
      }
    } else {
      serializeObj[this.name] = this.value;
    }
  });
  return serializeObj;
}
 
/**
 * json对象转字符串形式
 */
export function json2String(o) {
  var arr = [];
  var fmt = function (s) {
    if (typeof s == "object" && s != null) return json2String(s);
    return /^(string|number)$/.test(typeof s) ? "'" + s + "'" : s;
  };
  for (var i in o) arr.push("'" + i + "':" + fmt(o[i]));
  return "{" + arr.join(",") + "}";
}
 
/**
 * json数组转化为 String对象的方法
 * 
 * @param jsonArray
 */
export function jsonArray2String(jsonArray) {
  var JsonArrayString = "[";
  for (var i = 0; i < jsonArray.length; i++) {
    JsonArrayString = JsonArrayString + json2String(jsonArray[i]) + ",";
  }
  JsonArrayString =
    JsonArrayString.substring(0, JsonArrayString.length - 1) + "]";
  return JsonArrayString;
}
 
/**
 * string对象转化为json对象
 * 
 * @param stringValue
 * @returns
 */
export function string2Json(stringValue) {
  eval("var theJsonValue = " + stringValue);
  return theJsonValue;
}
/**
 * 获取今天时间yyyyMMdd格式
 * @returns 
 */
export function getToday() {
  var myDate = new Date();
  return myDate.format("yyyyMMdd");
}
/**
 * 日期校验
 * @param {*} dateBegin 开始日期
 * @param {*} dateEnd 结束日期
 * @returns 
 */
export function checkDate(dateBegin, dateEnd) {
  if (dateBegin == null || dateBegin.length < 1) {
    alert("开始日期不能为空");
    return false;
  }
  if (dateEnd == null || dateEnd.length < 1) {
    alert("结束日期不能为空");
    return false;
  }
  if (dateBegin.localeCompare(dateEnd) > 0) {
    alert("开始日期不能大于结束日期");
    return false;
  }
  return true;
}
/**
 * 隐藏div
 * @param {*} ele 元素id或对象
 */
export function hide_div(ele) {
  if (document.getElementById(ele)) {
    document.getElementById(ele).hide();
  } else {
    ele.hide();
  }
}

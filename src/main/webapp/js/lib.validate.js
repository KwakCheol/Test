/*********************************************
* 파일명: lib.validate.js
* 기능: 유연한 자동 폼 검사
**********************************************/

/// 에러메시지 포멧 정의 ///
var NO_BLANK = "{name+을를} 입력하여 주십시오";
var NO_SELECT = "{name+을를} 선택하여주십시오";
var NOT_VALID = "{name+이가} 올바르지 않습니다";
var TOO_LONG = "{name}의 길이가 초과되었습니다 (최대 {maxbyte}바이트)";
var TOO_SHORT = "{name}의 길이가 부족합니다 (최소 {minbyte}바이트)";
 
/// 스트링 객체에 메소드 추가 ///
String.prototype.trim = function(str) { 
	str = this != window ? this : str; 
	return str.replace(/^\s+/g,'').replace(/\s+$/g,''); 
}

String.prototype.hasFinalConsonant = function(str) {
	str = this != window ? this : str; 
	var strTemp = str.substr(str.length-1);
	return ((strTemp.charCodeAt(0)-16)%28!=0);
}

function josa(str,tail) {
	return (str.hasFinalConsonant()) ? tail.substring(0,1) : tail.substring(1,2);
}

function validate(form) {
	var i=0;

	for (i = 0; i < form.elements.length; i++ ) {
		var el = form.elements[i];
		el.value = el.value.trim();

		if (el.getAttribute("REQUIRED") != null) {
			//select 구문 처리
			if(el.type.indexOf("select")>-1){
				if (el.selectedIndex==0 || el.value == "" || el.value == "0" || el.value == "00") {
					return doError(el,NO_SELECT,"");
				}
			}else{
				if (el.value == null || el.value == "") {
					return doError(el,NO_BLANK,"");
				}
			}
		}

		if (el.getAttribute("MAXBYTE") != null && el.value != "") {
			var len = 0;
			for(j=0; j<el.value.length; j++) {
				var str = el.value.charAt(j);
				len += (str.charCodeAt() > 128) ? 2 : 1
			}
			if (len > parseInt(el.getAttribute("MAXBYTE"))) {
				maxbyte = el.getAttribute("MAXBYTE");
				return doError(el,TOO_LONG,"","",maxbyte);
			}
		}
		if (el.getAttribute("MINBYTE") != null && el.value != "") {
			var len = 0;
			for(j=0; j<el.value.length; j++) {
				var str = el.value.charAt(j);
				len += (str.charCodeAt() > 128) ? 2 : 1
			}
			if (len < parseInt(el.getAttribute("MINBYTE"))) {
				minbyte = el.getAttribute("MINBYTE");
				return doError(el,TOO_SHORT,"","",minbyte);
			}
		}

		if (el.getAttribute("OPTION") != null && el.value != "") {
			if (!funcs[el.getAttribute("OPTION")](el)) return false;
		}
	}
	return true;
}

function doError(el,type,msg,action,byte) {
	var pattern = /{([a-zA-Z0-9_]+)\+?([가-힣]{2})?}/;
	var name = (hname = el.getAttribute("HNAME")) ? hname : el.getAttribute("NAME");
	pattern.exec(type);
	var tail = (RegExp.$2) ? josa(eval(RegExp.$1),RegExp.$2) : "";
	//alert(type.replace(pattern,eval(RegExp.$1) + tail).replace(pattern,byte));
	
	var objmsg = "";
	var msg =  (type.replace(pattern,msg).replace(pattern,byte));

	objmsg = "ErrMsg";
	ErrMsgOptin(objmsg,msg);

	if (action == "sel") {
		el.select();
	} else if (action == "del")	{
		el.value = "";
	}
	if (el.getAttribute("UNFOCUSED") == null) {
		if(el.type!="hidden"){
			el.focus();
		}
	}

	return false;
}

function ErrMsgOptin( argTran,sMsg ){

	this.window.focus();

	switch(argTran) {
		case "ErrMsg": // 
		  	//var sUrl= "";
			//sUrl="/html/msg_error.htm?SMsg="+sMsg;
			//window.showModalDialog(sUrl,"ErrMsg","dialogHeight:180px;dialogWidth:280px;center:yes;help:no;resizable:yes;staus:no;");
			alert(sMsg);
			break;
		 case "SuccessMsg": // 
		  	//var sUrl= "";
			//sUrl="/html/msg_success.htm?SMsg="+sMsg;
			//window.showModalDialog(sUrl,"ErrMsg","dialogHeight:180px;dialogWidth:280px;center:yes;help:no;resizable:yes;staus:no;");
			alert(sMsg);
			break;
		default:
			break;
	}
}

/// 특수 패턴 검사 함수 매핑 ///
var funcs = new Array();
funcs['email'] = isValidEmail;
funcs['phone'] = isValidPhone;
funcs['password'] = isValidPassword;
funcs['hangul'] = hasHangul;
funcs['number'] = isNumeric;
funcs['alphanumber'] = isAlphaNumeric;
funcs['account'] = isValidAccount;
funcs['engonly'] = alphaOnly;
funcs['hangulonly'] = hangulOnly;
funcs['jumin'] = isValidJumin;
funcs['date'] = isValidDate;

/// 패턴 검사 함수들 ///
function isValidEmail(el) {
	var pattern = /^[_a-zA-Z0-9-\.]+@[\.a-zA-Z0-9-]+\.[a-zA-Z]+$/;
	return (pattern.test(el.value)) ? true : doError(el,NOT_VALID,"이메일이");
}

function isValidPassword(el) {
	return true;

	/*
	var res1 = (/[a-z]/i).test(el.value); //영문이 있는지
	var res2 = (/[0-9]/).test(el.value); //숫자가 있는지
	var res3 = (/^[0-9a-z_]*$/i).test(el.value); //영문, 숫자, _ 이외엔 없는지

	if( res1 == true && res2 == true && res3 == true ){
		return true;
	}else{
		if( res1 == false ) return doError(el,"{name+은는} 4자이상 숫자만 입력할 수 없습니다","");
		if( res2 == false ) return doError(el,"{name+은는} 4자이상 영문만 입력할 수 없습니다","");
		if( res3 == false ) return doError(el,"{name+은는} 4자이상 숫자와 영문만 입력 가능합니다.","");
	}
	*/
}

function hasHangul(el) {
	var pattern = /[가-힣]/;
	return (pattern.test(el.value)) ? true : doError(el,"{name+은는} 반드시 한글을 포함해야 합니다","");
}
function hangulOnly(el) {
	var pattern = /^[가-힣]+$/;
	return (pattern.test(el.value)) ? true : doError(el,NOT_VALID,"");
}

function alphaOnly(el) {
	var pattern = /^[a-zA-Z]+$/;
	return (pattern.test(el.value)) ? true : doError(el,NOT_VALID,"");
}

function isAlphaNumeric(el) {
	var pattern = /^[a-zA-Z0-9]+$/;
	return (pattern.test(el.value)) ? true : doError(el,"{name+은는} 반드시 영문 및 숫자로만 입력해야 합니다","");
}

function isNumeric(el) {
	var pattern = /^[0-9]+$/;
	return (pattern.test(replaceAll(el.value,"-",""))) ? true : doError(el,"{name+은는} 반드시 숫자로만 입력해야 합니다","");
}

function isValidAccount(el) {
	var pattern = /^[0-9-]+$/;
	return (pattern.test(el.value)) ? true : doError(el,"{name+은는} 반드시 숫자, -로만 입력해야 합니다","");
}

function isValidJumin(el) {

    var pattern = /^([0-9]{6})-?([0-9]{7})$/;
	var num = el.value;
    if (!pattern.test(num)) return doError(el,NOT_VALID,"주민번호가");
    num = RegExp.$1 + RegExp.$2;

	var sum = 0;
	var last = num.charCodeAt(12) - 0x30;
	var bases = "234567892345";
	for (var i=0; i<12; i++) {
		if (isNaN(num.substring(i,i+1))) return doError(el,NOT_VALID,"주민번호가");
		sum += (num.charCodeAt(i) - 0x30) * (bases.charCodeAt(i) - 0x30);
	}
	var mod = sum % 11;

	return ((11 - mod) % 10 == last) ? true : doError(el,NOT_VALID,"주민번호가");
}

function isValidPhone(el) {
	var len = el.value.split("-");

	var pattern = /^([0]{1}[0-9]{1,2})-?([1-9]{1}[0-9]{2,3})-?([0-9]{4})$/;

	if( el.value.length == 4 ) // 내선번호일 경우
		pattern = /^([0-9]{4})$/;
	/*
	switch( len.length ){
		case 1:
		case 2:
			//pattern = /^([1-9]{1}[0-9]{2,3})-?([0-9]{4})$/;
			return true;
			break;
		case 3:
			break;
	}
	*/
	if (pattern.exec(el.value)) {
		if(RegExp.$1 == "010" || RegExp.$1 == "011" || RegExp.$1 == "016" || RegExp.$1 == "017" || RegExp.$1 == "018" || RegExp.$1 == "019") {
			el.value = RegExp.$1 + "-" + RegExp.$2 + "-" + RegExp.$3;
		}
		return true;
	} else {
		return doError(el,NOT_VALID,"전화번호가");
	}
}

function isValidDate(el) {
	var pattern = /([0-9]{4})-?([0-9]{2})-?([0-9]{2})/; 
	var oDateStr = el.value;
	if (!pattern.test(oDateStr)) return doError(el,NOT_VALID,"날짜가"); 
    oDateStr = RegExp.$1 + RegExp.$2 + RegExp.$3;

	var oDate = new Date(oDateStr.substr(0,4),oDateStr.substr(4,2)-1,oDateStr.substr(6,2));

	var oYearStr=oDate.getFullYear();

	var oMonthStr=(oDate.getMonth()+1).toString();
		
	oMonthStr = (oMonthStr.length ==1) ? ("0"+oMonthStr) : oMonthStr; 
	var oDayStr=oDate.getDate().toString();
	oDayStr = (oDayStr.length ==1) ? ("0"+oDayStr) : oDayStr; 

	return  (oDateStr == oYearStr+oMonthStr+oDayStr) ? true : doError(el,NOT_VALID,"날짜가"); 
}



// 숫자만 true
function isNumber(s) {
  s += ''; // 문자열로 변환
  s = s.replace(/^\s*|\s*$/g, ''); // 좌우 공백 제거
  if (s == '' || isNaN(s)) return false;
  return true;
}

// 숫자만 메세지
function isNumberMsg(s,m) {

	if(isNumber(s)==false){
		alert(m + " 는(은) 숫자만 가능합니다.");
	    return false;
	}else{
		return true;
	}
}


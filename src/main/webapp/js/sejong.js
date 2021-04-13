//****************************************//
//************** HTML OBJECT *************//
//****************************************//
// div Object 생성
function USR_getDivObj(name, isChecked) {
	var oDiv = document.createElement("div");
	oDiv.id = name;
	return oDiv;
}
// Check Box Object 생성
function USR_getChkBoxObj(name, isChecked) {
	var oCheck = document.createElement("input");
	oCheck.type = "checkbox";
	oCheck.name = name;
	oCheck.id = name;
	oCheck.defaultChecked = isChecked==null?false:(isChecked=='1'?true:false);
	return oCheck;
}
// radio button Object 생성
function USR_getChkRadioObj(name, isChecked) {
	var oCheck = document.createElement("input");
	oCheck.type = "radio";
	oCheck.name = name;
	oCheck.id = name;
	oCheck.defaultChecked = isChecked==null?false:(isChecked=='1'?true:false);
	return oCheck;
}
// HiddenText Object 생성
function USR_getHdnObj(hName, hValue) {
	var oHidden = document.createElement("input");
	oHidden.type = "hidden";
	oHidden.name = hName;
	oHidden.id = hName;
	oHidden.value = hValue;
	return oHidden;
}
// TextArea Object 생성
function USR_getTextAreaObj(hName, hValue) {
	var oHidden = document.createElement("textarea");
	oHidden.name = hName;
	oHidden.id = hName;
	oHidden.value = hValue;
	return oHidden;
}
// Text Object 생성
function USR_getTextBox(tName, tValue, tSize, tMaxLength) {
	var oText = document.createElement("input");
	oText.type = "text";
	oText.name = tName;
	oText.id = tName;
	oText.value = tValue;

	if( tSize != "" ){
		oText.size = tSize;
	}
	if( tMaxLength != "" ){
		oText.maxLength = tMaxLength;
	}
	return oText;
}
// Image Object 생성
function USR_getImageObj( src ) {
	var oImg = document.createElement('img');
	oImg.src = src;
	oImg.style.verticalAlign = "middle";
	oImg.border = "0";
	return oImg;
}

/**
 * 관계 콤보박스 Object 생성
 * data형태 : 
 * occDt = new Array()
 * occDt[0] = ["-1","전체"];
 * occDt[1] = ["01","하나"];
 */
function USR_getCreateComboObj(occDt, hName, item) {

	var oSel = document.createElement('select'); 

	oSel.name		= hName;
	oSel.id			= hName;

	for( var i=0; i<occDt.length; i++ ){
		oSel.options[i] = new Option(occDt[i][1], occDt[i][0]);
	}

	oSel.value = item;

	return oSel;
}
/**
 * 관계 콤보박스 Object 생성
 * data형태 : 
 * occDt = XML Array Data
 */
function USR_getComboObj(obj, occDt, args, item) { 

	if( args[0] == null || args[0] == "" || args[1] == null || args[1] == "" ){
		args[0] = "code";
		args[1] = "name";
	}

	var cnt = 0;
	for(var i=0;i<occDt.length;i++){	
		obj.options[cnt++] = new Option(occDt[i][ args[1] ], occDt[i][ args[0] ]);
	}
	obj.value = item; 

	return obj;
}
// 객체가 포함된 FORM 또는 BODY를 리턴
function getForm(obj) {

	if (obj == null)	return null;

	while (obj.tagName != null && obj.tagName != "FORM" && obj.tagName != "BODY"){
		obj = obj.parentNode;
	}
	return obj;
}

// 객체가 포함된 TR을 리턴
function getTr(obj) {

	if (obj == null)	return null;

	while (obj.tagName != "TR" && obj.tagName != "TABLE" && obj.tagName != "FORM" && obj.tagName != "BODY"){
		obj = obj.parentNode;
	}

	if (obj.tagName == "TR")	return obj;
	else						return null;
}

// 개체에서 id에 해당하는 TD를 리턴한다.
function getTdByTr(oTr, str) {

	if (oTr == null)	return null;
	if (oTr.tagName != "TR")	oTr = getTr(oTr);

	var item = null
	var td = null;
	for (var i=0; i<oTr.children.length; i++){
		item = oTr.children.item(i);
		if (item.id == str) {
			td = item;
			break;
		}
	}
	return td;
}
// item에서 속성(str)을 찾아서 값을 리턴 한다.
function getObjByName(item, str, gubun) {
	if (item == null) return null;
	if (gubun == null) gubun = "dhtml";

	var td = null;
	var el = null;

	while (item.tagName != "TR" && item.tagName != "TH" && item.tagName != "TD") {
		if ( item.children.length != 0)		item = item.children.item(0);
		else		break;
	}

	if (item.children.length != 0) {
		for (var i=0; i<item.children.length; i++){
			td = item.children.item(i);

			if(true){
				if(gubun=="htmlTag"){
					try {
						while (td.tagName != "SELECT" && td.tagName != "INPUT") {
							if (td.children.length != 0){
								td = getObjTD(td, str);
							}else{
								break;
							}
						}
						el = td;
					} catch (e) {
						el = null;
					}
				}
				if(gubun=="dhtml"){
					try {
						while (td.tagName != "SELECT" && td.tagName != "INPUT") {
							if (td.children.length != 0)		td = td.children.item(0);
							else		break;
						}
						if (td.getAttribute("NAME") != null && str.toUpperCase() == td.getAttribute("NAME").toUpperCase()) {
							el = td;
							break;
						}
					} catch (e) {
						el = null;
					}
				}
			}
		}
	}
	return el;
}
// TD 태그 존재시 해당 객체를 리턴한다.
function getObjTD(td, str){
	var el = null;
	for(var i=0; i<td.children.length; i++){
		var _tmp = td.children.item(i);
		if (_tmp.getAttribute("NAME") != null && str.toUpperCase() == _tmp.getAttribute("NAME").toUpperCase()) {
			el = _tmp;
			break;
		}
	}
	return el;
}

// 테이블 값을 초기화 합니다.
function clearTableInit( objName ) {

	// 동적으로 tr과 td를 생성할 테이블을 지정한다
	var oTable = document.getElementById(objName);
	// table의 두번째 차일드 즉 tbody를 지정한다.
	var oTbody = oTable.childNodes[1];
	// 테이블 초기화
	if(true) {
		while (oTbody != null && oTbody.rows != null && oTbody.rows.length > 0) {
			oTbody.deleteRow(0);
		}
	}
}

// 조회된 결과가 없을경우 세팅
function setResultNoData( oTbody, colSpan, msg ) {
	var oRow = null;
	var oCol = null;
	var oObj = null;

	oRow = document.createElement('tr');
	oCol = new Array();
	oCol[0] = document.createElement('td');
	oCol[0].colSpan = colSpan;
	oCol[0].innerText = msg;
	for(var j=0; j<oCol.length; j++) {
		oRow.appendChild(oCol[j]);
	} 
	oTbody.appendChild(oRow);
}


// -------------------------------------------------
// @ 문자를 대체한다.
// @ 사용법 : str-원문자열, baseStr-바꿀문자, repStr-대체할문자
// ---------------------------------------------------
function replaceAll(str, baseStr, repStr) {
    var index;
    while (str.search(baseStr) != -1) {
      str = str.replace(baseStr, repStr);
    }
    return str;
}
// -----------------------------------------------------
// @ 문자열을 구분자로 나눈다.
// @ 사용법 : originString- 원 문자열, delimeter - 구분자
// ----------------------------------------------------
function stringTokenizer(originString, delimeter)
{
	var result = new Array();
	var i = 0;
	while(true)
	{
		if(originString.indexOf(delimeter) < 0){
			result[i] = trim(originString);
			break;
		}else{
			result[i] = originString.substring(0,originString.indexOf(delimeter));
			originString = originString.substring(originString.indexOf(delimeter) + delimeter.length);
		}

		i++;
	}

	return result;
}
//----------------------------------------------------------------------------------
// @ 모달 다이얼로그 박스를 연다.
// @ 추가설명 : showModalDialog로 여는 창은 액션을 줄수 없다, 단지 view기능만을 수행한다.
//                     그래서, 응용함수 openDialogBox() 를 만들어 그 문제점을 보완한다.
//-----------------------------------------------------------------------------------
function openDialogBox(objmsg ,opt)
{
	if(opt == '')
	{
		var modalWidth = 584;
		var modalHeight = 600;
		var xPos = window.screenX/2 - modalWidth/2;
		var yPos = window.screenY/2 - modalHeight/2;
		
		opt = "dialogwidth:"+modalWidth+"px;dialogheight:"+modalHeight+"px;";
		opt += "dialogleft:"+xPos+"px;dialogtop:"+yPos+"px;center:yes;";
		opt += "help:no;scroll:no;resizable:no;status:no;titlebar:no;";
	}

	var result = showModalDialog("/html/dialog.html",objmsg,opt);

	return result;
}
//----------------------------------------------------------------------------------
// @ 모달 메시지 박스를 연다.
// @ 추가설명 : openModelessDialogBox 여는 창은 액션을 줄수 없다, 단지 view기능만을 수행한다.
//                     그래서, 응용함수 openDialogBox() 를 만들어 그 문제점을 보완한다.
//-----------------------------------------------------------------------------------
function openModelessDialogBox(objmsg,opt)
{
	if(opt == '')
	{
		var modalWidth = 584;
		var modalHeight = 600;
		var xPos = window.screenX/2 - modalWidth/2;
		var yPos = window.screenY/2 - modalHeight/2;
		
		opt = "dialogwidth:"+modalWidth+"px;dialogheight:"+modalHeight+"px;";
		opt += "dialogleft:"+xPos+"px;dialogtop:"+yPos+"px;center:yes;";
		opt += "help:no;scroll:no;resizable:1;status:no;titlebar:no;";
	}

	var result = showModelessDialog("/html/dialog.html",objmsg,opt);

	return result;
}
//----------------------------------------------------------------------------------
// @ 쿠키를 세팅하는 함수입니다.
// @ 추가설명 : setCookie( 쿠키명, 값, 설정일 )
//-----------------------------------------------------------------------------------
function setCookie( name, value, expires )
{
	document.cookie = name + "=" + escape (value) + "; path=/; expires=" + expires.toGMTString();
}
//----------------------------------------------------------------------------------
// @ 쿠키에 설정된 값을 가져오는 함수입니다.
// @ 추가설명 : getCookie( 쿠키명 )
//-----------------------------------------------------------------------------------=
function getCookie( Name ){
    var search = Name + "="
	if (document.cookie.length > 0) { // DmE00! <3A$5G>n @V4Y8i
		offset = document.cookie.indexOf(search)
		if (offset != -1) { // DmE00! A8@gGO8i
		offset += search.length
		// set index of beginning of value
		end = document.cookie.indexOf(";", offset)
		// DmE0 0*@G 86Av87 @'D! @N5&=: 9xH# <3A$
		if (end == -1)
			end = document.cookie.length
		return unescape(document.cookie.substring(offset, end))
		}
	}
	return "";
} 
// ----------------------------------------
// @ 모든 폼의 모든 엘리멘트를 초기화 한다.(clear 시킴)
function allFormElementsClear(docs)
{
	var len=docs.forms.length;
	for(var i=0;i<len;i++)
	{
		formElementsCleared(docs.forms[i])
	}
}
// ----------------------------------------
// @ 특정 폼의 모든 엘리멘트를 초기화 한다.
// ----------------------------------------
function formElementsCleared(frm)
{
	var len=frm.elements.length;
	var type;
	for(var i=0;i<len;i++)
	{
		type = frm.elements[i].type.toLowerCase();
		if(type=='text' || type=='hidden' || type=='textarea' || type=='password')
		{
			frm.elements[i].value = "";
		}
		else if(type=='radio')
		{
			frm.elements[0].checked = true;
		}
		else if(type=='checkbox')
		{
			frm.elements[0].checked = true;
		}
		else if(type.substring(0,7) == 'select-')
		{
			frm.elements[i].options[0].selected = true;
		}
	}
}

// ----------------------------------------
// @ 모든 폼의 엘리먼트를 못 쓰게 한다.(disable 시킴)
// ----------------------------------------
function allFormElementsDisabled(docs)
{
	var len=docs.forms.length;
	for(var i=0;i<len;i++)
	{
		formElementsDisabled(docs.forms[i])
	}
}

// ----------------------------------------
// @ 특정 폼의 모든 엘리멘트를 못 쓰게 한다.
// ----------------------------------------
function formElementsDisabled(frm)
{
	var len=frm.elements.length;
	var type;
	for(var i=0;i<len;i++)
	{
		type = frm.elements[i].type.toLowerCase();
		if(type=='text' || type=='hidden' || type=='textarea' || type=='password')
		{
			frm.elements[i].style.border="0";
			frm.elements[i].style.background="#EFEFEF";
			frm.elements[i].style.color="#000000";
		}

		frm.elements[i].disabled = true;
	}
}

// ----------------------------------------
// @ 모든 폼의 엘리먼트를 다시 쓰게 한다.(enable 시킴)
// ----------------------------------------
function allFormElementsEnabled(docs)
{
	var len=docs.forms.length;
	for(var i=0;i<len;i++)
	{
		formElementsDisabled(docs.forms[i])
	}
}
// ----------------------------------------
// @ 특정 폼의 모든 엘리멘트를 다시 쓰게 한다.
// ----------------------------------------
function formElementsEnabled(frm)
{
	var len=frm.elements.length;
	var type;
	for(var i=0;i<len;i++)
	{
		type = frm.elements[i].type.toLowerCase();
		if(type=='text' || type=='hidden' || type=='textarea' || type=='password')
		{
			frm.elements[i].style.border="0";
			frm.elements[i].style.background="#FFFFFF";
			frm.elements[i].style.color="#000000";
		}

		frm.elements[i].disabled = false;
	}
}

// ----------------------------------------
// @ 시작날과 끝날의 차이가 interval 일이내인지 확인한다.
// ----------------------------------------
function checkDateInterval(startDt, endDt, interval){

	if(!this.isValidDate(startDt)){
		this.ErrMsgOptin("ErrMsg","날짜포맷에 맞지 않습니다.");
		return false;
	}
	if(!this.isValidDate(endDt)){
		this.ErrMsgOptin("ErrMsg","날짜포맷에 맞지 않습니다.");
		return false;
	}

	var sDate = new Date(startDt.value.split('-')[0], startDt.value.split('-')[1]-1,  startDt.value.split('-')[2]);
	var eDate = new Date(endDt.value.split('-')[0], endDt.value.split('-')[1]-1,  endDt.value.split('-')[2]);

	var newdate = (eDate-sDate)/(24*60*60*1000);
	if(eval(newdate) > (eval(interval)) || newdate < 0){
		return false;
	}else{
		return true;
	}
}

// ----------------------------------------
// @ 셀렉트 옵션 초기화
// ----------------------------------------
function setSelectInit(obj) {
	if (obj != null && obj.options != null && obj.options.length != null) {
		for( var kk = obj.options.length-1; kk>=0; kk--) {
			obj.options[kk] = null;
		}
	}
	return null;
}

// ----------------------------------------
// @ 상태바 설정
// ----------------------------------------
function setProgress(obj,mode) {
	if(obj==null) obj="SLB_film";

	var obj = document.getElementById(obj);

	if(mode){
		obj.style.filter = "Alpha(opacity=20)";
		SLB_show("/html/progress.htm","iframe","300","70");
		//SLB_show("/html/blank.htm","iframe","0","0");
	}else{
		SLB_show();
	}
	obj.style.display = (mode==true?"inline":"none");
}

// ----------------------------------------
// @ 체크된 라디오 버튼의 값을 가져온다.
// ----------------------------------------
function getRadioButtonValue( obj ){
	
	var _ret = "";

	if( obj.length == null || obj.length == "undifined" ){
		_ret = obj.value;
	}else{

		for(var i=0; i<obj.length; i++){
			if( obj[i].checked ){
				_ret = obj[i].value;
				break;
			}
		}
	}

	return _ret;
}

// ----------------------------------------
// @ 라이오 버튼에 해당 값으로 체크한다.
// ----------------------------------------
function setRadioButtonValue( obj, arg1 ){
    
	if( obj.length == null || obj.length == "undifined" ){
		obj.checked = false;

		if( obj.value == arg1 ) obj.checked = true;
	}else{
		for(var i=0; i<obj.length; i++){
			obj[i].checked = false;

			if( obj[i].value == arg1 ) obj[i].checked = true;
		}
	}
}

// ----------------------------------------
// @ 체크된 CHECK 버튼의 값을 가져온다.
// ----------------------------------------
function getCheckButtonValue( obj ){
	
	var _ret = "";

	if( obj.length == null || obj.length == "undifined" ){
		if( obj.checked )
			_ret = obj.value;
	}else{

		for(var i=0; i<obj.length; i++){
			if( obj[i].checked ){
				_ret = obj[i].value;
				break;
			}
		}
	}

	return _ret;
}

// ----------------------------------------
// @ CHECK 버튼에 해당 값으로 체크한다.
// ----------------------------------------
function setCheckButtonValue( obj, arg1 ){
    
	if( obj.length == null || obj.length == "undifined" ){
		obj.checked = false;
		if( obj.value == arg1 ) obj.checked = true;
	}else{
		for(var i=0; i<obj.length; i++){
			obj[i].checked = false;
			if( obj[i].value == arg1 ) obj[i].checked = true;
		}
	}
}

// ----------------------------------------
// @ 셀렉트박스에 해당 값으로 체크한다.
// ----------------------------------------
function setSelectBoxValue( obj, arg1 ){
	if(arg1 == null || arg1 == "") arg1 = "-1";

	for(var i=0; i<obj.length; i++){
		if(obj.options[i].value == arg1 ){
			obj.options[i].selected = true;
			break;
		}
	}
}

// ----------------------------------------
// @ 익스플러러 버전정보를 가져온다.
// ----------------------------------------
function getIEVersion(){
	var appVersion = 0.0;

	if(/MSIE/.test(navigator.userAgent)) {
		var tmp1 = navigator.appVersion;
		var tmp2 = tmp1.substr(tmp1.indexOf("MSIE ")+5,tmp1.length);
		appVersion = tmp2.split(";")[0];
	}
	
	return appVersion;
}

// -----------------------------
// @ 바이트계산한 값을 가져온다.
// -----------------------------
function getMsgByte( msg )
{
	var nbytes = 0;

	for (var z=0; z<msg.length; z++) {
		var ch = msg.charAt(z);

		if(escape(ch).length > 4) {
			nbytes += 2;
		} else if (ch == '\n') {
			if (msg.charAt(z-1) != '\r') {
				nbytes += 1;
			}else{
				nbytes += 1;
			}
		} else if (ch == '<' || ch == '>') {
			nbytes += 4;
		} else {
			nbytes += 1;
		}
	}

	return nbytes;
}


// --------------------------------
// @ 바이트 범위내에 값을 가져온다.
// --------------------------------
function getByteSubstring( msg,si,ei )
{
	var nbytes = 0;
	var str ="";

	for (var z=0; z<msg.length; z++) {
		var ch = msg.charAt(z);
        
		if(escape(ch).length > 4) {
			nbytes += 2;
		} else if (ch == '\n') {
			if (msg.charAt(z-1) != '\r') {
				nbytes += 1;
			}else{
				nbytes += 1;
			}
		} else if (ch == '<' || ch == '>') {
			nbytes += 4;
		} else {
			nbytes += 1;
		}
		if(nbytes>=si && nbytes<=ei){
		str+=ch;
		}
	}
    str = replaceAll(str," ","");
	return str;
}

// ----------------------------------------
// @ 바이트계산한 값을 가져온다.
// ----------------------------------------
function isAvailableBytes( msg , nbytes )
{
	return (getMsgByte(msg) > nbytes) ? false : true;
}

//--------------------
// 내용입력시 바이트 수 표시하기
//--------------------
function viewByte( obj, objMsg, size ){ 

	var _byteCnt = getMsgByte( obj.value );

	objMsg.innerText = "("+ _byteCnt + "byte)";

	if( _byteCnt > size ){
		objMsg.style.color = "#FF0000";
	}else{
		objMsg.style.color = "#000000"; 
	}
}

// ----------------------------------------
// @ str의 좌측에 특정한 문자로 채우는 함수
// ----------------------------------------
function padLeft( src, ch, length )
{
try {
	var padStr = "";
	
	if(length == src.length){	
		return src;
	}else if(length < src.length){
		return src.substring(0, 2);
	}
	
	for(var i = 0 ; i < eval(length) - src.length ; i++ ){
		padStr = ch + padStr;
	}
	} catch (e) {
	alert(e);
	}
	//return (padStr + src);
}

// ----------------------------------------
// @ str의 좌측에 특정한 문자로 채우는 함수
// ----------------------------------------
function padRight( src, ch, length )
{
	var padStr = "";
	if(length <= src.length){
		return src;
	}
	for(var i = 0 ; i < eval(length) - src.length ; i++ ){
		padStr = ch + padStr;
	}
	return (src + padStr);
}

// ----------------------------------------------------
// @ 체크된 라디오 버튼의 인덱스를 가져온다. 
// ----------------------------------------------------
function getRadioButtonIndex( obj ){
	
	var _ret = "";

	if( obj.length == null || obj.length == "undifined" ){
		_ret = obj.value;
	}else{

		for(var i=0; i<obj.length; i++){
			if( obj[i].checked ){
				_ret = i;
				break;
			}
		}
	}
	return _ret;
}

/*===============================
  주민번호에 '-' 추가 시킨다
  @param JuminNo
  @return '-' 추가된 주민번호
===============================*/
function setJuminNo(JuminNo){
	
	if( JuminNo == null || JuminNo.length == null){
		return "";
	}

	var JuminNo2 = getOnlyNumber(JuminNo);

	if(JuminNo2.length == 13){
		JuminNo = JuminNo2.substring(0, 6) + "-" + JuminNo2.substring(6);
	}

	return JuminNo;
}

/*===============================
  사업자번호에 '-' 추가 시킨다
  @param BuzNo
  @return '-' 추가된 주민번호
===============================*/
function setBuzNo(BuzNo){
	
	if( BuzNo == null || BuzNo.length == null){
		return "";
	}

	var BuzNo = getOnlyNumber(BuzNo);

	if(BuzNo.length == 10){
		BuzNo = BuzNo.substring(0, 3) + "-" + BuzNo.substring(3, 5) +"-"+ BuzNo.substring(5);
	}

	return BuzNo;
}

//=============================================
// 주어진 초를 "시간:분:초"로 변환하여 리턴
// @param Second
// @return
//=============================================
function toHMS(hms){

	if( hms == null || hms.length == null){
		return hms;
	}

	var Second = eval(hms);

	var strHr  = "" + parseInt(Second / 360);
	var strMin = "" + parseInt(Second / 60);
	var strSec = "" + parseInt(Second % 60);

	return padLeft(strHr, "0", 2) + ":" + padLeft(strMin, "0", 2) + ":" + padLeft(strSec, "0", 2);
}


//====================================================
// 시분초 '000000' 6자리를 받아 원하는 값만 돌려 준다.
//====================================================
function getTimeFormat(vlu,hms){

	if( vlu.length != 6 ){
		return vlu;
	}

	if (hms=="hh"){
        return vlu.substring(0,2);
	}else if(hms=="mm"){
		return vlu.substring(2,4);
	}else if(hms=="ss"){
		return vlu.substring(4,6);
	}else{
		return vlu;
	}

}

//-----------
// @ date
//-----------
function currDate(){
	var now = new Date(); 
	var mm = now.getMonth() + 1; 
	var dd = now.getDate(); 


	return now.getYear() + ((mm < 10) ? "0" : "") + mm + ((dd < 10) ? "0" : "") + dd; 
	//return now.getYear() + padLeft(mm, "0", 3) + padLeft(dd, "0", 3);
}

//-----------
//@ time
//-----------
function toTime()
{
	var now = new Date(); 
	var hh = now.getHours(); 
	var mi = now.getMinutes();
	var se = now.getSeconds();

	return ((hh < 10) ? "0" : "") + hh + ((mi < 10) ? "0" : "") + mi + ((se < 10) ? "0" : "") + se; 
	//return padLeft(hh, "0", 3) + padLeft(mi, "0", 3) + padLeft(se, "0", 3);
}

//=======================================================================================================
// @ 파라미터 형태로 되돌린다(시간은 선택에 여지없이 ':'로 한다) getDateCharacterFormat(vlu,chr) 정용진 
// 예)getDateCharacterFormat('20071120','/')
//    return '2007/11/20';
//=======================================================================================================
function getDateCharacterFormat(vlu,chr){

	if(chr == null || chr == ""){
		chr = "-"
	}

	if(vlu.length == null || vlu.length == 0 || vlu.length < 6){
		return vlu;
	}else if(vlu.length == 6 ){
		return vlu.substring(0,2) + chr + vlu.substring(2,4) + chr + vlu.substring(4,6);
	}else if(vlu.length == 8 ){
		return vlu.substring(0,4) + chr + vlu.substring(4,6) + chr + vlu.substring(6,8);
    }else if(vlu.length == 10 ){
		return vlu.substring(0,4) + chr + vlu.substring(4,6) + chr + vlu.substring(6,8) + " " + vlu.substring(8,10);
	}else if(vlu.length == 12 ){
		return vlu.substring(0,4) + chr + vlu.substring(4,6) + chr + vlu.substring(6,8) + " " + vlu.substring(8,10) + ":" + vlu.substring(10,12);
	}else if(vlu.length == 14 ){
		return vlu.substring(0,4) + chr + vlu.substring(4,6) + chr + vlu.substring(6,8) + " " + vlu.substring(8,10) + ":" + vlu.substring(10,12) + ":" + vlu.substring(12,14);
	}else{
		return vlu;
	}
}

//=================
// 숫자만 걸러 내기
//=================
function getOnlyNumber(vlu){

	var str="";
	for (var i=0; i< vlu.length; i++) { 
		ch = vlu.charAt(i); 
		if ("0" <= ch && ch <= "9"){
			str+=ch;
		}
	} 
	return str;
}

//=================
// 실수만 걸러 내기
//=================
function getOnlyRealNumber(vlu){

	var str="";
	for (var i=0; i< vlu.length; i++) { 
		ch = vlu.charAt(i); 
		if (("0" <= ch && ch <= "9") || ch == "."){
			str+=ch;
		}
	} 
	return str;
}

//===================================================================
// 금액 형식으로 변경 함수, 콤마(컴마) 붙임
//===================================================================
function makeComma( strData ){
	if( strData == "undefined" || strData == null || strData == "" ) return "0";
    
	var retValue = "";
	strData = strData + "";
	try{
		var si = strData.indexOf("-");	// 마이너스값처리
		
		var data = strData.replace( /[^0-9]/ ,"");

		if( data.length <= 3 ) return data;

		var len = data.length;

		for( var i = 0; i < len; i++ ) 
		{
			if( i != 0 && ( i % 3 == len % 3) ) 
				retValue += ",";

			if( i < data.length )
				retValue += data.charAt(i);
		}
		if(si!=-1){retValue="-"+retValue;}
	}catch( e ){}

	return retValue;
}

//===================================================================
// 전화번호 형식으로 변경 함수
//===================================================================
function makeTelNumber(str){
	if(str == null || str == ""){ return str; }

	str = getOnlyNumber(str);

	var len = str.length;
	var returnVal = "";
	var lastNumber = "";

	if( str.length <= 2 ){
		return returnVal;
	}else{
		if( str.indexOf("02") == 0 ){
			returnVal += str.substr(0,2) + '-';
			lastNumber = str.substr(2, str.length);
		}else if(str.indexOf("0") == 0 ){
			returnVal = str.substr(0,3) + '-';
			lastNumber = str.substr(3, str.length);
		}else{
			lastNumber = str;
		}

		switch(lastNumber.length){
			case 7 : 
				returnVal += (lastNumber.substr(0,3)+'-'+lastNumber.substr(3,7));
				break;
			case 8 : 
				returnVal += (lastNumber.substr(0,4)+'-'+lastNumber.substr(4,8));
				break;
			default : 
				returnVal += lastNumber;
				returnVal = getOnlyNumber(returnVal);
				break;
		}
	}

	return returnVal;
}

// 전화 시작/종료/후처리 시간을 리턴한다
// 콜에서 사용
function CallDate()
{
	return currDate() + toTime(); 
}

//===================================================================
// 셀렉트박스 동적으로 그리기
//===================================================================
function makeOptions(obj, arrResultData, selectedVal, optionName, optionValue){

	//기존 options를 삭제한다.
	setSelectInit(obj);

	var cnt = 0;

	if(optionName != null || optionValue != null){
		//전체 항목을 셋팅한다.
		obj.options[0] = new Option(optionName, optionValue);

		var cnt = 1;
	}

	if( arrResultData.length > 0 ){
		for(var i=0;i<arrResultData.length;i++){	
			var name = arrResultData[i]["name"];
			var code = arrResultData[i]["code"];
			
			obj.options[cnt++] = new Option(name, code);

			if(selectedVal != '' && code == selectedVal){
				obj.options[cnt-1].selected = true;
			}
		}
	}
}

//첫컬럼은 임의로 세팅된 셀렉트박스
function makeOptions2(obj, arrResultData, selectedVal,firstVal, firstNm){

	//기존 options를 삭제한다.
	setSelectInit(obj);

	//전체 항목을 셋팅한다.
	obj.options[0] = new Option(firstNm, firstVal);

	var cnt = 1;
	if( arrResultData.length > 0 ){
		for(var i=0;i<arrResultData.length;i++){	
			var nm = arrResultData[i]["name"];
			var cd = arrResultData[i]["code"];
			
			obj.options[cnt++] = new Option(nm, cd);

			if(selectedVal != '' && cd == selectedVal){
				obj.options[cnt-1].selected = true;
			}
		}
	}
}
//===================================================================
// 체크박스 클릭시 모든 항목체크/해제
//===================================================================
function checkAll(chbox, tableId){

	var oTbody = document.getElementById(tableId).childNodes[1];

	if(oTbody == null || oTbody.rows == null || oTbody.rows.length == 0){
		return;
	}

	for(var i = 0 ; i < oTbody.rows.length ; i++){
		if(oTbody.rows[i].childNodes[0].childNodes[0].checked != null){
			oTbody.rows[i].childNodes[0].childNodes[0].checked = chbox.checked;
		}
	}
}

function fnChkSelAll(obj)
{
	if(isundefined(obj)==""){ //선택할 오브젝트가 없음
		
	}
	else{
		if(obj.length>0){
			//체크박스 오브젝트가 2개이상
			for(var i=0; i<obj.length; i++)
			{
				if(obj[i].checked==true) obj[i].checked=false;
				else obj[i].checked=true;
			}
		}
		else{
			//체크박스 오브젝트가 1개일때
			if(obj.checked==true) obj.checked=false;
			else obj.checked=true;
		}
	}
}

//===================================================================
// JAVA에서 URLDecoder.decode() 로 받을수 있게 인코딩하기
//===================================================================
function encodeURL(str){
     var s0, i, s, u;
     s0 = "";
     for (var i = 0; i < str.length; i++){
         s = str.charAt(i);
         u = str.charCodeAt(i);
         if (s == " "){s0 += "+";}
         else {
             if ( u == 0x2a || u == 0x2d || u == 0x2e || u == 0x5f || ((u >= 0x30) && (u <= 0x39)) || ((u >= 0x41) && (u <= 0x5a)) || ((u >= 0x61) && (u <= 0x7a))){
                 s0 = s0 + s;
             }else {
                 if ((u >= 0x0) && (u <= 0x7f)){
                     s = "0"+u.toString(16);
                     s0 += "%"+ s.substr(s.length-2);
                 } else if (u > 0x1fffff){
                     s0 += "%" + (oxf0 + ((u & 0x1c0000) >> 18)).toString(16);
                     s0 += "%" + (0x80 + ((u & 0x3f000) >> 12)).toString(16);
                     s0 += "%" + (0x80 + ((u & 0xfc0) >> 6)).toString(16);
                     s0 += "%" + (0x80 + (u & 0x3f)).toString(16);
                 } else if (u > 0x7ff){
                     s0 += "%" + (0xe0 + ((u & 0xf000) >> 12)).toString(16);
                     s0 += "%" + (0x80 + ((u & 0xfc0) >> 6)).toString(16);
                     s0 += "%" + (0x80 + (u & 0x3f)).toString(16);
                 } else {
                     s0 += "%" + (0xc0 + ((u & 0x7c0) >> 6)).toString(16);
                     s0 += "%" + (0x80 + (u & 0x3f)).toString(16);
                 }
             }
         }
     }
     return s0;
 }

//===================================================================
// JAVA에서 URLEncoder.encode() 로 인코딩된 Str 디코딩하기
//===================================================================
function decodeURL(str){
	var s0, i, j, s, ss, u, n, f;
	s0 = "";

	for (var i = 0; i < str.length; i++){
		s = str.charAt(i);
		if (s == "+"){
			s0 += " ";
		}else {
			if (s != "%"){
				s0 += s;
			}else{
				u = 0;
				f = 1;
				while (true) {
					ss = "";
					for (var j = 0; j < 2; j++ ) {
						sss = str.charAt(++i);
						if (((sss >= "0") && (sss <= "9")) || ((sss >= "a") && (sss <= "f"))  || ((sss >= "A") && (sss <= "F"))) {
							ss += sss;
						} else {
							--i;
							break;
						}
					}
					n = parseInt(ss, 16);
					if (n <= 0x7f){u = n; f = 1;}
					if ((n >= 0xc0) && (n <= 0xdf)){u = n & 0x1f; f = 2;}
					if ((n >= 0xe0) && (n <= 0xef)){u = n & 0x0f; f = 3;}
					if ((n >= 0xf0) && (n <= 0xf7)){u = n & 0x07; f = 4;}
					if ((n >= 0x80) && (n <= 0xbf)){u = (u << 6) + (n & 0x3f); --f;}
					if (f <= 1){break;}
					if (str.charAt(i + 1) == "%"){ i++ ;}
					else {break;}
				}
				s0 += String.fromCharCode(u);
			}
		}
	}
	return s0;
} 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 창의 위치를 가운데 조정한 팝업
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Center_Popup(url,title,w,h) {
/*
	var feature = "width="+s_width+",height="+s_height+",scrollbars=1";
	var wd_pop = window.open(theURL,winName,feature);
	//'top=10,left=10,width=684, height=690, toolbar=0, directories=0, status=0, menubar=0, scrollbars=1, resizable=0'

	var version = navigator.appVersion;
	var addHeight = 0;
	//if(version.indexOf("MSIE 7.0") > -1) addHeight=50;

	//wd_pop.blur();
	//wd_pop.resizeTo(s_width, s_height+addHeight);	
	//wd_pop.moveTo(((screen.availwidth - eval(s_width))/2),((screen.availheight - eval(s_height))/2));
	//wd_pop.focus();
	return wd_pop;
*/	
	
    // Fixes dual-screen position                         Most browsers      Firefox
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;
    var newWindow = window.open(url, title, 'scrollbars=yes, resizable=0, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

    // Puts focus on the newWindow
    if (window.focus) {
        newWindow.focus();
    }
}

function OpenWindowCenter() {
}
OpenWindowCenter.normal = function(width, height, url, name, feature, openWindow) {
	/** ************* 작은글꼴 기준 ************** */
	/** 보정 높이 */
	var correctHeight = 26;
	/** MenuBar의 높이 */
	var menubarHeight = 24;
	/** ToolBar의 높이 */
	var toolbarHeight = 26;
	/** 주소표시줄 높이 */
	var locationHeight = 29;
	/** ScrollBar의 폭 */
	var scrollbarWidth = 12;
	/** ************* 작은글꼴 기준 ************** */
	if (height > 700) {
		height = 700;
	}
	centerX = (screen.availWidth / 2) - (width + scrollbarWidth) / 2;
	centerY = (screen.availHeight / 2) - (height / 2);
	rightX = screen.availWidth - width;
	bottomY = screen.availHeight - (height + toolbarHeight + correctHeight);

	var left = centerX;
	var top = centerY;

	var name = (name) ? name : 'omgPopup';
	var feature = (feature ? feature : 'menubar=no,toolbar=no,location=no,scrollbars=yes,resizable=yes') + ',width=' + width
			+ 'px,height=' + height + 'px,left=' + left + 'px,top=' + top + 'px';
	(openWindow) ? openWindow.open(url, name, feature) : self.open(url, name, feature);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// undefined 일경우 ""를 리턴한다.
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function isundefined(val)
{
	if(val=="undefined" || val==undefined || val==null) return "";
	else return val;
}


/*
 * 현제 년월일보다 크면 true
 */
function istodate(val)
{
	var today = new Date();
    var month = (today.getMonth()+101)+"";
	var day = (today.getDate()+100)+"";
    
	var dt = replaceAll(val,"-","");
//alert(dt);
	if(dt.length == 4){
		if(dt > today.getYear()) return true;		
	}else if(dt.length == 6){
		if(dt > (today.getYear()+""+month.substring(1,3))) return true;	
	}else if(dt.length == 8){
		if(dt > (today.getYear()+""+month.substring(1,3)+""+day.substring(1,3))) return true;	
	}
	
return false;
}


/**
 * json문법의 string을 json배열로 리턴한다.
 * @param {Object} str
 */
function fnStrToJson(str)
{
	var vStr = "";
	var sArr = new Array();
	var retArr = new Array();
	if(isundefined(str)!=""){
		vStr = replaceAll(str, "},{", "}##{");
		vStr = replaceAll(str, "}, {", "}##{");
		vStr = replaceAll(vStr, "\n", "   "); //엔터기호를 스페이스바로 변경
		//console.log(vStr);
		sArr = vStr.split("##");
		//sArr.sort();
		for(var i=0; i<sArr.length; i++)
		{
			retArr.push(eval("("+sArr[i]+")"));
		}
		//retArr.sort();
	}
	return retArr;
}


/**
 * json 배열을 json형식의 String으로 리턴한다.
 * @param {Object} jsonArr
 */
function fnJsonToStr(jsonArr)
{
	var vStr = "";
	var tStr = ""; //json배열 삭제해서 들어왔을경우를 대비한 플래그
	
	if(jsonArr.length>0){
		for(var i=0; i<jsonArr.length; i++){
			vStr += "{";
			tStr = ""
			for (var j in jsonArr[i]) {
				//console.log(j+"="+gGroupArr[i][j]);
				vStr += j+":'"+jsonArr[i][j]+"',";
				tStr = j;
			}
			vStr = vStr.substr(0,vStr.length-1);
			if(tStr!="") vStr += "},";
		}
		vStr = vStr.substr(0,vStr.length-1);
	}
	//console.log(vStr);
	return vStr;
}

/**
 * 1에서 입력받은 숫자중 랜덤으로 하나를 리턴한다. by boram 2011.02.11
 * ex) getRandNumber(100) --> 1~100중 랜덤한 숫자1개 리턴
 * @param {Object} max
 */
function getRandNumber(max)
{
	var t = Math.floor(Math.random()*max)+1;

	return t;
}

/**
 * 1에서 입력받은 숫자중 랜덤으로 하나를 리턴하는데
 * arr에서 입력받은 숫자어레이들과는 중복리턴하지 않는다.
 * @param {Object} max - 숫자
 * @param {Object} arr - 배열
 */
function getRandNumberDuple(max, arr)
{
	var duple = false;
	var retV = getRandNumber(max);
	//console.log(retV+"---"+arr.join());
	for(var i=0; i<arr.length;i++)
	{
		if(retV==arr[i]){
			duple = true;
		}
	}
	if(duple) return getRandNumberDuple(max, arr);
	else {
		//console.log("rand num="+retV);
		return retV;
	}
}

/*유튜브id 추출*/
function getYoutubeId(url)
{
	var retVal = url;
	var vloc = url.indexOf("v=");
	if(vloc>0){
		retVal = url.substr(vloc);
	}

	retVal = replaceAll(retVal, "www.","");
	retVal = replaceAll(retVal, "youtu.be","");
	retVal = replaceAll(retVal, "youtube.com","");
	retVal = replaceAll(retVal, "http://","");
	retVal = replaceAll(retVal, "/","");
	retVal = replaceAll(retVal, "watch?","");
	retVal = replaceAll(retVal, "v=","");
	retVal = retVal.replace("?", "&");

	var retArr = retVal.split("&");

	return retArr[0];
}

// 트위터로 보내기
function sendTwitter(msg, url){
   var href = "http://twitter.com/home?status=" + encodeURIComponent(msg) + " " + encodeURIComponent(url);
   var a = window.open(href, 'twitter', '');
    
   if( a ){
      a.focus();
   }
}

// 페이스북으로 링크 공유하기
function sendFaceBook(msg, url){
   var href = "http://www.facebook.com/sharer.php?u=" + encodeURIComponent(url) + "&t=" + encodeURIComponent(msg);
	//var href ="http://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fyobine.tistory.com%2F225&t=%EA%B0%81+SNS+%EA%B3%B5%EC%9C%A0+%EB%B2%84%ED%8A%BC+URL+http%3A%2F%2Fyobine.tistory.com%2F225";
   var a = window.open(href, 'facebook', '');
    
   if( a ){
      a.focus();
   }
}

// 미투데이 링크 공유하기
function sendMe2Day(msg, url){
   var href = "http://me2day.net/posts/new?new_post[body]='" + encodeURIComponent(msg)+"' : "+ url+"&new_post[tags]="+encodeURIComponent("러브온에어");
   var a = window.open(href, 'me2day', '');
    
   if( a ){
      a.focus();
   }
}

//확장자체크(이미지,동영상파일)
function checkFileExt(val)
{
	var retVal = true;
	var includeExt = "jpg,gif,png,bmp,avi,mp4,flv";
	var fileLength = val.length;
	var fileExt = val.substring(val.length-3,val.length);
	if(includeExt.indexOf(fileExt.toLowerCase()) < 0){
		//alert("확장자가 "+includeExt+"인 파일만 등록 가능합니다.");
		alert("Image files of the extension("+includeExt+") can be registered.");
		retVal = false;
	}
	return retVal;
}

//확장자체크(이미지,동영상파일) - 한글용
function checkFileExtkr(val)
{
	var retVal = true;
	var includeExt = "jpg,gif,png,bmp,avi,mp4,flv";
	var fileLength = val.length;
	var fileExt = val.substring(val.length-3,val.length);
	if(includeExt.indexOf(fileExt.toLowerCase()) < 0){
		alert("확장자가 "+includeExt+"인 파일만 등록 가능합니다.");
		retVal = false;
	}
	return retVal;
}

//확장자체크(이미지 url)
function checkUrlExt(val)
{
	var retVal = true;
	var includeExt = "jpg,gif,png,bmp";
	var fileLength = val.length;
	var fileExt = val.substring(val.length-3,val.length);
	if(includeExt.indexOf(fileExt.toLowerCase()) < 0){
		//alert("이미지 URL만 입력 할 수 있습니다.");
		alert("Image url can be registered.");
		retVal = false;
	}
	return retVal;
}

//확장자체크(이미지 url) - 한글용
function checkUrlExtkr(val)
{
	var retVal = true;
	var includeExt = "jpg,gif,png,bmp";
	var fileLength = val.length;
	var fileExt = val.substring(val.length-3,val.length);
	if(includeExt.indexOf(fileExt.toLowerCase()) < 0){
		alert("이미지 URL만 입력 할 수 있습니다.");
		retVal = false;
	}
	return retVal;
}

//피카사체크
function checkPicasa(val)
{
	var retVal = true;
	var includeStr1 = "ggpht.com";
	var includeStr2 = "googleusercontent.com"
	if(val.indexOf(includeStr1)<0 && val.indexOf(includeStr2)<0){
		alert("Picasa image url can be registered."); 
		retVal = false;
	}
	return retVal;
}

//피카사체크 - 한글용
function checkPicasakr(val)
{
	var retVal = true;
	var includeStr1 = "ggpht.com";
	var includeStr2 = "googleusercontent.com"
	if(val.indexOf(includeStr1)<0 && val.indexOf(includeStr2)<0){
		alert("피카사 URL을 입력하세요."); 
		retVal = false;
	}
	return retVal;
}

//이메일체크2
function isEmail2(obj) {
	var pattern = /^[_a-zA-Z0-9-\.]+@[\.a-zA-Z0-9-]+\.[a-zA-Z]+$/;
	return (pattern.test(obj.value)) ? true : false;
}

/* textarea에서의 maxlength*/
function txtAreaLimit(obj) {
	// IE일때만 maxlength를 처리
	if ($.browser.msie) {
		var maxLength = parseInt(obj.getAttribute("maxlength"));
			if ( obj.value.length > maxLength ) {
			//alert(obj.value.length);
			obj.value = obj.value.substring(0, maxLength)
		}
	}
}


/**
* 특수문자, 한글 제외 스크립트
**/
function checkNonKr2(obj) {
	var tvalue = obj
	var onvalue = tvalue.value;
	if(onvalue=="" ||onvalue==null){
		return true;
	}
	else{
		var count=0
		for (i=0;i<onvalue.length;i++){
			ls_one_char = onvalue.charAt(i);

			//if(ls_one_char.search(/[0-9]/) == -1) count++;
			if(ls_one_char.search(/[0-9|a-z|A-Z]/) == -1) count++;
		}
		if(count!=0) {
			alert("영문/숫자만 입력 가능합니다.") ;
			tvalue.value = "";
			tvalue.focus();
			return false;
		}
		else {
			return true;
		}
	}
}

/**
* 특수문자 제외 스크립트(영문/숫자/한글허용)
**/
function checkNonKr3(obj) {
	var tvalue = obj
	var onvalue = tvalue.value;
	if(onvalue=="" ||onvalue==null){
		return true;
	}
	else{
		var count=0
		for (i=0;i<onvalue.length;i++){
			ls_one_char = onvalue.charAt(i);

			//if(ls_one_char.search(/[0-9]/) == -1) count++;
			if(ls_one_char.search(/[0-9|a-z|A-Z|가-힣]/) == -1) count++;
		}
		if(count!=0) {
			alert("한글/영문/숫자만 입력 가능합니다.") ;
			tvalue.value = "";
			tvalue.focus();
			return false;
		}
		else {
			return true;
		}
	}
}

//쿠키가져오기
function getCookie(strName)
{
	var strArg = new String(strName + "=");
	var nArgLen, nCookieLen, nEnd;
	var i = 0, j;

	nArgLen    = strArg.length;
	nCookieLen = document.cookie.length;
	if(nCookieLen > 0) {
		while(i < nCookieLen) {
			j = i + nArgLen;
			if(document.cookie.substring(i, j) == strArg) {
				nEnd = document.cookie.indexOf (";", j);
				if(nEnd == -1) nEnd = document.cookie.length;
				return unescape(document.cookie.substring(j, nEnd));
			}
			i = document.cookie.indexOf(" ", i) + 1;
			if (i == 0) break;
		}
	}
	return;//return("");
}

//쿠키저장
function setCookie( name, value, expiredays )
{
	var todayDate = new Date();
	todayDate.setDate( todayDate.getDate() + expiredays );
	document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}
//쿠키삭제
function delCookie(name){
	var exp = new Date();
	exp.setTime (exp.getTime()-1);
	var cval = getCookie(name);
	document.cookie = name+"="+cval+";expires="+exp.toGMTString();
}


//자바스크립트 로그
function trace()
{
	if(window.console != undefined && console != null) { //IE는 console이 없음
	
		if(arguments.length > 1)	{
			console.log("trace => ", arguments);
		}
		else {
			console.log("trace => ", arguments[0]);
		}
	}
}


/**
 * timestamp로 된 string을 date형태의string으로 변환시켜준다.
 * @param {Object} timestamp
 */
function convertTimeStamp(timestamp, delimeter)
{
	var retDate = timestamp;
	var expDate = new Date();
	expDate.setTime(timestamp);
	var vYear = expDate.getFullYear();
	var vMonth = fnPutZeroStr(expDate.getMonth()+1);
	var vDay = fnPutZeroStr(expDate.getDate());
	
	if(delimeter=="" || delimeter==null) retDate = vYear+vMonth+vDay;
	else retDate = makeDateForm(vYear+vMonth+vDay,delimeter);
	
	return retDate;
}


/**
 * 한자리숫자일경우 "0"을 붙여서 리턴. ex) 1->01, 10->10
 * by boram 2011.02.11
 * @param {Object} val
 */
function setZeroStr(val){
	if( Number(val) < 10 ) return "0"+val;
	else return val;
}
/**
 * 한자리숫자일경우 "0"을 붙여서 리턴. ex) 1->01, 10->10
 * @param {Object} val
 */
function fnPutZeroStr(val){
	var ttt = val+"";
	if( Number(val) < 10 && ttt.length==1 ) return "0"+ttt;
	else return ttt;
}

/**
 * trim
 *
 * @param   text
 * @return  string
 */
function trim(text) {
	if (text == "") {
		return  text;
	}
	var len = text.length;
	var st = 0;

	while ((st < len) && (text.charAt(st) <= ' ')) {
		st++;
	}
	while ((st < len) && (text.charAt(len - 1) <= ' ')) {
		len--;
	}
	return  ((st > 0) || (len < text.length)) ? text.substring(st, len) : text;
}

/**
 * ltrim
 *
 * @param   text
 * @return  string
 */
function ltrim(text) {
    if (text == "") {
        return  text;
    }

    var len = text.length;
    var st = 0;

    while ((st < len) && (text.charAt(st) <= ' ')) {
        st++;
    }

    return  (st > 0) ? text.substring(st, len) : text;
}

/**
 * rtrim
 *
 * @param   text
 * @return  string
 */
function rtrim(text) {
    if (text == "") {
        return  text;
    }

    var len = text.length;
    var st = 0;

    while ((st < len) && (text.charAt(len - 1) <= ' ')) {
        len--;
    }

    return  (len < text.length) ? text.substring(st, len) : text;
}

// 숫자만 입력 가능하도록
// IE외의 브라우저에서도 동작할 수 있도록 변경
function onlyNumberInput( Ev )
{
    if (window.event) // IE코드
        var code = window.event.keyCode;
    else // 타브라우저
        var code = Ev.which;

    if ((code > 34 && code < 41) || (code > 47 && code < 58) || (code > 95 && code < 106) || code == 8 || code == 9 || code == 13 || code == 46) {
        window.event.returnValue = true;
        return;
    }

    if (window.event)
        window.event.returnValue = false;
    else
        Ev.preventDefault();    
}


/* ----------------------------------------------------------------------------
 * 특정 날짜에 대해 지정한 값만큼 가감(+-)한 날짜를 반환, 데이트객체로 반환하게 변경
 *
 * ----입력 파라미터 -----
 * pInterval : "yyyy" 는 연도 가감, "m" 은 월 가감, "d" 는 일 가감
 * pAddVal  : 가감 하고자 하는 값 (정수형)
 * pYyyymmdd : 가감의 기준이 되는 날짜
 * pDelimiter : pYyyymmdd 값에 사용된 구분자를 설정 (없으면 "" 입력)
 * 
 * ----반환값 ----
 * yyyymmdd 또는 함수 입력시 지정된 구분자를 가지는 yyyy?mm?dd 값
 * 
 * ----사용예 ---
 * 2008-01-01 에 3 일 더하기 ==> addDate("d", 3, "2008-08-01", "-");
 * 20080301 에 8 개월 더하기 ==> addDate("m", 8, "20080301", "");
 --------------------------------------------------------------------------- */
function addDate(pInterval, pAddVal, pYyyymmdd, pDelimiter)
{
	var yyyy;
	var mm;
	var dd;
	var cDate;
	var oDate;
	var cYear, cMonth, cDay;
	
	if (pDelimiter != "") {
		pYyyymmdd = pYyyymmdd.replace(eval("/\\" + pDelimiter + "/g"), "");
	}
	
	yyyy = pYyyymmdd.substr(0, 4);
	mm  = pYyyymmdd.substr(4, 2);
	dd  = pYyyymmdd.substr(6, 2);
	
	if (pInterval == "yyyy") {
		yyyy = (yyyy * 1) + (pAddVal * 1);
	} else if (pInterval == "m") {
		mm  = (mm * 1) + (pAddVal * 1);
	} else if (pInterval == "d") {
		dd  = (dd * 1) + (pAddVal * 1);
	}
	
	cDate = new Date(yyyy, mm - 1, dd) // 12월, 31일을 초과하는 입력값에 대해 자동으로 계산된 날짜가 만들어짐.
	cYear = cDate.getFullYear();
	cMonth = cDate.getMonth() + 1;
	cDay = cDate.getDate();
	
	cMonth = cMonth < 10 ? "0" + cMonth : cMonth;
	cDay = cDay < 10 ? "0" + cDay : cDay;
	
	if (pDelimiter != "") {
		return cYear + pDelimiter + cMonth + pDelimiter + cDay;
	} else {
		return cYear + pDelimiter + cMonth + pDelimiter + cDay;
		//return new Date(cYear, cMonth - 1, cDay);
	}
}


/**
 * 폼 데이터 필수 이름 체크.
 *
 * @param   form
 */
function chkFormEleNm(form) {
    var obj;
    var dispName;
    var dataType;
    var isValid;
    var value;
    var message;
    var messageAdd;
    var retArr = new Array();

    for (i = 0; i < form.elements.length; i++) {

        obj = form.elements[i];
        dispName = obj.getAttribute("dispName");
        if(dispName == "" || dispName == null) continue;
        obj.value = trim(obj.value); 
        dataType = obj.getAttribute("dataType");
        value = obj.value;

        if (dispName == null) {
            dispName = obj.name;
        }


        if (obj.getAttribute("isNull") == "N") {
            isValid = false;

            if (obj.type == "radio" || obj.type == "checkbox" || obj.type == "select") {
                if (form.elements(obj.name).length) {
                    for (j = 0; j < form.elements(obj.name).length; j++) {
                        if (form.elements(obj.name)[j].checked) {
                            isValid = true;
                            break;
                        }
                    }
                } else {
                    if (obj.checked) {
                        isValid = true;
                    }
                }
            } else {
                if (value != "") {
                    isValid = true;
                } else {
                    if (obj.getAttribute("comma") != null) {
                        obj.value = 0;
                        isValid = true;
                    }
                }
            }

            if (!isValid) {
                retArr.push(dispName);
            }
        }


    } /// end of for()

    return  retArr.join();
}

/*
 * xss :: cross site script 방지용 
 */
function fnXssFilter(text) {
	if (text == "") {
		return  text;
	}
	text = replaceAll(text, "<", "&lt;");
	text = replaceAll(text, ">", "&gt;");
	text = replaceAll(text, "\'", "’");
	text = replaceAll(text, "\"", "”");
	
	return  text;
}

//비밀번호 유효성 검사 :: 영문, 숫자 혼합하여 6~20자리 이내
function fnChkPwd(str){
	var reg_pwd = /^.*(?=.{8,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
	if(!reg_pwd.test(str)){
		return false;
	}
	return true;
}

//비밀번호 유효성 검사 :: 영문,숫자,특수문자 혼합하여 8자리~20자리 이내.(비밀번호 표준)
function fnChkPwdStandard(str){
	var pw = str;
	var num = pw.search(/[0-9]/g);
	var eng = pw.search(/[a-z]/ig);
	var spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
	if(pw.length < 8 || pw.length > 20){
		alert("8자리 ~ 20자리 이내로 입력해주세요.");
		return false;
	}
	if(pw.search(/₩s/) != -1){
		alert("비밀번호는 공백없이 입력해주세요.");
		return false;
	}
	
	if(num < 0 || eng < 0 || spe < 0 ){
		alert("영문,숫자, 특수문자를 혼합하여 입력해주세요.");
		return false;
	}
	return true;
	
}

var SignModule={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(input){var output="";var chr1,chr2,chr3,enc1,enc2,enc3,enc4;var i=0;input=SignModule._utf8_encode(input);while(i<input.length){chr1=input.charCodeAt(i++);chr2=input.charCodeAt(i++);chr3=input.charCodeAt(i++);enc1=chr1>>2;enc2=((chr1&3)<<4)|(chr2>>4);enc3=((chr2&15)<<2)|(chr3>>6);enc4=chr3&63;if(isNaN(chr2)){enc3=enc4=64}else if(isNaN(chr3)){enc4=64}output=output+this._keyStr.charAt(enc1)+this._keyStr.charAt(enc2)+this._keyStr.charAt(enc3)+this._keyStr.charAt(enc4)}return output},decode:function(input){var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(i<input.length){enc1=this._keyStr.indexOf(input.charAt(i++));enc2=this._keyStr.indexOf(input.charAt(i++));enc3=this._keyStr.indexOf(input.charAt(i++));enc4=this._keyStr.indexOf(input.charAt(i++));chr1=(enc1<<2)|(enc2>>4);chr2=((enc2&15)<<4)|(enc3>>2);chr3=((enc3&3)<<6)|enc4;output=output+String.fromCharCode(chr1);if(enc3!=64){output=output+String.fromCharCode(chr2)}if(enc4!=64){output=output+String.fromCharCode(chr3)}}output=SignModule._utf8_decode(output);return output},_utf8_encode:function(string){string=string.replace(/\r\n/g,"\n");var utftext="";for(var n=0;n<string.length;n++){var c=string.charCodeAt(n);if(c<128){utftext+=String.fromCharCode(c)}else if((c>127)&&(c<2048)){utftext+=String.fromCharCode((c>>6)|192);utftext+=String.fromCharCode((c&63)|128)}else{utftext+=String.fromCharCode((c>>12)|224);utftext+=String.fromCharCode(((c>>6)&63)|128);utftext+=String.fromCharCode((c&63)|128)}}return utftext},_utf8_decode:function(utftext){var string="";var i=0;var c=c1=c2=0;while(i<utftext.length){c=utftext.charCodeAt(i);if(c<128){string+=String.fromCharCode(c);i++}else if((c>191)&&(c<224)){c2=utftext.charCodeAt(i+1);string+=String.fromCharCode(((c&31)<<6)|(c2&63));i+=2}else{c2=utftext.charCodeAt(i+1);c3=utftext.charCodeAt(i+2);string+=String.fromCharCode(((c&15)<<12)|((c2&63)<<6)|(c3&63));i+=3}}return string}};function addCrc(max){var arrFlag=['N','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','W','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9'];var ret="";for(var i=0;i<max;i++){ret=ret+arrFlag[Math.floor(Math.random()*62)+1]}return ret}function fnSign(orgStr){return addCrc(32)+SignModule.encode(orgStr)+addCrc(32)}

/* javascript Date format 함수*/
/* 사용예) new Date().format("yyyy년 MM월 dd일 a/p hh시 mm분 ss초") */
Date.prototype.format = function(f) {
    if (!this.valueOf()) return " ";
 
    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;
     
    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "MM": return (d.getMonth() + 1).zf(2);
            case "dd": return d.getDate().zf(2);
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    });
};
String.prototype.dstring = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".dstring(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};


var login = function() {
	var id = $("#userId").val();	
	if(id == "") {
		$("#userId").focus();
		alert("아이디를 입력해주세요.");
		return;
	}
	
	var pw = $("#userpw").val();
	if(pw == "") {
		$("#userpw").focus();
		alert("비밀번호를 입력해주세요.");
		return;
	}
	/*
	$("#LOGIN_ID").val(id);
	$("#PWD").val(pw);	
	$("#login_form").submit();
	*/
	
	if(gClick == true){
		alert("이미 실행 중입니다.\n잠시만 기다려 주세요.");
		return;
	}
	gClick = true;
	
	var s = document.signForm;
	s.LOGIN_ID.value = fnSign(id);
	s.PWD.value = fnSign(pw);
	s.action="/intranet/adm/login.do";
	s.submit();
}

var changeSelectBox = function(e) {
    var dataItem = this.dataItem(e.item.index());
    var htmlText = "";
	
    if(dataItem.value == "mdfyDate" || dataItem.value == "rgtDate") {
    	var date = $("#searchDate").val();
    	if(date == null || date == "")
    		date = getToday();
    	
    	htmlText = "<input id=\"datepicker\" value=\"" + date + "\" style=\"width:150px;\" />";
    	
    }
    else {
    	if ( !$("#search_keyword").hasClass("k-textbox") ) {
    		htmlText = "<input type=\"text\" id=\"search_keyword\" name=\"search_keyword\" class=\"k-textbox\" placeholder=\"Search Word\" style=\"width: 200px;\" />";	
    	}
    }
    
    if (htmlText != "") {
    	$("#searchControl").html(htmlText);
    }
    
    
    $("#datepicker").kendoDatePicker({
        format: "yyyy/MM/dd",
		value: new Date(),
		culture: "ko-KR"	
	});
}

var getToday = function() {
	var date = new Date();
	var month = parseInt(date.getMonth(), 10);
	var rtVal = date.getFullYear() + "-" + chiperCheck(month+1) + "-" + chiperCheck(date.getDate());
	rtVal += " " + chiperCheck(date.getHours()) + ":" + chiperCheck(date.getMinutes()) + ":" + chiperCheck(date.getSeconds());
	
	return rtVal;
}

var chiperCheck = function(val) {
	if(val >= 10)
		return val;
	
	return "0"+val;
}

var gridDataChange = function(gridID, dataInfo) {
	var grid = $('#'+gridID).data('kendoGrid');
	grid.dataSource.page(1);
    grid.dataSource.transport.options.read.data = dataInfo;
    grid.dataSource.read();
    grid.refresh();
}
var chartDataChange = function(gridID, dataInfo) {
	var grid = $('#'+gridID).data('kendoGrid');
	var chart = $('#chart').data('kendoChart');	
	chart.dataSource.page(1);
	chart.dataSource.transport.options.read.data = dataInfo;
	chart.dataSource.read();
	chart.refresh();
	grid.dataSource.page(1);
    grid.dataSource.transport.options.read.data = dataInfo;
    grid.dataSource.read();
    grid.refresh();
}
var init = function() {
	gridDataChange("grid-view", {});
	chartDataChange("grid-view", {});
	var htmlText = "<input type=\"text\" id=\"search_keyword\" name=\"search_keyword\" class=\"k-textbox\" placeholder=\"Search Word\" style=\"width: 200px;\" />";
    $("#searchControl").html(htmlText);
    $("#search_item").data("kendoComboBox").value("");
}

var subMenuSetting = function(menuID, menu_NM, menuPATH, prntMenuID) {
	htmlText = "";
	
	
	if (menuPATH == '#')
		htmlText = "<li id=\"" + menuID + "\" style=\"color:#AAA;\" >";
	else
		htmlText = "<li id=\"" + menuID + "\" onclick=\"javascript:goMenu('" + menuPATH + "');\">";
		
	htmlText += menu_NM;
	
	htmlText += "</li>";
	
	$("#"+prntMenuID).append(htmlText);
}

var goMenu = function(path) {
	location.href = path;
}

var dateCompare = function(startDate, endDate){
	return (parseInt(startDate.split("/").join("")) <= parseInt(endDate.split("/").join("")));
}

var showDetailSearch = function() {
	var detail_search_layer = $("#detail_search_layer");
	detail_search_layer.data("kendoWindow").open();
}

//검색 날짜 조건 

function checkDate(){
	//현재일자 
	var now = new Date();
	
	if ($("#SEARCH_START_DATE").val() != ''
		&& $("#SEARCH_END_DATE").val() == '') {
		alert("검색기간을 모두 선택해주세요.");
		return false;
     }	
	
	if ($("#SEARCH_START_DATE").val() > now){
		alert("시작일을 오늘보다 과거 날짜로 선택해주세요.");
		$("#SEARCH_START_DATE").data("kendoDatePicker").open();
		return false;
	}

	if ($("#SEARCH_END_DATE").val() > now){
		alert("종료일을 오늘보다 과거 날짜로 선택해주세요.");
		$("#SEARCH_END_DATE").data("kendoDatePicker").open();
		return false;
	}	
	
	if ($("#SEARCH_START_DATE").val() > $("#SEARCH_END_DATE").val() ) {
		alert("시작일보다 미래 날짜를 선택해주세요.");
		$("#SEARCH_END_DATE").data("kendoDatePicker").open();
		return false;
	}
	
	return true;
}

function checkMonth(){
	//현재일자 
	var now = new Date();
	
	if ($("#SEARCH_START_MONTH").val() != ''
		&& $("#SEARCH_END_MONTH").val() == '') {
		alert("검색기간을 모두 선택해주세요.");
		return false;
     }	
	
	if ($("#SEARCH_START_MONTH").val() > now){
		alert("시작달을 오늘보다 과거 달로 선택해주세요.");
		$("#SEARCH_START_MONTH").data("kendoDatePicker").open();
		return false;
	}

	if ($("#SEARCH_END_MONTH").val() < now){
		alert("종료달을 오늘보다 과거 달로 선택해주세요.");
		$("#SEARCH_END_MONTH").data("kendoDatePicker").open();
		return false;
	}	
	
	if ($("#SEARCH_START_MONTH").val() > $("#SEARCH_END_MONTH").val() ) {
		alert("시작달보다 미래 달로 선택해주세요.");
		$("#SEARCH_END_MONTH").data("kendoDatePicker").open();
		return false;
	}
	
	return true;
}

/*레이어팝업 #1*/
function layer_open(el){
	var temp = $('#' + el);		//레이어의 id를 temp변수에 저장
	var bg = temp.prev().hasClass('bg');	//dimmed 레이어를 감지하기 위한 boolean 변수

	//레이어띄우기+부모창스크롤제어
	if(bg){
		$('.layer').fadeIn(400,function(e){$('html, body').css({'overflow': ''}); }); 
	}else{
		temp.fadeIn(400,function(e){$('html, body').css({'overflow': ''}); });	//bg 클래스가 없으면 일반레이어로 실행한다.
	}

	// 화면의 중앙에 레이어를 띄운다.
	if (temp.outerHeight() < $(document).height() ) temp.css('margin-top', '-'+temp.outerHeight()/2+'px');
	else temp.css('top', '0px');
	if (temp.outerWidth() < $(document).width() ) temp.css('margin-left', '-'+temp.outerWidth()/2+'px');
	else temp.css('left', '0px');

	//'닫기'버튼을 클릭하면 레이어가 사라진다.
	temp.find('a.cbtn').unbind();
	temp.find('a.cbtn').click(function(e){
		//레이어지우기+부모창스크롤제어
		if(bg){
			$('.layer').fadeOut(400,function(e){$('html, body').css({'overflow': ''}); });
		}else{
			temp.fadeOut(400,function(e){$('html, body').css({'overflow': ''}); });		
		}
		e.preventDefault();
	});
	
	//'닫기'버튼을 클릭하면 레이어가 사라진다.
	temp.find('.popup_close').unbind();
	temp.find('.popup_close').click(function(e){
		//레이어지우기+부모창스크롤제어
		if(bg){
			$('.layer').fadeOut(400,function(e){$('html, body').css({'overflow': ''}); });
		}else{
			temp.fadeOut(400,function(e){$('html, body').css({'overflow': ''}); });		
		}
		e.preventDefault();
	});
	
	$('.layer .bg').unbind();
	$('.layer .bg').click(function(e){
		$('.layer').fadeOut(400,function(e){$('html, body').css({'overflow': ''}); });
		e.preventDefault();
	});

}	

/*레이어팝업 #2*/
function layer_open2(el){
	
	var temp = $('#' + el);		//레이어의 id를 temp변수에 저장
	var bg = temp.prev().hasClass('bg');	//dimmed 레이어를 감지하기 위한 boolean 변수

	//레이어띄우기+부모창스크롤제어
	if(bg){
		$('.layer2').fadeIn(400,function(e){$('html, body').css({'overflow': ''}); });
	}else{
		temp.fadeIn(400,function(e){$('html, body').css({'overflow': ''}); });	//bg 클래스가 없으면 일반레이어로 실행한다.
	}

	// 화면의 중앙에 레이어를 띄운다.
	if (temp.outerHeight() < $(document).height() ) temp.css('margin-top', '-'+temp.outerHeight()/2+'px');
	else temp.css('top', '0px');
	if (temp.outerWidth() < $(document).width() ) temp.css('margin-left', '-'+temp.outerWidth()/2+'px');
	else temp.css('left', '0px');

	//'닫기'버튼을 클릭하면 레이어가 사라진다.
	temp.find('a.cbtn').unbind();
	temp.find('a.cbtn').click(function(e){
		//레이어지우기+부모창스크롤제어
		if(bg){
			$('.layer2').fadeOut(400,function(e){$('html, body').css({'overflow': ''}); });
		}else{
			temp.fadeOut(400,function(e){$('html, body').css({'overflow': ''}); });		
		}
		e.preventDefault();
	});
	
	//'닫기'버튼을 클릭하면 레이어가 사라진다.
	temp.find('.popup_close').unbind();
	temp.find('.popup_close').click(function(e){
		//레이어지우기+부모창스크롤제어
		if(bg){
			$('.layer2').fadeOut(400,function(e){$('html, body').css({'overflow': ''}); });
		}else{
			temp.fadeOut(400,function(e){$('html, body').css({'overflow': ''}); });		
		}
		e.preventDefault();
	});
	
	$('.layer2 .bg').unbind();
	$('.layer2 .bg').click(function(e){
		$('.layer2').fadeOut(400,function(e){$('html, body').css({'overflow': ''}); });
		e.preventDefault();
	});
}	

/*레이어팝업 #3*/
function layer_open3(el){
	//$('html, body').css({'overflow': 'hidden'}); //부모창 스크롤 방지
	
	var temp = $('#' + el);		//레이어의 id를 temp변수에 저장
	var bg = temp.prev().hasClass('bg');	//dimmed 레이어를 감지하기 위한 boolean 변수

	//레이어띄우기+부모창스크롤제어
	if(bg){
		$('.layer3').fadeIn(400,function(e){$('html, body').css({'overflow': ''}); });
	}else{
		temp.fadeIn(400,function(e){$('html, body').css({'overflow': ''}); });	//bg 클래스가 없으면 일반레이어로 실행한다.
	}

	// 화면의 중앙에 레이어를 띄운다.
	if (temp.outerHeight() < $(document).height() ) temp.css('margin-top', '-'+temp.outerHeight()/2+'px');
	else temp.css('top', '0px');
	if (temp.outerWidth() < $(document).width() ) temp.css('margin-left', '-'+temp.outerWidth()/2+'px');
	else temp.css('left', '0px');

	//'닫기'버튼을 클릭하면 레이어가 사라진다.
	temp.find('a.cbtn').unbind();
	temp.find('a.cbtn').click(function(e){
		//레이어지우기+부모창스크롤제어
		if(bg){
			$('.layer3').fadeOut(400,function(e){$('html, body').css({'overflow': ''}); });
		}else{
			temp.fadeOut(400,function(e){$('html, body').css({'overflow': ''}); });
		}
		e.preventDefault();
	});
	
	//'닫기'버튼을 클릭하면 레이어가 사라진다.
	temp.find('.popup_close').unbind();
	temp.find('.popup_close').click(function(e){
		//레이어지우기+부모창스크롤제어
		if(bg){
			$('.layer3').fadeOut(400,function(e){$('html, body').css({'overflow': ''}); });
		}else{
			temp.fadeOut(400,function(e){$('html, body').css({'overflow': ''});});	
		}
		e.preventDefault();
	});
	
	$('.layer3 .bg').unbind();
	$('.layer3 .bg').click(function(e){
		$('.layer3').fadeOut(400,function(e){$('html, body').css({'overflow': ''}); });
		e.preventDefault();
	});
}	


/**
 * 레이어팝업 #9* ::: 가운데를 기준점으로 위치조정이 가능한 레이어 팝업
 * @param el - 레이어  ID
 * @param wid - 센터기준 width 값 
 * @param hei - 센터기준 height 값
 */
function layer_open9(el, wid, hei){
	var temp = $('#' + el);		//레이어의 id를 temp변수에 저장
	var bg = temp.prev().hasClass('bg');	//dimmed 레이어를 감지하기 위한 boolean 변수
	//레이어띄우기+부모창스크롤제어
	if(bg){
		$('.layer9').fadeIn(400,function(e){$('html, body').css({'overflow': ''}); });
	}else{
		temp.fadeIn(400,function(e){$('html, body').css({'overflow': ''}); });	//bg 클래스가 없으면 일반레이어로 실행한다.
	}
	
	var layerY = -(temp.outerHeight()+Number(hei))/2;
	var layerX = -(temp.outerWidth()+Number(wid))/2;
	// 화면의 중앙에 레이어를 띄운다.
	if (temp.outerHeight() < $(document).height() ) temp.css('margin-top', layerY+'px');
	else temp.css('top', '0px');
	if (temp.outerWidth() < $(document).width() ) temp.css('margin-left', layerX+'px');
	else temp.css('left', '0px');

	//'닫기'버튼을 클릭하면 레이어가 사라진다.
	temp.find('a.cbtn').unbind();
	temp.find('a.cbtn').click(function(e){
		//레이어지우기+부모창스크롤제어
		if(bg){
			$('.layer9').fadeOut(400,function(e){$('html, body').css({'overflow': ''}); });
		}else{
			temp.fadeOut(400,function(e){$('html, body').css({'overflow': ''}); });		
		}
		e.preventDefault();
	});
	
	//'닫기'버튼을 클릭하면 레이어가 사라진다.
	temp.find('.popup_close').unbind();
	temp.find('.popup_close').click(function(e){
		//레이어지우기+부모창스크롤제어
		if(bg){
			$('.layer9').fadeOut(400,function(e){$('html, body').css({'overflow': ''}); });
		}else{
			temp.fadeOut(400,function(e){$('html, body').css({'overflow': ''}); });		
		}
		e.preventDefault();
	});
	
	$('.layer9 .bg').unbind();
	$('.layer9 .bg').click(function(e){
		$('.layer9').fadeOut(400,function(e){$('html, body').css({'overflow': ''}); });
		e.preventDefault();
	});
}	

/*레이어팝업 다중*/
function layer_open_total(el){
	
	var temp = $('#' + el);		//레이어의 id를 temp변수에 저장
	var bg = temp.prev().hasClass('bg');	//dimmed 레이어를 감지하기 위한 boolean 변수

	//레이어띄우기+부모창스크롤제어
	if(bg){
		temp.parent('.layer_total').fadeIn(400,function(e){$('html, body').css({'overflow': ''}); });
	}else{
		temp.fadeIn(400,function(e){$('html, body').css({'overflow': ''}); });	//bg 클래스가 없으면 일반레이어로 실행한다.
	}

	// 화면의 중앙에 레이어를 띄운다.
	if (temp.outerHeight() < $(document).height() ) temp.css('margin-top', '-'+temp.outerHeight()/2+'px');
	else temp.css('top', '0px');
	if (temp.outerWidth() < $(document).width() ) temp.css('margin-left', '-'+temp.outerWidth()/2+'px');
	else temp.css('left', '0px');

	//'닫기'버튼을 클릭하면 레이어가 사라진다.
	temp.find('a.cbtn').unbind();
	temp.find('a.cbtn').click(function(e){
		//레이어지우기+부모창스크롤제어
		if(bg){
			temp.parent('.layer_total').fadeOut(400,function(e){$('html, body').css({'overflow': ''}); });
		}else{
			temp.fadeOut(400,function(e){$('html, body').css({'overflow': ''}); });		
		}
		e.preventDefault();
	});
	
	//'닫기'버튼을 클릭하면 레이어가 사라진다.
	temp.find('.popup_close').unbind();
	temp.find('.popup_close').click(function(e){
		//레이어지우기+부모창스크롤제어
		if(bg){
			temp.parent('.layer_total').fadeOut(400,function(e){$('html, body').css({'overflow': ''}); });
		}else{
			temp.fadeOut(400,function(e){$('html, body').css({'overflow': ''}); });		
		}
		e.preventDefault();
	});
	
	$('.layer_total .bg').unbind();
	/*$('.layer_total .bg').click(function(e){
		temp.parent('.layer_total').fadeOut(400,function(e){$('html, body').css({'overflow': ''}); });
		e.preventDefault();
	});*/
}	

/**
 * 공통 : 메인영역 페이지이동 호출
 * @param targetUrl - 보여줄 페이지 액션 url을 적는다 (/sample/abc.htm 등)
 * @param targetForm - 같이 넘길 form id를 넣어주면, 해당 파라메터를 post로 넘겨준다.
 */
var fnCommMv = function(targetUrl, targetForm) {
	showLoadingBar('body');
	$("#containerBody").load(targetUrl, $("#"+targetForm).serialize(), function(responseTxt, statusTxt, xhr){
        if(statusTxt == "success"){
        	showLoadingBar('body');
        }
        if(statusTxt == "error"){
        	alert("Error: " + xhr.status + ": " + xhr.statusText);
        	showLoadingBar('body');
        }
    });
}

//엔터검색 - 파이어폭스 최적화 버전
function enterCheck(evt, target){
	var evCode = (window.netscape) ? evt.which : event.keyCode ;
	if(evCode == 13){
		if($("input[name=page]").length > 0)
			document.dataForm.page.value='1';
		
		MAIN(target);
	}
}

/*LoadingStatusBar
 *사용법
 *1. 로딩바를 띄우고자 하는 obj에 id 부여.
 *2. 함수 호출시 부여된 id로 호출.
 *3. 활성, 비활성 모두 하나의 함수로 처리.
 * by 륭*/
function showLoadingBar(target){
	
	if($("#"+target +">.sjLoading").length > 0){
		//$("#"+target +">#ocpListLoading").remove();
		$("#"+target +">.sjLoading").remove();
		/*
		if($("#ocpListLoading").css("display") != "none" ){
			$("#ocpListLoading").hide();
		}else if($("#ocpListLoading").css("display") == "none" ){
			$("#ocpListLoading").show();
		}
		*/
	}else{
		$("#"+target).append('<div id="sjLoading" class="sjLoading">				<div class="spinner">					<div class="rect1"></div>					<div class="rect2"></div>				<div class="rect3"></div>					<div class="rect4"></div>					<div class="rect5"></div>				</div>			</div>');
	}
}

//도움말 박스
function titleXY(oid, ostyle, x, y, title) {
	var obj = document.getElementById(oid);
	
	if(!x)
		x=0;
	if(!y)
		y=0;
	
	if(title && title.length > 0) 
		$(obj).html(title);
		
	  if(ostyle) {
		//obj.style.offsetLeft = event.x;
	    //obj.style.offsetTop = event.y;
	    $(obj).css("left", event.x+x);
	    $(obj).css("top", event.y+y);
	    obj.style.visibility = 'visible';
	  } 
	  else
	    obj.style.visibility = 'hidden';
}


function fnCommPopup(id){
	switch( id ){
		case "0": // FAQ 팝업
			Center_Popup('/web/faq.htm','commPop'+id,800,650);
		break;
		case "1": // 서비스소개 팝업
			Center_Popup('/web/intro.do','commPop'+id,800,650);
			break;
		case "2": // 이용약관 팝업
			var d = document.dataForm;
			Center_Popup('/web/terms.do','commPop'+id,800,530);
			break;
		case "3": // 개인정보취급방침 팝업
			var d = document.dataForm;
			Center_Popup("/web/policy.do",'commPop'+id,800,530);
			break;	
		case "4": // 제휴/파트너신청 팝업
			var d = document.dataForm;
			Center_Popup('/web/patnship.do','commPop'+id,800,745);
			break;	
		case "5": // 비밀번호 변경 팝업
			var d = document.dataForm;
			Center_Popup('/web/setPassword.htm','commPop'+id,375,340);
			break;
		default: 
			alert("잘못된 호출");
			return false;
			break;
	}
}
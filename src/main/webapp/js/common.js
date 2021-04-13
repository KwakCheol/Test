var pageNum; // ���� 1depth �޴� ��ġ
var subNum; // ���� 2depth �޴� ��ġ

function checkPage(pageNum) {
	var num = 5; // 1depth �޴� ����

	if(pageNum) {
		// alert(pageNum);
		for(i = 1; i <= num; i++) {
			if(pageNum == i) {
				$("ul.nav li.mm").eq(pageNum-1).children("a").css("background","#fff");//"background","#26999e"
			}
		}
	} else {
		$("ul.nav li.mm").children("a").css("background","none");
	}
}

$(document).ready(function(){
	$(".msgCnt").hide();
	$(document).on("click", ".popup_cancel", function(){
		$(".popup_close").click();
	})
	
	checkPage(pageNum);

	$(".gnb ul.nav li.mm").hover(
		function() {
			$(".gnb ul.nav li.mm a").css("background","none");
			$( this ).children("a").css("background","#fff"); //"background","#26999e"
		},
		function() {
			checkPage(pageNum);
			$( this ).children("a").css("background","none");
		}
	);
});


/*레이어팝업 다중*/
function layer_open_total(el){
	const nowTop = $("html").scrollTop(); // 현재 위치 기억
	$('html, body').css({'overflow': 'hidden', 'position': 'fixed'});	
	$('html, body').animate({scrollTop: nowTop}, 0);
	
	var temp = $('#' + el);		//레이어의 id를 temp변수에 저장
	var bg = temp.prev().hasClass('bg');	//dimmed 레이어를 감지하기 위한 boolean 변수
	const parent = temp.parent("div");
	if(bg){
		parent.fadeIn();
	}else{
		temp.fadeIn();	//bg 클래스가 없으면 일반레이어로 실행한다.
	}
	
	if(parent.hasClass("layer_popup")){
		// 화면의 중앙에 레이어를 띄운다.
		if (temp.outerHeight() < $(document).height() ) temp.css('margin-top', '-'+temp.outerHeight()/2+'px');
		else temp.css('top', '100px');
		if (temp.outerWidth() < $(document).width() ) temp.css('margin-left', '-'+temp.outerWidth()/2+'px');
		else temp.css('left', '0px');		
	}

	//'닫기'버튼을 클릭하면 레이어가 사라진다.
	temp.find('a.cbtn').unbind();
	temp.find('a.cbtn').click(function(e){
		if(bg){
			parent.fadeOut();
		}else{
			temp.fadeOut();		
		}
		$('html, body').css({'overflow': '', 'position': ''});	
		$('html, body').animate({scrollTop: nowTop}, 0);
		e.preventDefault();
	});
	
	//'닫기'버튼을 클릭하면 레이어가 사라진다.
	temp.find('.popup_close').unbind();
	temp.find('.popup_close').click(function(e){
		if(bg){
			parent.fadeOut();
		}else{
			temp.fadeOut();		
		}
		$('html, body').css({'overflow': '', 'position': ''});
		$('html, body').animate({scrollTop: nowTop}, 0);
		e.preventDefault();
	});
	
	parent.find(".bg").unbind();
	parent.find(".bg").click(function(e){
		parent.fadeOut();
		$('html, body').css({'overflow': '', 'position': ''});
		$('html, body').animate({scrollTop: nowTop}, 0);
		e.preventDefault();
	});
		
}

/* ž�޴� */
$(document).ready(function(){

	function fnIcon(idx, action) {
		if("over" == action) {
			$(".nav li").eq(idx).append("<div></div>").find("div").addClass("icon");
		}else {
			$(".nav li").eq(idx).find("div").removeClass("icon");
		}
	}

	var idx;
	var len = $(".nav li").size(); //5

	$(".nav li a").on({
		mouseover:function() {
			idx = $(this).parent().index();
			
			for(var i=0; i < len; i++) {
				if(i == idx) {
					$(".m"+idx).addClass("open");
				}
			}

			fnIcon(idx, "over")
		},
		mouseout:function() {
			idx = $(this).parent().index();

			for(var i=0; i < len; i++) {
				if(i == idx) {
					$(".m"+idx).removeClass("open");
				}
			}

			fnIcon(idx)
		}
	});
	$(".sub").on({
		mouseover:function() {
			//alert(idx);
			$(this).addClass("open");
			fnIcon(idx, "over")
		},
		mouseout:function() {
			$(this).removeClass("open");
			fnIcon(idx)
		}
	});
});

function strToBool(s){
    // will match one and only one of the string 'true','1', or 'on' rerardless
    // of capitalization and regardless off surrounding white-space.
    //
    regex=/^\s*(true|1|on)\s*$/i

    return regex.test(s);
}

function simpleAjax(url, data, message){
	$.post(url, data, function(result){
		if(result > 0){
			alert(message);
			location.reload();
		} else {
			alert("실패했습니다.");
		} 		
	});
}

function checkName(name, text) {	
	if( $("[name='"+name+"'").val() == "" ){
		alert(text);
		$("[name='"+name+"'").focus();
		return false;
	}
	return true;
}

function emptyChk(name) {
	if( $("[name='"+name+"'").val() == "" ){		
		return false;
	}
	return true;
}

function fixStyle(obj, targetAttr, setAttr){
	var str = $(obj).attr("style");
	//console.log(str)
	if(str != null){
		if(str.indexOf(targetAttr) >= 0){
			str += setAttr;
			$(obj).attr("style", str);
		}
	}
}

function nvl(str, defaultStr){
    if(typeof str == "undefined" || str == null || str == "")
        str = defaultStr ;
    return str ;
}

function addZero(num){	
	return 10 > num ? "0"+num : num.toString();
}

function openWin(url, target, width, height, scroll, resize) {
	var x = window.screenLeft;
    var y = window.screenTop;
    var left = x+((document.body.offsetWidth-width)/2);
    var top = y+((document.body.offsetHeight-height)/2);

	winParams = 'height='+height+',width='+width+',top='+top+',left='+left+',scrollbars='+scroll+',resizable='+resize;
	win = window.open(url, target, winParams);
	win.window.focus();
}

function addDashPhoneNumber(obj){
	const addDash = $(obj).val()
						.match(/\d*/g).join('')
        				.match(/(\d{0,3})(\d{0,4})(\d{0,4})/).slice(1).join('-')
        				.replace(/-*$/g, '');

	$(obj).val(addDash);
}

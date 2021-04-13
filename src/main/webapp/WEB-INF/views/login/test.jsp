<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>인트라넷 로그인</title>
	<meta charset="utf-8"/>
	<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
	<script type="text/javascript" src="/js/jquery-1.12.4.min.js"></script>
<style>
	html, body {
		width:  297mm;
		height: 420mm;
		margin: 0;
		padding: 0;
	}
</style>
</head>
<body>
	<div name="a${parent_i }" style="width: 297mm;height: 420mm;background: yellow;padding:10px;position: relative;"></div>   
	<!--  <div style="width: 148mm;height: 210mm;display: inline-block;float: left;background: url('static/images/zs.png') ;background-size: cover;"> 
</div>  
<div style="width: 74mm;height: 105mm;display: inline-block;float: left;background: url('static/images/zs.png') ;background-size: cover;">  
</div>
<div style="width: 74mm;height: 52.5mm;display: inline-block;float: left;">  
	<div style="width: 100%;height: 100%;background: url('static/images/zs.png') ;background-size: cover;"></div>
</div> -->



</body>

<script>
$(function(){
	selectClosingList();
	console.log($("body").children("div").eq(0).css("width"));
	console.log($("body").children("div").eq(0).css("height"));
});
function selectClosingList(){
	$.ajax({
		type: "POST",
		dataType: "json",
		url: "/test",
		success: function(data) {
			//console.log(data);
			var a=data.a;
			var b_height = data.b_height;
			var b_width = data.b_width;
			var parent_i = data.parent_i;
			
			var cnt = parent_i+1;
			
			for(var i=cnt;i<9;i++){
				var str="";
				for(var k=0;k<2;k++){
					var height = 0;
					var width = 0;
					if(i % 2 == 0){
						height = b_width[i];
						width = b_height[i];
					}else{
						height = b_height[i];
						width = b_width[i];
					}
					
					str+='<div style="width: '+width+';height: '+height+';display: inline-block;float: left;" name="a'+i+'">'; 
					str+='</div>';
				}
				$("div[name='a"+(i-1)+"']").each(function(){
					$(this).html(str);
				});
			}
			
			var aa = [5,6,6,7,7,7,8,8,8,8,8]; 
			aa.sort();
			
			for(var i=0;i<aa.length;i++){
				var str="";
				var cnt=0;
				
				$("div[name='a"+aa[i]+"']").each(function(){
					var flag = true
					
					var obj = $(this);
					for(var k=aa[i]-1;k>=parent_i+1;k--){
						obj = $(obj).parent();
						
						if(obj.css('background').indexOf('url') != -1){
							flag = false;
							break;
						}
					}
					
					if(flag){
						if($(this).css('background').indexOf('url') == -1 && cnt == 0){ 
							$(this).css({'background':'url(static/images/zs'+aa[i]+'.jpg)'});
							$(this).css({'background-size':'cover'});
							cnt++;
						}
					}
				});
			}
			
			
			var parent_div_name = $("body").children("div").eq(0).attr("name");
			var chidren_i = parseInt(parent_div_name.split("")[1])+1;
	
			var str='';
			
			var margin = 10; ///마진 주기
			var cnt = 0;
			for(var i=chidren_i;i<9;i++){
				$("div[name='a"+i+"']").each(function(index,item){
					if($(this).css('background').indexOf('url') != -1){
						
						var left = parseInt($(this).position().left);
						var top = parseInt($(this).position().top);
						var right = parseInt($(this).position().right);
						var bottom = parseInt($(this).position().bottom);
						var width = $(this).css("width");
							width = getRealSize(parseInt(width.substring(0,width.length-2)));
						var height = $(this).css("height");
							height = getRealSize(parseInt(height.substring(0,height.length-2)));
						var bg_url = $(this).css("background").split("(\"")[1].split("\")")[0];
							bg_url = bg_url.substring(bg_url.lastIndexOf("/")+1,bg_url.length);
						var bg_size = $(this).css("background-size");
						
						/* console.log(left);
						console.log(top);
						console.log('--------');  */
						var top_type="top";
						var top_margin = 0;
						if(top != margin){
							top_type="bottom";
							top_margin = margin;
						}
						
						var left_type="left"; 
						var left_margin = 0;
						if(left != margin){
							left_type="right";
							left_margin = margin;
						}
						
						var div_style_obj="";
						
						
						str+='<div style="width: '+width+'px;height: '+height+'px;'+div_style_obj+' line-height:'+height+'px;text-align:'+left_type+';display: inline-block;position: absolute;left: '+left+'px;top: '+top+'px;">';
						str+='	<img src="static/images/'+bg_url+'" style="width: '+(width-left_margin)+'px;height: '+(height-top_margin)+'px;vertical-align:'+top_type+';"/>';      
						str+='</div>';  
					} 
				});  
			} 
			
			$("body").children("div").eq(0).html(str);
			
			console.log($("html").html());
		},
		error: function(request,status,error){
			alert("리스트 호출중 오류가 발생 하였습니다.")	;
		}
	});//end ajax
}

function getRealSize(size){
	console.log("size:"+size);
	var result = 0;
	switch (size) {
		case 279:
			result = 280
			break;
		default:
			result = size
			break;
	}
	
	return result;
}
</script>

</html>
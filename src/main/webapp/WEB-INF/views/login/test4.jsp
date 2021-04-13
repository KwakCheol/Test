<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>인트라넷 로그인</title>
	<meta charset="utf-8"/>
	<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
	<script type="text/javascript" src="/js/jquery-1.12.4.min.js"></script>
	<script type = "text/javascript" src = "https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>
	<script type = "text/javascript" src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js"></script>
<style>
	html, body {
		width:  1123px;
		height: 1587px;
		margin: 0;
		padding: 0;
	}
</style>
</head>
<body>
	<%-- <div>
		<input type="radio" id="radio1" name="radio" value="1" ${radio == 2?'':'checked' } onclick="margin_change();"/><label for="radio1">이미지간 마진주기</label>
		<input type="radio" id="radio2" name="radio" value="2" ${radio == 2 and not empty radio?'checked':'' } onclick="margin_change();"/><label for="radio2">재단선 활성</label><br>
		<input type="checkbox" id="checkbox1" name="checkbox1" ${empty checkbox1?'checked':'' } onclick="margin_change();"/><label for="checkbox1">이미지 축소 활성</label><br>
		
		<input type="text" id="input_value" value="${not empty margin?margin:0 }" placeholder="마진값" onchange="margin_change();"/>
	</div>
	
	
	<div style="padding: 10px;">
		<div id="canvas">
			<div name="a${parent_i }" style="width: 1123px;height: 1587px;background: yellow; position: relative;"></div>
			
		</div>
	</div> --%>
	
	<!--  <div style="width: 148mm;height: 210mm;display: inline-block;float: left;background: url('static/images/zs.png') ;background-size: cover;"> 
</div>  
<div style="width: 74mm;height: 105mm;display: inline-block;float: left;background: url('static/images/zs.png') ;background-size: cover;">  
</div>
<div style="width: 74mm;height: 52.5mm;display: inline-block;float: left;">  
	<div style="width: 100%;height: 100%;background: url('static/images/zs.png') ;background-size: cover;"></div>
</div> -->
<div name="a${parent_i }" style="width: 1123px;height: 1587px;background: yellow;">
	<img id="img" src="/uploads/a3.png">
</div>


</body>

<script>
$(function(){
	//selectClosingList();
	
	
});
function margin_change(){
	var ck = $("#checkbox1").prop("checked")?"":1;
	location.href="/test4?margin="+$("#input_value").val()+"&checkbox1="+ck+"&radio="+$("input[name='radio']:checked").val();
}
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
			 
			
			var obj_arr = [];
			for(var i=0;i<9-parent_i-1;i++){
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
					
					str+='<div style="width: '+width+'px;height: '+height+'px;display: inline-block;float: left;" name="a'+(parent_i+i+1)+'">'; 
					str+='</div>';
				}
				
				$("div[name='a"+(parent_i+i)+"']").each(function(){
					$(this).html(str);
				});
			}
		
			var aa = [5,6,6,7,7,8,8,8,8,8,8];  
			//var aa = [6,7,7,8,8,8,8,8,8,8,8,8,8,8]; 
			aa.sort();
			
			for(var i=0;i<aa.length;i++){
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
			
			
			var parent_div_name = $("#canvas").children("div").eq(0).attr("name");
			var chidren_i = parseInt(parent_div_name.split("")[1])+1;
	
			var str='';
			
			var margin = parseInt($("#input_value").val()); ///도형간 마진 주기
			
			for(var i=chidren_i;i<9;i++){
				$("div[name='a"+i+"']").each(function(index,item){
					if($(this).css('background').indexOf('url') != -1){
						var left = parseInt($(this).position().left);
						var top = parseInt($(this).position().top);
						var width = $(this).css("width");
							width = parseInt(width.substring(0,width.length-2));
						var height = $(this).css("height");
							height = parseInt(height.substring(0,height.length-2));
							
						var bg_url = $(this).css("background").split("(\"")[1].split("\")")[0];
							bg_url = bg_url.substring(bg_url.lastIndexOf("/")+1,bg_url.length);
						var bg_size = $(this).css("background-size"); 
						
						obj_arr.push({obj: $(this), top: top, left: left, width: width, height: height, bg_url: bg_url, bg_size: bg_size});
					}
				});
			}
			
			//top기준 배치 배열세팅 시작
			obj_arr.sort(function(a,b){
				return a.top-b.top;
			});
			
			
			var arr_top_level = [];
			
			for(var i=0;i<obj_arr.length;i++){
				arr_top_level.push(obj_arr[i].top);
			}
			
			arr_top_level = new Set(arr_top_level);
			arr_top_level = Array.from(arr_top_level);
			//top기준 배치 배열세팅 종료
			
			
			//left기준 배치 배열세팅 시작
			obj_arr.sort(function(a,b){
				return a.left-b.left;
			});
			
			var arr_left_level = [];
			
			for(var i=0;i<obj_arr.length;i++){
				arr_left_level.push(obj_arr[i].left);
			}
			
			arr_left_level = new Set(arr_left_level);
			arr_left_level = Array.from(arr_left_level);
			//left기준 배치 배열세팅 종료
			console.log("1차");
			console.log(obj_arr);
			console.log(arr_left_level);
			console.log(arr_top_level);
			
			
			for(var i=0;i<obj_arr.length;i++){
				var left = obj_arr[i].left;
				var top = obj_arr[i].top;
				var width = obj_arr[i].width;
				var height = obj_arr[i].height;
				var bg_url = obj_arr[i].bg_url;
				var bg_size = obj_arr[i].bg_size; 
				
				if($("input[name='checkbox1']").prop("checked")){//이미지 축소 활성
					if($("input[name='radio']:checked").val() == 1){//이미지간 마진주기
						var top_type="top";
						var top_margin = 0;
						
						if(top != 0 && top != margin){
							top_type="bottom";
							top_margin = margin;
						}
						
						var left_type="left"; 
						var left_margin = 0;
						
						if(left != 0 && left != margin){
							left_type="right";
							left_margin = margin;
						} 
						
						
						
						str+='<div style="width: '+width+'px;height: '+height+'px; line-height:'+height+'px;text-align:'+left_type+';display: inline-block;position: absolute;left: '+left+'px;top: '+top+'px;">';
						str+='	<img src="static/images/'+bg_url+'" style="width: '+(width-left_margin)+'px;height: '+(height-top_margin)+'px;vertical-align:'+top_type+';"/>';      
						str+='</div>'; 
					}else{//재단선
						
						var top_margin = margin*2;
					
						var left_margin = margin*2;
						
						var obj_style="";
						if(left == 0){
							obj_style+='border-left: 1px dashed black;border-right: 1px dashed black;';
						}else{
							obj_style+='border-right: 1px dashed black;';
						}
						
						if(top == 0){
							obj_style+='border-top: 1px dashed black;border-bottom: 1px dashed black;';
						}else{
							obj_style+='border-bottom: 1px dashed black;';
						}
						
						str+='<div style="width: '+width+'px;height: '+height+'px; '+obj_style+' line-height:'+height+'px;text-align: center; display: inline-block;position: absolute;left: '+left+'px;top: '+top+'px;">';
						str+='	<img src="static/images/'+bg_url+'" style="width: '+(width-left_margin)+'px;height: '+(height-top_margin)+'px;vertical-align: middle;"/>';      
						str+='</div>';
					}
				}else{
					if($("input[name='radio']:checked").val() == 1){
						
						var top_margin = 0;
						for(var x=0;x<arr_top_level.length;x++){ 
							if(arr_top_level[x] == top){
								top_margin = margin*x;
								break;
							}
						}
						
						var left_margin = 0;
						var left_level=0;
						for(var x=0;x<arr_left_level.length;x++){ 
							if(arr_left_level[x] == left){
								left_margin = margin*x;
								break;
							} 
						}
						
						str+='<div style="width: '+width+'px;height: '+height+'px;line-height:'+height+'px;display: inline-block;position: absolute;left: '+(left+left_margin)+'px;top: '+(top+top_margin)+'px;">';
						str+='	<img src="static/images/'+bg_url+'" style="width: '+width+'px;height: '+height+'px;"/>';      
						str+='</div>'; 
					}else{
						
					}
				}
			}
			
			$("#canvas").children("div").eq(0).html(str);
			
			//프린트할 영역 크기
			var domain_width = $("#canvas").children("div").eq(0).css("width");
				domain_width = parseInt(domain_width.substring(0,domain_width.length-2));
			var domain_height = $("#canvas").children("div").eq(0).css("height");
				domain_height = parseInt(domain_height.substring(0,domain_height.length-2));
				
			console.log(domain_width);
			console.log(domain_height);
			
			var obj_arr2 = [];
			
			
			$("div[name='a"+chidren_i+"']").children("div").each(function(index,item){
				var left = parseInt($(this).position().left);
				var top = parseInt($(this).position().top);
				var width = $(this).css("width");
					width = parseInt(width.substring(0,width.length-2));
				var height = $(this).css("height");
					height = parseInt(height.substring(0,height.length-2));
					
					console.log(left);
					console.log(width);
					console.log(top);
					console.log(height);
					
				obj_arr2.push({obj: $(this), top: top, left: left, width: width, height: height});
			});
			
			
			//top기준 배치 배열세팅 시작
			obj_arr2.sort(function(a,b){
				return a.top-b.top;
			});
			
			
			var arr_top_level2 = [];
			
			for(var i=0;i<obj_arr.length;i++){
				arr_top_level.push(obj_arr[i].top);
			}
			
			arr_top_level2 = new Set(arr_top_level);
			arr_top_level2 = Array.from(arr_top_level);
			//top기준 배치 배열세팅 종료
			
			
			//left기준 배치 배열세팅 시작
			obj_arr2.sort(function(a,b){
				return a.left-b.left;
			});
			
			var arr_left_level2 = [];
			
			for(var i=0;i<obj_arr.length;i++){
				arr_left_level.push(obj_arr[i].left);
			}
			
			arr_left_level2 = new Set(arr_left_level);
			arr_left_level2 = Array.from(arr_left_level);
			//left기준 배치 배열세팅 종료
			
			console.log("2차");
			console.log(obj_arr2);
			console.log(arr_left_level2);
			console.log(arr_top_level2);
			if(domain_width < arr_left_level[arr_left_level.length-1].width && domain_height < arr_top_level[arr_top_level.length-1].height ){
				alert("프린트 종이 사이즈가 모자랍니다.");
			}
			
			return false;
			
			
			//console.log(str);
			
		/* 	html2canvas($("#canvas")[0]).then(function(canvas){
				console.log(canvas.toDataURL('image/png')); 
				
				 // 캔버스를 이미지로 변환
                var imgData = canvas.toDataURL('image/png');
				 
                $.ajax({
					type : "POST",
					url : '/test3',
					data : {data: imgData},
					success : function(data){
						console.log(data);
					}
				});
                
                return false;

                var imgWidth = 210; // 이미지 가로 길이(mm) A4 기준
                var pageHeight = imgWidth * 1.414;  // 출력 페이지 세로 길이 계산 A4 기준
                var imgHeight = canvas.height * imgWidth / canvas.width;
                var heightLeft = imgHeight;

                var doc = new jsPDF('p', 'mm');
                var position = 0;

                // 첫 페이지 출력
                doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;

                // 한 페이지 이상일 경우 루프 돌면서 출력
                while (heightLeft >= 20) {
                    position = heightLeft - imgHeight;
                    doc.addPage();
                    doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }

                // 파일 저장
               // doc.save('sample.pdf');
			}); */
			
			var copyDom = $("#canvas");
			html2canvas(copyDom[0],{
				scale: 4,
				dpi:1000,
				width: copyDom[0].offsetWidth,
		        height: copyDom[0].offsetHeight,
	            useCORS: true // 【重要】开启跨域配置
			}).then(function(canvas){
				var context = canvas.getContext('2d');
			        context.mozImageSmoothingEnabled = false;
			        context.webkitImageSmoothingEnabled = false;
			        context.msImageSmoothingEnabled = false;
			        context.imageSmoothingEnabled = false;
		        
				var imgDataUrl = canvas.toDataURL('image/png');
				var blobBin = atob(imgDataUrl.split(',')[1]);	// base64 데이터 디코딩 
			    var array = [];
			    for (var i = 0; i < blobBin.length; i++) {
			        array.push(blobBin.charCodeAt(i));
			    }
			    var file = new Blob([new Uint8Array(array)], {type: 'image/png'});	// Blob 생성
			    var formdata = new FormData();	// formData 생성
			    formdata.append("file", file, 'test.png');
             
				 
				$.ajax({
					url: "/ajax_upload",
					contentType: 'multipart/form-data', 
					type: 'POST',
					data: formdata,   
					dataType: 'json',     
					mimeType: 'multipart/form-data',
					success: function (data) { 
						console.log(data);
						//$("#img").prop("src","/uploads/test/161552817162683186.png");
					},
					error : function (jqXHR, textStatus, errorThrown) {
						alert('ERRORS: ' + textStatus);
					},
					cache: false,
					processData : false,	// data 파라미터 강제 string 변환 방지!!
			        contentType : false,	// application/x-www-form-urlencoded; 방지!!
				});
			});
		},
		error: function(request,status,error){
			alert("리스트 호출중 오류가 발생 하였습니다.")	;
		}
	});//end ajax
}

function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);
    // 마임타입 추출
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type:mimeString});
}

</script>

</html>
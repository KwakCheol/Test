<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>인트라넷 로그인</title>
	<meta charset="utf-8"/>
	<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
	
	<script type="text/javascript" src="/js/jquery-1.12.4.min.js"></script>
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.2/jquery.validate.min.js"></script>
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.2/additional-methods.min.js"></script>
</head>
<body>
<form  id="frm">
    아이디 : <input type="text" name="id" id="id"/><br/>
    비밀번호 : <input type="password" name="password" id="password"/><br/>
    비밀번호확인 : <input type="password" name="repassword" id="repassword"/><br/>
    나이 :  <input type="text" name="age" id="age"/><br/>
    전화번호 :  <input type="text" name="phone" id="phone"/><br/>
    이름 : <input type="text" name="name" id="name"/><br/>
    이메일 : <input type="text" name="email" id="email"/><br/>
    홈페이지 : <input type="text" name="homepage" id="homepage"/><br/>
    <input type="submit" value="회원가입" />
</form>


</body>

<script>
$(function(){
	
	$.validator.addMethod("regex", function(value, element, regexp) {
        let re = new RegExp(regexp);
	    let res = re.test(value)
	    return res;
	});

	//계산 식 지정
	$.validator.addMethod("math", function(value, element, params) {
		return this.optional(element) || value == params[0] + params[1];
	}, $.validator.format("올바른 값을 입력하세요. {0} + {1}"));

	
	
	$.validator.addMethod("koreanLetters", function(value, element){
		return this.optional(element) || value.match("/^[가-힣]+$/");
		}, "한글로 입력 해주세요.");
	
	$.validator.addMethod("englishLetters", function(value, element){

		return this.optional(element) || value.match(/^[a-zA-Z0-9\.\,\s]+( [a-zA-Z0-9\.\,\s]+)*$/);

	}, "영어 혹은 수자만 입력 해주세요.");
	
	
	
	$("form").validate({
        /**
       * submitHandler : form 양식이 유효한 경우 실질적인 
       * submit을 하기 위한 콜백 핸들러. 
       * 유효성이 확인된 후 Ajax를 통해 처리하기에 적합하다.
       */
       submitHandler: function() {
           var f = confirm("회원가입을 완료하겠습니까?");
           if(f){
               return true;
           } else {
               return false;
           }
       },
       //애러메세지 alert로 할시 추가
       /* showErrors:function(errorMap, errorList){
	    	var caption = $(errorList[0].element).attr('caption') ||
	    	$(errorList[0].element).attr('name');
	    	alert('[' + caption + ']' + errorList[0].message);
	    }, */
     //에러메시지 위치 및 css 지정
       errorElement: "label",
	    errorPlacement: function(error, element) {
	        error.insertAfter(element);
	        error.css("border", "1px solid red");
	    },
       // 체크할 항목들의 룰 설정
       rules: {
           id: {
               required : true,
               minlength : 5,
               englishLetters : true
               //remote: "/check_id.jsp"
           },
           password: {
               required : true,
               minlength : 3
           },
           repassword: {
               required : true,
               minlength : 3,
               equalTo : password
           },
           name: {
               required : true,
               minlength : 2,
               koreanLetters: true
           },
           age: {
               digits : true
           },
           phone: {
        	   regex : "^(010|011)[-\\s]?\\d{3,4}[-\\s]?\\d{4}$"
           },
           email: {
               required : true,
               minlength : 2,
               email : true
           },
           homepage: {
               url : true
           }
       },
       //규칙체크 실패시 출력될 메시지
       messages : {
           id: {
               required : "필수로입력하세요",
               minlength : "최소 {0}글자이상이어야 합니다",
               remote : "존재하는 아이디입니다"
           },
           password: {
               required : "필수로입력하세요",
               minlength : "최소 {0}글자이상이어야 합니다"
           },
           repassword: {
               required : "필수로입력하세요",
               minlength : "최소 {0}글자이상이어야 합니다",
               equalTo : "비밀번호가 일치하지 않습니다."
           },
           name: {
               required : "필수로입력하세요",
               minlength : "최소 {0}글자이상이어야 합니다"
           },
           age: {
               digits : "숫자만입력하세요",
           },
           phone: {
        	   regex : "핸드폰"
           },
           email: {
               required : "필수로입력하세요",
               minlength : "최소 {0}글자이상이어야 합니다",
               email : "메일규칙에 어긋납니다"
           },
           homepage: {
               url : "정상적인 URL이 아닙니다"
           }
       }
   });
	
	
	
});



function chagne_test(obj){
	console.log("chagne_test:"+$(obj).val());
}
</script>
</html>
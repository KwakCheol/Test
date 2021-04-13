$(function(){			
})

//확장자 체크
function fileExtChk(name, extArr) {
	const chk = extArr.split(",");
	const ext = name.split('.').pop();
	if(chk.indexOf(ext.toUpperCase()) < 0){
		alert("업로드 할 수 없는 파일 입니다.");
		return false;
	} else {
		return true;
	}	
}

// 용량 체크
function fileSizeChk(size, maxMb, minMb){
	const maxSize = Number(maxMb) * 1024 * 1024;
	const minSize = Number(minMb) * 1024 * 1024;
	
	if(size > maxSize){
		alert("파일의 용량이 너무 큽니다.");
		return false;
	} else if(size < minSize){
		alert("파일의 용량이 너무 작습니다.");
		return false;
	} else {
		return true;
	}	
}

//file 객체에서 바이너리 읽어와 view
function imgPreview(input, selector) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
  
		reader.onload = function (e) { $(selector).attr('src', e.target.result); }  
		reader.readAsDataURL(input.files[0]);
	}
}
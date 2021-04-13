var CN_LIST = "";
var CN_PART = "";
var CN_AREA = "";

$(function(){
	getClientList(1, CN_LIST, CN_PART, CN_AREA);
	
	$(".selectArea select").on("change", function (){
		const depth = $(".selectArea select").index(this) + 1;
		
		switch (depth) {
		case 1: 
			CN_LIST = $(this).find(":selected").val(); 
			CN_PART = "";
			CN_AREA = "";	
			$("#sel3").html("");
			break;
		case 2: 
			CN_PART = $(this).find(":selected").val(); 
			CN_AREA = "";
			$("#sel3").html("");
			break;
		case 3:
			CN_AREA = $(this).find(":selected").val(); 
		}
		
		getClientList(depth + 1, CN_LIST, CN_PART, CN_AREA)
	})
});

function getClientList(DEPTH, CN_LIST, CN_PART, CN_AREA){
	$.ajax({
		type: "POST",
		dataType: "json",
		url: "../client/clientList",
		data: {DEPTH:DEPTH, CN_LIST:CN_LIST, CN_PART:CN_PART, CN_AREA:CN_AREA},
		success: function(data_obj) {
			var str = "";
			var data = data_obj.list;
			if(data.length > 0){
				str = "<option value=''>전체</option>";
				for(var i=0;i<data.length;i++){
					var option_data = " data-idx='"+data[i].IDX+"'";
					if(DEPTH == 1){
						str+='<option value="' + data[i].CN_LIST + '" '+(CN_LIST ==  data[i].CN_LIST?"selected":"")+' '+option_data+'>'+ data[i].CN_LIST+'</option>';
					}else if(DEPTH == 2){
						str+='<option value="' + data[i].CN_PART + '" '+(CN_PART ==  data[i].CN_PART?"selected":"")+' '+option_data+'>'+ data[i].CN_PART+'</option>';
					}else if(DEPTH == 3){
						str+='<option value="' + data[i].CN_AREA + '" '+(CN_AREA ==  data[i].CN_AREA?"selected":"")+' '+option_data+'>'+ data[i].CN_AREA+'</option>';
					}
				}				
			} 
			
			$("#sel"+DEPTH).html(str);
		},
		error: function(request,status,error){
			showLoadingBar('contents');
			alert("리스트 호출중 오류가 발생 하였습니다.")	;
		}
	});//end ajax
}

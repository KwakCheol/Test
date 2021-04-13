var color = "f00";
$(function(){	
	$(document).off().on("click", "#shareNames", function(){
		console.log("twi")
		const url = "basicinfo/popListMember?param1="+$("#shareIds").val()+"&param2=shareIds&param3=shareNames";
		const wp = 'height=900,width=1100,scrollbars=yes,resizable=no';
		openPop(url, wp);
	})
	
	dynaAddEvent("click","#addBtn", makeSelect)
	dynaAddEvent("click","#saveSch", function(){
		var bool = checkName("START_DATE", "시작일을 입력해주세요.") &&
				   checkName("END_DATE", "종료일을 입력해주세요.") &&
			       checkName("TITLE", "제목을 입력해주세요.");

		if(bool && confirm("일정을 등록하시겠습니까?")){
			const selectArr = $("select[name='ALRAM_CATEGORY[]']");
			var temp = [];
			
			if(selectArr.length > 0){
				for (var i = 0; i < selectArr.length; i++) {
					temp.push($("select[name='ALRAM_CATEGORY[]']").eq(i).val());
				}
				$("#frm").append('<input type="hidden" name="ALRAM_CATEGORY" value="'+temp.toString()+'">');
			}
			
			if(!$(":checkbox[name='WEIGHT_FLAG']").is(":checked")){
				$("#frm").append('<input type="hidden" name="WEIGHT_FLAG" value="N">');
			} 			
			setDataBySchedule($("#frm").serialize());
		}
	})
	
	$(document).on("click", ".alert_del", function(){
		$(this).parents(".alert_wrap").remove();	
	})
	
	dynaAddEvent("click", "#deleteSch", function(){		
		$(this).attr("disabled", true);
		if(confirm("일정을 삭제하시겠습니까?")){
			simpleAjax(getSessionContext() + "deleteSch", {IDX:$(":hidden[name='IDX']").val()}, "삭제되었습니다.");		
		} else {
			$(".popup_close").trigger("click");
		}
	});	
})

function dynaAddEvent(action, selector, callback){
	$(document).off(action, selector).on(action, selector, callback);
}

var weightArr = [];
function setDataForSchedule (date){
	$.post(getSessionContext() + "schList", {date:date}, function(result){
		var scDataArr = setSchJson(result);		
		setFullCalendar(date, scDataArr);
	})
}

function setFullCalendar(nowDate, scDataArr){
	calendarConfig.defaultDate = nowDate;
	calendarConfig.events = scDataArr;
	
  	var calendar = new FullCalendar.Calendar(document.getElementById('calendar'), calendarConfig);
  	
  	$("#calendar").html("");
	calendar.render();
 	
	calendar.on('dateClick', function(info) {
		dayClick(info);
	});
	
	calendar.on('eventClick', function(info) {
		eventClick(info);
	});
	
	$(".fc-prev-button, .fc-next-button").click(function() {
		var date = formatDay(calendar.getDate(),1);
		setDataForSchedule(date);
    });
}

function noEdit(selector){
	$(selector).find("input, textarea, select, checkbox").attr("disabled", true);
}

function simpleDateFmt(date){
	return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0, -1).replace("T", " ").substring(0, 16);
}

function getDataBySchedule (idx) {
	$.post(getSessionContext() + "sch", {IDX:idx}, function(result){
		color = result.COLOR;
		makePop();
		var tbl = $("#divNeedPopup table");
		var armArr = result.ALRAMS != null ? result.ALRAMS.split(",") : [];		
		var stDate = new Date(result.START_DATE.replace(/-/g, "/"));
			stDate = simpleDateFmt(stDate);
		var edDate = new Date(result.END_DATE.replace(/-/g, "/"));
			edDate = simpleDateFmt(edDate);
		
		$.each(result, function(key, value){
		    tbl.find("[name='"+key+"']").val(result[key]);			
		});
		
		if(result.WEIGHT_FLAG == 'Y'){ $(":checkbox[name='WEIGHT_FLAG']").prop("checked", true); }
		if(armArr.length > 0){
			for (var i = 0; i < armArr.length; i++) {
				makeSelect();
				$("select[name='ALRAM_CATEGORY[]']").eq(i).val(armArr[i]);
			}
		}
		
		tbl.find("[name='START_DATE']").val(stDate);
		tbl.find("[name='END_DATE']").val(edDate);
		
		if(getSessionSeq() != result.U_IDX){
			noEdit("#divNeedPopup");
			tbl.find("tr:last").remove();
			$("#divNeedPopup .btn_set").remove();
		}
		
		$(":checkbox[name='WEIGHT_FLAG']").val("Y");
		$("#frm").append('<input type="hidden" name="IDX" value="'+result.IDX+'">');
		layer_open9('divNeedPopup', -500, -500);
	})
}

function makePop(){
	var html = '<form action="" method="post" id="frm"> \
					<div class="pop_close popup_close">×</div> \
			        <h2>일정 등록</h2> \
			        <table> \
			            <tr> \
			                <td class="title">시작일</td> \
			                <td class="sub"><input type="text" value="" class="datetimepicker3" readonly name="START_DATE"></td> \
			                <td class="title">작성자</td> \
			                <td class="sub" colspan="3"><input type="text" disabled="disabled" name="MBER_NM" value="'+getSessionName()+'"></td> \
			            </tr> \
			            <tr> \
			                <td class="title">종료일</td> \
			                <td class="sub"><input type="text" value="" class="datetimepicker3" readonly name="END_DATE"></td> \
			                <td class="title02">글자색</td> \
			                <td class="sub02"><input type="text" value="#ff0000" name="COLOR"></td> \
			                <td class="title02">굵기</td> \
			                <td class="sub02"><input type="checkbox" name="WEIGHT_FLAG" value="Y"></td> \
			            </tr> \
			            <tr> \
			                <td class="title">일정공유</td> \
			                <td class="sub" colspan="5" style="padding: 3px;"> \
			                	<textarea class="sche_share" id="shareNames" name="WITH_NAMES" readonly="readonly"></textarea> \
			                	<input type="hidden" name="WITH_IDS" id="shareIds"> \
			                </td> \
			            </tr> \
			            <tr> \
			                <td class="title">제목(노출)</td> \
			                <td class="sub" colspan="5" style="padding: 3px;"><input type="text" class="subject" name="TITLE" maxlength="50"></td> \
			            </tr> \
			            <tr> \
			                <td class="title">설명</td> \
			                <td class="sub" colspan="5" style="padding: 3px;"><textarea class="sche_share" maxlength="100" name="MEMO"></textarea></td> \
			            </tr>';

		html += 		'<tr>'+
			            '   <td class="title">쪽지알림</td>'+
			            '   <td class="sub" colspan="5" style="padding: 3px; height: auto" id="alramArea">'+			                                       
			            '       <button type="button" style="background: #fff;color: #4d4d4d;border: 1px solid #bbb;border-radius: 4px;height: 25px;line-height: 18px;padding:2px 8px;margin: 5px 0;font-size: 12px;" id="addBtn">알림추가</button>'+
			            '   </td>'+
			            '</tr>'+
			        '</table>'+			        
			        '<div class="btn_set">'+
			            '<button type="button" id="saveSch">저장</button>'+
			            '<button type="button" id="deleteSch" onclick="deleteSch()">삭제</button>'+
			        '</div>'+
				'</form>';
	$("#divNeedPopup").html(html);
	
	$(":text[name='COLOR']").spectrum({
	    color: color,
		showPalette: true,    
		palette: [    
			["rgb(255, 0, 0)"], ["rgb(255, 153, 0)"], ["rgb(255, 255, 0)"], ["rgb(0, 255, 0)"],
			["rgb(0, 255, 255)"], ["rgb(0, 0, 255)"], ["rgb(153, 0, 255)"], ["rgb(255, 0, 255)"]    
		],
		change: function(color) {
			$(this).val(color.toHexString());
		}
	});
	
	color = "f00";
	
	$.datetimepicker.setLocale('ko');
	$(".datetimepicker3").datetimepicker({
		 datepicker:true,
		 format:'Y-m-d H:i',		 
		 allowTimes:[
		 	'08:00', '09:00', '10:00', '11:00',
		  	'12:00', '13:00', '14:00', '15:00', 
		  	'16:00', '17:00', '18:00', '19:00', 
		  	'20:00', '21:00', '22:00', '23:00', 
			'00:00', '01:00', '02:00', '03:00',
	 	]
	});
}

function makeSelect(){
	var html = '<div class="alert_wrap"> \
                    <select name="ALRAM_CATEGORY[]"> \
                        <option value="정시">정시</option> \
                        <option value="10분" selected>10분</option> \
                        <option value="15분">15분</option> \
                        <option value="1시간">1시간</option> \
                        <option value="하루 전 정오">하루 전 정오</option> \
                        <option value="일주일 전 정오">일주일 전 정오</option> \
                    </select> \
                    <span class="alert_del"><img src="'+getSessionContext()+'/images/event/btn_del.png"></span> \
                </div>';

	$("#alramArea").append(html);
}

function setDataBySchedule (data) {
	simpleAjax(getSessionContext() + "regSch", data, "저장되었습니다.");	
}

function drawChart() {
	// 제작사양서
	const barData = google.visualization.arrayToDataTable(barDataArr);
	const barOptions = { 
			title: '총 등록 ' + total + '건', 
			textStyle: { fontSize: 8 },
			legend: 'none',
			width: 600,
        	height: 220			
		};			
	const barChart = new google.visualization.ColumnChart(document.getElementById('mkChartDiv'));	
	barChart.draw(barData, barOptions);
	
	$("#mkChartDiv div div div").attr("style", "position: absolute; left: -50px; top: 0px; width: 100%; height: 100%;");
	
	// 파일 서버 현황
	const pie1Options = { 
			pieSliceText:'value',
			pieSliceTextStyle: { fontSize: 12 },
			legend: {
				position:'bottom',
				maxLines: 1,
				textStyle: { fontSize: 12 }
			},
			width: 280,
			height: 250,
			chartArea:{ top:10, width:"100%", height:"70%" },
			colors: ['gray', 'orange']
	};	
	const pie2Options = { 
			pieSliceText:'value', 
			pieSliceTextStyle: { fontSize: 12 }, 
			legend: {
				position:'bottom',
				maxLines: 1,
				textStyle: { fontSize: 12 }
			},
			width: 280,
			height: 250,
			chartArea:{ top:10, width:"100%", height:"70%" },
			colors: ['gray', '#0078ff']
	};	
	const pie1Data = new google.visualization.DataTable();
		pie1Data.addColumn('string', '');
		pie1Data.addColumn('number', '0');
		pie1Data.addRows(deDataArr);
	const pie2Data = new google.visualization.DataTable();
		pie2Data.addColumn('string', '');
		pie2Data.addColumn('number', '0');
		pie2Data.addRows(etcDataArr);
	const pie1Chart = new google.visualization.PieChart(document.getElementById('designChart'));
	const pie2Chart = new google.visualization.PieChart(document.getElementById('etcChart'));
	pie1Chart.draw(pie1Data, pie1Options);
	pie2Chart.draw(pie2Data, pie2Options);		
	
	$("#designChart div div div").attr("style", "position: absolute; left: -30px; top: 0px; width: 100%; height: 100%;");
}	

function openPop(url, winParams){	
	var x = window.screenLeft;
    var y = window.screenTop;
    var left = x+((document.body.offsetWidth-900)/2);
    var top = y+((document.body.offsetHeight-1000)/2);

	winParams += 'top='+top+',left='+left;
	win = window.open(getSessionContext()+url, '', winParams);
	win.window.focus();
}


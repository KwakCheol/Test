$(function(){
	$("#order").on("change", function(){
		$("#page").val(1);
		select_annual_list();		
	})
});

function goPrint(){
	const target = $(".box_shadow").find("table");
	var printWindow = window.open('', 'PRINT', 'height=600,width=800');

    printWindow.document.write('<html><head><title>' + document.title  + '</title>');
    printWindow.document.write('<link rel="stylesheet" type="text/css" href="../css/layout_test.css" />');
    printWindow.document.write('<link rel="stylesheet" type="text/css" href="../css/process_test.css" />');
    printWindow.document.write('<link rel="stylesheet" type="text/css" href="../css/common_test.css" />');
    printWindow.document.write('</head><body>');
	target.removeClass("wd1630");
    printWindow.document.write($(".box_shadow").html());
    target.addClass("wd1630");
    printWindow.document.write('</body></html>');
    printWindow.document.close(); // necessary for IE >= 10
    printWindow.focus(); // necessary for IE >= 10*/

    setTimeout(function(){
	    printWindow.print();
	    printWindow.close();
    }, 1000);
}
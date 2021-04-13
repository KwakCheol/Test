<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="false" %>
<head>
    <meta charset="utf-8"/>
    <title></title>
    <style>
        .center{
            width: 380px;
            height: 538px;
            background: url("static/images/zs.png") center no-repeat;
            margin: 10% auto;
            font-family: SimSun;
            position: relative;
        }
        .name{
            position: absolute;
            top: 216px;
            left: 60px;
            font-size: 20px;
            width: 74px;
            text-align: center;
            display: block;
        }
    </style>
</head>
<body>
<div class="center">
    <span class="name">testasdfasdfasdf</span>
</div>
<a href="/pdf/export">html ftl생성pdf</a><br>
<a href="/pdf/export2">url ftl생성pdf</a><br> 
<a href="javascript:;" onclick="open_mks_pop();">url ftl생성pdf</a><br> 
<a href="javascript:;" onclick="open_mks_pop2();">url ftl생성pdf2</a><br>
<a href="javascript:;" onclick="open_mks_pop4();">url ftl생성pdf4</a><br>
<a href="javascript:;" onclick="open_mks_pop5();">test5</a><br>
</body>
<script>
function open_mks_pop(){
	window.open("/test", "", "width=1630,height=800");
}
function open_mks_pop2(){
	window.open("/test2", "", "width=1630,height=800");
}
function open_mks_pop4(){
	window.open("/test4", "", "width=1630,height=800");
}
function open_mks_pop5(){
	window.open("/test5", "", "width=1630,height=800");
}
</script>
</html>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
  	<meta http-equiv="Content-Style-Type" content="text/css"/>
    <style>
        .center{
            width: 380px;
            height: 538px;
            background: url("${img}") center no-repeat;
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
    <span class="name">
    	${name}
    	<#list list as item>
	      	${item.name}
	    </#list>
    </span>
</div>
</body>
</html>

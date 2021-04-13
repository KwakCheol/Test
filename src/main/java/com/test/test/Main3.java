package com.test.test;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.StringReader;
import java.net.URL;
import java.nio.charset.Charset;

import javax.print.DocFlavor;

import com.itextpdf.text.Document;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.tool.xml.XMLWorker;
import com.itextpdf.tool.xml.XMLWorkerFontProvider;
import com.itextpdf.tool.xml.XMLWorkerHelper;
import com.itextpdf.tool.xml.css.StyleAttrCSSResolver;
import com.itextpdf.tool.xml.html.CssAppliersImpl;
import com.itextpdf.tool.xml.html.Tags;
import com.itextpdf.tool.xml.parser.XMLParser;
import com.itextpdf.tool.xml.pipeline.css.CssResolverPipeline;
import com.itextpdf.tool.xml.pipeline.end.PdfWriterPipeline;
import com.itextpdf.tool.xml.pipeline.html.HtmlPipeline;
import com.itextpdf.tool.xml.pipeline.html.HtmlPipelineContext;
public class Main3 {
	// 실행 함수
	public static void main(String[] args) throws Exception {
		String urlsource = "<!DOCTYPE html>"+
				"<html lang=\"en\">"+
				"<head>"+
				"<title>인트라넷 로그인</title>"+
					"<meta charset=\"utf-8\"/>"+
					"<meta name=\"viewport\""+
					"content=\"width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no\"/>"+
				"</head>"+
				"<body>"+
					"<div name=\"a3\" style=\"width: 800px;height: 1100px;margin:0;background: yellow;padding:10px;position: relative; \">"+
						"<div style=\"width: 559px; height: 794px; line-height: 794px; text-align: left; display: inline-block; position: absolute; left: 10px; top: 10px;\">"+
							"<div style=\"width: 559px; height: 794px; line-height: 794px; text-align: center; display: inline-block;\">"+
								"<img src=\"static/images/zs5.jpg\" style=\"width: 559px; height: 794px; vertical-align: top;\"/>"+
							"</div>"+
						"</div>"+
						"<div style=\"width: 559px; height: 397px; line-height: 397px; text-align: right; display: inline-block; position: absolute; left: 569px; top: 10px;\">"+
							"<div style=\"width: 549px; height: 397px; line-height: 397px; text-align: center; display: inline-block;\">"+
								"<img src=\"static/images/zs6.jpg\" style=\"width: 549px; height: 397px; vertical-align: top;\"/>"+
							"</div>"+
						"</div>"+
						"<div style=\"width: 559px; height: 397px; line-height: 397px; text-align: right; display: inline-block; position: absolute; left: 569px; top: 406px;\">"+
							"<div style=\"width: 549px; height: 387px; line-height: 397px; text-align: center; display: inline-block;\">"+
								"<img src=\"static/images/zs6.jpg\" style=\"width: 549px; height: 387px; vertical-align: bottom;\"/>"+
							"</div>"+
						"</div>"+
						"<div style=\"width: 280px; height: 397px; line-height: 397px; text-align: left; display: inline-block; position: absolute; left: 10px; top: 803px;\">"+
							"<div style=\"width: 280px; height: 387px; line-height: 397px; text-align: center; display: inline-block;\">"+
								"<img src=\"static/images/zs7.jpg\" style=\"width: 280px; height: 387px; vertical-align: bottom;\"/>"+
							"</div>"+
						"</div>"+
						"<div style=\"width: 280px; height: 397px; line-height: 397px; text-align: right; display: inline-block; position: absolute; left: 289px; top: 803px;\">"+
							"<div style=\"width: 270px; height: 387px; line-height: 397px; text-align: center; display: inline-block;\">"+
								"<img src=\"static/images/zs7.jpg\" style=\"width: 270px; height: 387px; vertical-align: bottom;\"/>"+
							"</div>"+
						"</div>"+
						"<div style=\"width: 280px; height: 397px; line-height: 397px; text-align: left; display: inline-block; position: absolute; left: 10px; top: 1200px;\">"+
							"<div style=\"width: 280px; height: 387px; line-height: 397px; text-align: center; display: inline-block;\">"+
								"<img src=\"static/images/zs7.jpg\" style=\"width: 280px; height: 387px; vertical-align: bottom;\"/>"+
							"</div>"+
						"</div>"+
						"<div style=\"width: 280px; height: 197px; line-height: 197px; text-align: right; display: inline-block; position: absolute; left: 289px; top: 1200px;\">"+
							"<div style=\"width: 270px; height: 187px; line-height: 197px; text-align: center; display: inline-block;\">"+
								"<img src=\"static/images/zs8.jpg\" style=\"width: 270px; height: 187px; vertical-align: bottom;\"/>"+
							"</div>"+
						"</div>"+
						"<div style=\"width: 280px; height: 196px; line-height: 196px; text-align: right; display: inline-block; position: absolute; left: 289px; top: 1397px;\">"+
							"<div style=\"width: 270px; height: 186px; line-height: 196px; text-align: center; display: inline-block;\">"+
								"<img src=\"static/images/zs8.jpg\" style=\"width: 270px; height: 186px; vertical-align: bottom;\"/>"+
							"</div>"+
						"</div>"+
						"<div style=\"width: 280px; height: 197px; line-height: 197px; text-align: right; display: inline-block; position: absolute; left: 569px; top: 803px;\">"+
							"<div style=\"width: 270px; height: 187px; line-height: 197px; text-align: center; display: inline-block;\">"+
								"<img src=\"static/images/zs8.jpg\" style=\"width: 270px; height: 187px; vertical-align: bottom;\"/>"+
							"</div>"+
						"</div>"+
						"<div style=\"width: 280px; height: 196px; line-height: 196px; text-align: right; display: inline-block; position: absolute; left: 569px; top: 1000px;\">"+
							"<div style=\"width: 270px; height: 186px; line-height: 196px; text-align: center; display: inline-block;\">"+
								"<img src=\"static/images/zs8.jpg\" style=\"width: 270px; height: 186px; vertical-align: bottom;\"/>"+
							"</div>"+
						"</div>"+
						"<div style=\"width: 280px; height: 197px; line-height: 197px; text-align: right; display: inline-block; position: absolute; left: 849px; top: 803px;\">"+
							"<div style=\"width: 270px; height: 187px; line-height: 197px; text-align: center; display: inline-block;\">"+
								"<img src=\"static/images/zs8.jpg\" style=\"width: 270px; height: 187px; vertical-align: bottom;\"/>"+
							"</div>"+
						"</div>"+
					"</div>"+
				"</body>"+
				"</html>";
		urlsource = urlsource.replace("static/images/", "C:\\guozhe_work\\workspace\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp1\\wtpwebapps\\test\\static\\images\\");
	    String cssSource = getURLSource(new File("c:\\guozhe_work\\test\\css2.css"));
	    htmlToPdf(urlsource,cssSource);
	}
	
	public static void htmlToPdf(String htmlstr,String cssSource) throws Exception
    {
    String outputFile = "c:\\guozhe_work\\test\\test.pdf";
    Document document = new Document(PageSize.A3,0,0,0,0);
    PdfWriter writer = null;
    writer = PdfWriter.getInstance(document, new FileOutputStream(outputFile));
    document.open();
    
    InputStream bis = new ByteArrayInputStream(htmlstr.toString().getBytes());
    InputStream cssis = new ByteArrayInputStream(cssSource.toString().getBytes());
      XMLWorkerHelper.getInstance().parseXHtml(writer, document, bis,cssis);

    document.close();
    }
	
	public static String getURLSource(File url) throws Exception
    {
    InputStream inStream = new FileInputStream(url);
    // 通过输入流获取html二进制数据
    byte [] data = readInputStream(inStream); // 把二进制数据转化为byte字节数据
    String htmlSource = new String(data);

    inStream.close();
    return htmlSource;
    }
	
	public static byte [] readInputStream(InputStream instream) throws Exception
    {
    ByteArrayOutputStream outStream = new ByteArrayOutputStream();
    byte [] buffer = new byte[1204];
    int len = 0;
    while ((len = instream.read(buffer)) != -1)
    {
        outStream.write(buffer, 0, len);
    }
    instream.close();
    return outStream.toByteArray();
    }
}

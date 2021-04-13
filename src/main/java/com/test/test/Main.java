package com.test.test;

import java.io.FileInputStream;
import java.io.FileOutputStream;
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
public class Main {
	// 실행 함수
	public static void main(String[] args) {
		String html = 		"<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd \">"+
							"<html lang=\"en\">"+
							"<head>"+
							"<title>인트라넷 로그인</title>"+
								"<meta charset=\"utf-8\"/> "+
								"<meta name=\"viewport\" content=\"width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no\"/> "+
							"</head>"+
							"<style>"+
								"html, body {"+
									"width:  297mm;"+
									"height: 420mm;"+
									"margin: 0;"+
									"padding: 0;"+
								"}"+	
							"</style>"+
							"<body>"+
								"<div class=\"a3\" name=\"a3\" style=\"width: 297mm; height: 420mm; background: yellow; position: relative;\">"+
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
		System.out.println("==========");
		html = html.replace("static/images/", "C:\\guozhe_work\\workspace\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp1\\wtpwebapps\\test\\static\\images\\");
		System.out.println(html);
		
		// 파일 IO 스트림을 취득한다.
		try (FileOutputStream os = new FileOutputStream("c:\\guozhe_work\\test\\test.pdf")) {
			// Pdf형식의 document를 생성한다.
			Document document = new Document(PageSize.A3, 0, 0, 0, 0);
			// PdfWriter를 취득한다.
			PdfWriter writer = PdfWriter.getInstance(document, os);
			// document Open한다.
			document.open();
			// css를 설정할 resolver 인스턴스 생성
			StyleAttrCSSResolver cssResolver = new StyleAttrCSSResolver();
			// Css 파일 설정 (css1.css 파일 설정)
			try (FileInputStream cssStream = new FileInputStream("c:\\guozhe_work\\test\\css1.css")) {
				cssResolver.addCss(XMLWorkerHelper.getCSS(cssStream));
			}
			// Css 파일 설정 (css2.css 파일 설정)
			try (FileInputStream cssStream = new FileInputStream("c:\\guozhe_work\\test\\css2.css")) {
				cssResolver.addCss(XMLWorkerHelper.getCSS(cssStream));
			}
			// 폰트 설정
			XMLWorkerFontProvider font = new XMLWorkerFontProvider(XMLWorkerFontProvider.DONTLOOKFORFONTS);
			// window 폰트 설정
			font.register("c:/windows/fonts/malgun.ttf", "MalgunGothic");
			// 폰트 인스턴스를 생성한다.
			CssAppliersImpl cssAppliers = new CssAppliersImpl(font);
			//htmlContext의 pipeline 생성. (폰트 인스턴스 생성)
			HtmlPipelineContext htmlContext = new HtmlPipelineContext(cssAppliers);
			htmlContext.setTagFactory(Tags.getHtmlTagProcessorFactory());
			// pdf의 pipeline 생성.
			PdfWriterPipeline pdfPipeline = new PdfWriterPipeline(document, writer);
			// Html의pipeline을 생성 (html 태그, pdf의 pipeline설정)
			HtmlPipeline htmlPipeline = new HtmlPipeline(htmlContext, pdfPipeline);
			// css의pipeline을 합친다.
			CssResolverPipeline cssResolverPipeline = new CssResolverPipeline(cssResolver, htmlPipeline);
			//Work 생성 pipeline 연결
			XMLWorker worker = new XMLWorker(cssResolverPipeline, true);
			//Xml 파서 생성(Html를 pdf로 변환)
			XMLParser xmlParser = new XMLParser(true, worker, Charset.forName("UTF-8"));
			// 출력한다.
			try (StringReader strReader = new StringReader(html)) {
				xmlParser.parse(strReader);
			}
			// document의 리소스 반환
			document.close();
		} catch (Throwable e) {
			e.printStackTrace();
		}
	}
}

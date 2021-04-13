package com.test.test;

import org.apache.commons.io.IOUtils;
import org.apache.poi.hpsf.Array;
import org.jsoup.Jsoup;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.xhtmlrenderer.pdf.ITextFontResolver;
import org.xhtmlrenderer.pdf.ITextRenderer;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Chapter;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Section;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.text.pdf.draw.LineSeparator;
import com.itextpdf.tool.xml.XMLWorkerHelper;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("/pdf")
public class PdfController {
	
	@RequestMapping("/export")
	public void exportPdf(HttpServletResponse response) throws Exception{
		ByteArrayOutputStream baos = null;
		OutputStream out = null;
		try {
			// 模板中的数据，实际运用从数据库中查询
			List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
			Map<String,Object> data = new HashMap<>();
			data.put("name", "test");
			data.put("img", "zs.png");
			
			Map<String,Object> data2 = new HashMap<>();
			data2.put("name", "test2");
			list.add(data2);
			
			
			data.put("list", list);
			//baos = PdfUtil.createPDF(data, "zhengshu.ftl");
			baos = PdfUtil.createPDF(data, "zhengshu.ftl");
			// 设置响应消息头，告诉浏览器当前响应是一个下载文件
			response.setContentType( "application/x-msdownload");
			// 告诉浏览器，当前响应数据要求用户干预保存到文件中，以及文件名是什么 如果文件名有中文，必须URL编码 
			String fileName = URLEncoder.encode("pdf테스트.pdf", "UTF-8");
			response.setHeader( "Content-Disposition", "attachment;filename=" + fileName);
			out = response.getOutputStream();
			baos.writeTo(out);
			baos.close();
		} catch (Exception e) {
			e.printStackTrace();
		    throw new Exception("导出失败：" + e.getMessage());
		} finally{
			if(baos != null){
				baos.close();
			}
			if(out != null){
				out.close();
			}
		}
	}
	
	@RequestMapping("/export2")
	public void exportPdf2(HttpServletResponse response) throws Exception{
		String blogURL = "http://10.10.8.11:8080/login";
		String pdfFile = "c:\\guozhe_work\\test\\test.pdf";
		parseURL2PDFFile(pdfFile, blogURL);
	}
	
	public static String[] extractBlogInfo(String blogURL) throws Exception {
		String[] info = new String[2];
		org.jsoup.nodes.Document doc = Jsoup.connect(blogURL).get();
		System.out.println(doc);
		
		org.jsoup.nodes.Element entry = doc.select("div.container").first();
		System.out.println(doc.select("html").first());
		
		 
		String html = "<html lang=\"en\">"+
 "<head> "+
  "<title>인트라넷 로그인</title> "+
  "<meta charset=\"utf-8\"/> "+
  "<meta name=\"viewport\" content=\"width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no\"/> "+
  "<style>"+
		"*, *:before, *:after {margin:0; padding:0; border:0; box-sizing:border-box; -webkit-box-sizing:border-box; -moz-box-sizing:border-box; -o-box-sizing:border-box;}"+
		"html {height:100%; font-family:'Spoqa Han Sans', 'Sans-serif', Arial, '돋움', Dotum; box-sizing:border-box; -moz-box-sizing:border-box; -webkit-box-sizing:border-box; -o-box-sizing:border-box;}"+
		"body {width: 100%; height:auto; font-size:15px; line-height:1;}"+
		"address, article, aside, canvas, details, figure, figcaption, footer, header, menu, nav, section {display:block; margin:0; padding:0;}"+
		"h1, h2, h3, h4, h5, h6 {font-size:100%; font-weight:normal;}"+
		"img {vertical-align:middle;}"+
		"ol, ul, li, dl, dt, dd {list-style:none;}"+
		"table {width:100%; border-spacing:0px; border-collapse:collapse;}"+
		"th, td {word-break:break-all; font-weight:normal;}"+
		"fieldset, iframe {width:100%;}"+
		"em, address {font-style:normal;}"+
		"button, select, input, label {vertical-align:middle;}"+
		"hr {display:none;}"+
		"legend {position:absolute; left:-9999em; top:-9999em;}"+
		"caption {display: inline-block; display: table-caption; text-align: right; height:26px; line-height:20px; font-size:16px; color: #cf0b0b;}"+
		"strong {font-weight:normal;}"+
		"a, a:hover, a:visited, a:focus {text-decoration:none; color:#262626;}"+
		"html {-webkit-touch-callout:none; -webkit-tap-highlight-color:rgba(0, 0, 0, 0);background:url('images/images/bg2.jpg') center center repeat; background-size: 100% 100%;}"+
		"button {background-color:transparent;}"+
		"body::-webkit-scrollbar { display: none; }"+
		"body::scrollbar { display: none; }"+
		"body {position:relative; width: auto; height: 100%; min-width: 1360px; background:url('images/intra_bg2.jpg') center right no-repeat; background-size: auto 100%;margin:0; padding: 0;}"+
		"#container {position:relative; width: 100%; height: 100%;}"+
		".contents {position:relative; width: 20%; height: auto; top: 72%;  left: 74%; overflow: hidden;}"+
		".contents .inner {position: relative; width: 100%; height: auto; max-width: 440px;}"+
		".input_wrap {position: relative; width: 100%; height: 50px; border-radius: 25px; border : 1px solid #ddd; background: #fff; padding: 5px 20px;}"+
		".input_wrap.pw_box { margin-top: 16px;}"+
		".input_wrap.btn {border: 1px solid #555; background: #174d3f; margin-top: 28px; cursor: pointer; color: #fff; font-size: 18px; font-weight: 500; border:1px solid #7d7276; outline: none;}"+
		".input_wrap .icon_wrap {position: relative; width: 10%; height: 90%;  float: left; margin-top: 2px;}"+
		".input_wrap .icon_wrap.icon_id {background: url('images/icon_id.jpg') center center no-repeat;background-size: 100%;}"+
		".input_wrap .icon_wrap.icon_pw {background: url('images/icon_pw.jpg') center center no-repeat;background-size: 100%;}"+
		".input_wrap .input_box02 {width: 85%; height: 100%; float: right; font-size: 16px; outline: none; color: #555;}"+
	"</style> "+
 "</head> "+
 "<body> "+
 " <div id=\"container container\"> "+
   "<div class=\"contents\"> "+
    "<div class=\"inner\"> "+
    " <form id=\"frm\"> "+
      "<div class=\"input_wrap id_box\"> "+
      " <div class=\"icon_wrap icon_id\"></div> "+
     " </div> "+
     " <div class=\"input_wrap pw_box\"> "+
      " <div class=\"icon_wrap icon_pw\"></div> "+
     " </div> "+
    " </form> "+
   " </div> "+
  " </div> "+
 " </div> "+
 "</body>"+
"</html>";
		info[0] = "테스트";
		info[1] = html;
		return info;
	}
	
	private static String formatContentTag(org.jsoup.nodes.Element entry) {
		try {
			entry.select("div").remove();
			// 把 &lt;a href="*.jpg" &gt;&lt;img src="*.jpg"/&gt;&lt;/a&gt; 替换为 &lt;img
			// src="*.jpg"/&gt;
			for (org.jsoup.nodes.Element imgEle : entry.select("a[href~=(?i)\\.(png|jpe?g)]")) {
				System.out.println("33333333");
				System.out.println(imgEle);
				System.out.println(imgEle.select("img").first());
				imgEle.replaceWith(imgEle.select("img").first());
			}
			
			return entry.html();
		} catch (Exception e) {
			return "";
		}
	}
	
	public static InputStream parse2Stream(String content) {
		try {
			ByteArrayInputStream stream = new ByteArrayInputStream(content.getBytes("utf-8"));
			return stream;
		} catch (Exception e) {
			return null;
		}
	}
	
	/**
	* 直接把网页内容转为PDF文件
	*
	* @param fileName
	* @throws Exception
	*/
	public static void parseURL2PDFFile(String pdfFile, String blogURL) throws Exception {
	 
		BaseFont bfCN = BaseFont.createFont("c:/windows/fonts/malgun.ttf", BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
		// 中文字体定义
		Font chFont = new Font(bfCN, 14, Font.NORMAL, BaseColor.BLUE);
		Font secFont = new Font(bfCN, 12, Font.NORMAL, new BaseColor(0, 204,255));
		Font textFont = new Font(bfCN, 12, Font.NORMAL, BaseColor.BLACK);

		Document document = new Document();
		PdfWriter pdfwriter = PdfWriter.getInstance(document,
		new FileOutputStream(pdfFile));
		pdfwriter.setViewerPreferences(PdfWriter.HideToolbar);
		document.open();
	 
		String[] blogInfo = extractBlogInfo(blogURL);
	 
		int chNum = 1;
		Chapter chapter = new Chapter(new Paragraph("테스트", chFont),chNum++);
	 
		Section section = chapter.addSection(new Paragraph(blogInfo[0], secFont));
				section.setIndentation(10);
				section.setIndentationLeft(10);
				section.setBookmarkOpen(false);
				section.setNumberStyle(Section.NUMBERSTYLE_DOTTED_WITHOUT_FINAL_DOT);
	 
				LineSeparator line = new LineSeparator(1, 100, new BaseColor(204, 204,204), Element.ALIGN_CENTER, -2);
				Paragraph p_line = new Paragraph(" ");
				p_line.add(line);
				section.add(p_line);
				section.add(Chunk.NEWLINE);
	 
				document.add(chapter);
	 
				// html文件
				XMLWorkerHelper.getInstance().parseXHtml(pdfwriter, document,parse2Stream(blogInfo[1]));
				 
				document.close();
	}
	
	
	
	
	
	
	
	
}

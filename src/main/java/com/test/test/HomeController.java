package com.test.test;

import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.io.BufferedOutputStream;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.DateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.IOUtils;
import org.apache.http.HttpResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.itextpdf.text.Document;
import com.itextpdf.text.Image;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.pdf.PdfWriter;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	
	List<Map<String, Object>> resultList;
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);
		System.out.println("==========");
		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
		
		String formattedDate = dateFormat.format(date);
		
		model.addAttribute("serverTime", formattedDate );
		
		return "home";
	}
	
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String login(Locale locale, Model model) {
		
		
		return "login/login";
	}
	
	@RequestMapping(value = "/test", method = RequestMethod.GET)
	public String pdf(Locale locale, Model model) {
		String[] b_width = {"841mm","594mm","420mm","297mm","210mm","148mm","105mm","74mm","52mm"};
		String[] b_height = {"1189mm","841mm","594mm","420mm","297mm","210mm","148mm","105mm","74mm"};
		int parent_i=3;//a3
		model.addAttribute("parent_width", parent_i%2 == 0?b_width[parent_i]:b_height[parent_i]);
		model.addAttribute("parent_height", parent_i%2 == 0?b_height[parent_i]:b_width[parent_i]);
		model.addAttribute("parent_i", parent_i);
		return "login/test";
	}
	
	@RequestMapping(value = "/test", method = RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> pdf2(Locale locale, Model model) {
		Map<String,Object> map = new HashMap<String, Object>();
		/*
		 * int[] a = A0.getData(); String[] b_width =
		 * {"841mm","594mm","420mm","297mm","210mm","148mm","105mm","74mm","52mm"};
		 * String[] b_height =
		 * {"1189mm","841mm","594mm","420mm","297mm","210mm","148mm","105mm","74mm"};
		 * map.put("a", a); map.put("b_width", b_width); map.put("b_height", b_height);
		 */
		
		//프린터 A종이  A0~A8 까지 길이 넓이 mm단위
		int[] b_width_mm = {841,594,420,297,210,148,105,74,52}; 
		int[] b_height_mm = {1189,841,594,420,297,210,148,105,74};
		
		//프린터 A종이  A0~A8 까지 길이 넓이를 px로 변환한값
		int[] b_width_px = {3179,2245,1587,1123,794,559,397,280,197};
		int[] b_height_px = {4494,3179,2245,1587,1123,794,559,397,280};
		
		
		//이쁘게 출력 하기 위해 상세값을 세팅
		int parent_i=3;//종류종류
		
		int width = b_width_px[parent_i]; //출력종이 넓이
		int height = b_height_px[parent_i];//출력종이 길이
		
		float[] b_width = new float[8-parent_i];//출력종에 들어갈 종이 넓이들
		float[] b_height= new float[8-parent_i];//출력종에 들어갈 종이 길이들
		
		float change_width = width;
		float change_height = height;
		
		for(int i=0;i<9-parent_i-1;i++) {;
			b_width[i] = change_height/2;
			b_height[i] = change_width;
			
			float temp = change_width;
			change_width = change_height/2;
			change_height = temp;
		}
		
			
		
		map.put("parent_width", width);
		map.put("parent_height", height);
		map.put("b_width", b_width);
		map.put("b_height", b_height);
		map.put("parent_i", parent_i);
		return map;
	}
	
	@RequestMapping(value = "/test2", method = RequestMethod.GET)
	public String pdf3(Locale locale, Model model,@RequestParam Map<String,Object> map) {
		//프린터 A종이  A0~A8 까지 길이 넓이 mm단위
		int[] b_width_mm = {841,594,420,297,210,148,105,74,52}; 
		int[] b_height_mm = {1189,841,594,420,297,210,148,105,74};
		
		//프린터 A종이  A0~A8 까지 길이 넓이를 px로 변환한값
		int[] b_width_px = {3179,2245,1587,1123,794,559,397,280,197};
		int[] b_height_px = {4494,3179,2245,1587,1123,794,559,397,280};
		
		
		//이쁘게 출력 하기 위해 상세값을 세팅
		int parent_i=3;//종류종류
		
		int width = b_width_px[parent_i]; //출력종이 넓이
		int height = b_height_px[parent_i];//출력종이 길이
		
		float[] b_width = new float[8-parent_i];//출력종에 들어갈 종이 넓이들
		float[] b_height= new float[8-parent_i];//출력종에 들어갈 종이 길이들
		
		float change_width = width;
		float change_height = height;
		
		for(int i=0;i<9-parent_i-1;i++) {
			b_width[i] = change_height/2;
			b_height[i] = change_width;
			
			float temp = change_width;
			change_width = change_height/2;
			change_height = temp;
			
		}
	
		
		model.addAttribute("parent_width", width);
		model.addAttribute("parent_height", height); 
		model.addAttribute("parent_i", parent_i);
		model.addAttribute("margin", map.get("margin"));
		model.addAttribute("radio", map.get("radio"));
		model.addAttribute("checkbox1", map.get("checkbox1"));
		return "login/test2";
	}
	
	@RequestMapping(value = "/test3", method = RequestMethod.POST)
	@ResponseBody
	public String test3(HttpServletRequest request, String data,HttpServletResponse response) throws IOException {
		String serverPath = request.getSession().getServletContext().getRealPath("/");
		System.out.println("============");
		System.out.println(serverPath);
		
		String path = "c:\\guozhe_work\\test\\pdf테스트.pdf";
		
		Base64 base64 = new Base64();
		String binaryData = request.getParameter("data");
		FileOutputStream stream = null;
		try{
			System.out.println("binary file   "  + binaryData);
			if(binaryData == null || binaryData.trim().equals("")) {
			    throw new Exception();
			}
			binaryData = binaryData.replaceAll("data:image/png;base64,", "");
			byte[] file = Base64.decodeBase64(binaryData);
			String fileName=  UUID.randomUUID().toString();
			
			stream = new FileOutputStream("c:\\guozhe_work\\test\\pdf테스트.pdf");
			stream.write(file);
			stream.close();
			System.out.println("캡처 저장");
		    
		}catch(Exception e){
			e.printStackTrace();
			System.out.println("에러 발생");
		}finally{
			if(stream != null) {
				stream.close();
			}
		}
		return path;
	}
	
	@RequestMapping(value = "/ajax_upload", method = RequestMethod.POST)
    @ResponseBody
    public List<Map<String, Object>> ajaxUpload (HttpServletRequest request,@RequestParam(value="file", required=true) MultipartFile [] file) throws Exception {
		System.out.println("============");
    	resultList = FileUtiles.upload(request,file);    
        return resultList;
    }
	
	
	@RequestMapping(value = "/test4", method = RequestMethod.GET)
	public String pdf4(Locale locale, Model model,@RequestParam Map<String,Object> map) {
		//프린터 A종이  A0~A8 까지 길이 넓이 mm단위
		int[] b_width_mm = {841,594,420,297,210,148,105,74,52}; 
		int[] b_height_mm = {1189,841,594,420,297,210,148,105,74};
		
		//프린터 A종이  A0~A8 까지 길이 넓이를 px로 변환한값
		int[] b_width_px = {3179,2245,1587,1123,794,559,397,280,197};
		int[] b_height_px = {4494,3179,2245,1587,1123,794,559,397,280};
		
		
		//이쁘게 출력 하기 위해 상세값을 세팅
		int parent_i=3;//종류종류
		
		int width = b_width_px[parent_i]; //출력종이 넓이
		int height = b_height_px[parent_i];//출력종이 길이
		
		float[] b_width = new float[8-parent_i];//출력종에 들어갈 종이 넓이들
		float[] b_height= new float[8-parent_i];//출력종에 들어갈 종이 길이들
		
		float change_width = width;
		float change_height = height;
		
		for(int i=0;i<9-parent_i-1;i++) {
			b_width[i] = change_height/2;
			b_height[i] = change_width;
			
			float temp = change_width;
			change_width = change_height/2;
			change_height = temp;
			
		}
	
		
		model.addAttribute("parent_width", width);
		model.addAttribute("parent_height", height); 
		model.addAttribute("parent_i", parent_i);
		model.addAttribute("margin", map.get("margin"));
		model.addAttribute("radio", map.get("radio"));
		model.addAttribute("checkbox1", map.get("checkbox1"));
		return "login/test4";
	}
	
	@RequestMapping(value = "/test5", method = RequestMethod.GET)
	public String test5(Locale locale, Model model,@RequestParam Map<String,Object> map) {
		return "login/test5";
	}
}

package com.test.test;

import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.JobAttributes;
import java.awt.PageAttributes;
import java.awt.Toolkit;
import java.awt.print.Book;
import java.awt.print.PageFormat;
import java.awt.print.Paper;
import java.awt.print.Printable;
import java.awt.print.PrinterException;
import java.awt.print.PrinterJob;
import java.io.Console;
import java.io.File;
import java.io.FileInputStream;
import java.io.OutputStream;
import java.lang.reflect.Array;
import java.net.Socket;
import java.util.HashMap;
import java.util.Map;

import javax.print.Doc;
import javax.print.DocFlavor;
import javax.print.DocPrintJob;
import javax.print.PrintService;
import javax.print.PrintServiceLookup;
import javax.print.SimpleDoc;
import javax.print.attribute.Attribute;
import javax.print.attribute.AttributeSet;
import javax.print.attribute.DocAttributeSet;
import javax.print.attribute.HashAttributeSet;
import javax.print.attribute.HashDocAttributeSet;
import javax.print.attribute.HashPrintRequestAttributeSet;
import javax.print.attribute.PrintRequestAttributeSet;
import javax.print.attribute.Size2DSyntax;
import javax.print.attribute.standard.Chromaticity;
import javax.print.attribute.standard.Copies;
import javax.print.attribute.standard.Media;
import javax.print.attribute.standard.MediaName;
import javax.print.attribute.standard.MediaPrintableArea;
import javax.print.attribute.standard.MediaSize;
import javax.print.attribute.standard.MediaSizeName;
import javax.print.attribute.standard.MediaTray;
import javax.print.attribute.standard.OrientationRequested;
import javax.print.attribute.standard.PageRanges;
import javax.print.attribute.standard.PrinterName;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.printing.PDFPageable;
import org.apache.pdfbox.printing.PDFPrintable;
import org.apache.pdfbox.printing.Scaling;
import org.springframework.http.MediaType;
import org.xhtmlrenderer.css.parser.property.PrimitivePropertyBuilders.Page;

public class Main2 {

	public static void main(String[] args) throws Exception{
		printPDF("c:\\guozhe_work\\test\\a3_rotation.png");
		
		//printPDF_IP("c:\\guozhe_work\\test\\aaa.txt","10.10.9.188");
		
		/*
		 * PrintService[] printServices = PrintServiceLookup.lookupPrintServices(null,
		 * null); System.out.println(printServices.length); for (PrintService
		 * printService : printServices) { System.out.println(printService.getName());
		 * 
		 * }
		 */
		
		
		
		/*
		 * PrintService[] printServices = PrintServiceLookup.lookupPrintServices(null,
		 * null); //get printers
		 * 
		 * for (PrintService printService : printServices) {
		 * System.out.println("Found print service: " + printService);
		 * 
		 * Set<Attribute> attribSet = new LinkedHashSet<Attribute>();
		 * 
		 * Class<? extends Attribute>[] supportedAttributeCategories = (Class<? extends
		 * Attribute>[]) printService.getSupportedAttributeCategories();
		 * 
		 * for (Class<? extends Attribute> category : supportedAttributeCategories) {
		 * DocFlavor[] flavors = printService.getSupportedDocFlavors(); for (DocFlavor
		 * flavor : flavors) { Object supportedAttributeValues =
		 * printService.getSupportedAttributeValues(category, flavor,
		 * printService.getAttributes()); if (supportedAttributeValues instanceof
		 * Attribute) { Attribute attr = (Attribute) supportedAttributeValues;
		 * attribSet.add(attr); } else if (supportedAttributeValues != null) {
		 * Attribute[] attrs = (Attribute[]) supportedAttributeValues; for (Attribute
		 * attr : attrs) { attribSet.add(attr); } } } }
		 * 
		 * for (Attribute attr : attribSet) { System.out.println(attr.getName());
		 * 
		 * System.out.println(printService.getDefaultAttributeValue(attr.getCategory()))
		 * ; } }
		 */
		
		
		//printSuppotAttr(DocFlavor.INPUT_STREAM.AUTOSENSE, "SINDOH N600 Series PCL (흑백)");
	}
	
	/*
	 * 내가 원하는 프린터기 선택해오기 printName -> 프린트기 이름 
	 */
	
	public static PrintService getPrintService(String printerName) {
        if(printerName == null) { // 
        	PrintService defaultService = PrintServiceLookup.lookupDefaultPrintService();
  	      	return defaultService;
        }else {
        	//프린터 서비스에서 가져올수 있는 서비스틀 배열로 가져 오기 
        	System.out.println("=========");
            PrintService[] printServices = PrintServiceLookup.lookupPrintServices(null, null);
            System.out.println(printServices.length);
            for (PrintService printService : printServices) {
            	System.out.println(printService.getName());
                if (printerName.equals(printService.getName())) return printService;
            }
        }
        
        return null;
	}
	
	//파일 경로로 pdf 다운로드 
	public static void printPDF(String filePath) throws Exception{
		 System.out.println("파일 경로：filePath==================="+filePath);
		 File file = new File(filePath);
		 
		 if(file.exists()) {
			 System.out.println("파일있음");
		 }else {
			 System.out.println("파일없음");
		 }
	     //프린터 속성을 관리하는 집합
		 PrintRequestAttributeSet pras = new HashPrintRequestAttributeSet();
	     pras.add(new PageRanges(1));//페이지수
	     pras.add(OrientationRequested.PORTRAIT); 
	     pras.add(MediaSizeName.ISO_A3); 
	     // 프린터 디폴트 속성
	     DocFlavor flavor = DocFlavor.INPUT_STREAM.PNG;
	      
	      
	      PrintService printService = getPrintService("DocuPrint C5005 d");
	      System.out.println("프린터기 : "+printService);
			
          try {
              DocPrintJob job = printService.createPrintJob(); // 프린터 작업 생성
              FileInputStream fis = new FileInputStream(file); 
              DocAttributeSet das = new HashDocAttributeSet();
              
              das.add(OrientationRequested.PORTRAIT);
              
              Doc doc = new SimpleDoc(fis, flavor, null);
              job.print(doc, pras);
          } catch (Exception e) {
              e.printStackTrace();
              System.out.println("프린터 실패애러메세지 : "+e);
             throw new Exception();
          }
	}
	
	
	public static void printPDF_IP(String filePath,String ip) throws Exception{
		  File file = new File(filePath); // 获取选择的文件
		  Socket socket =  new Socket(ip, 9100);
		 
		  OutputStream out = socket.getOutputStream();  
		  FileInputStream fis = new FileInputStream(file);
		  //建立数组
	      byte[] buf = new byte[1024];  
	      int len = 0; 
	      //判断是否读到文件末尾
	      while((len=fis.read(buf)) != -1)
	          {  
	           out.write(buf, 0, len);  
	          }  
	      //告诉服务端，文件已传输完毕  
	      socket.shutdownOutput();
	      socket.close();  
	      fis.close();
	}
	
	//파일 경로로 pdf 다운로드 
	public static void printPDF2(String filePath) throws Exception{
		 System.out.println("파일 경로：filePath==================="+filePath);
		 
		 PDDocument document = PDDocument.load(new File(filePath));

		 PrintService printService = getPrintService("SINDOH N600 Series PCL (흑백)");
		 
		 PrinterJob printerJob = PrinterJob.getPrinterJob();
		 PageFormat format = printerJob.defaultPage();
		 format.setOrientation(PageFormat.LANDSCAPE);
		 
		 MediaSize isoA5Size = MediaSize.getMediaSizeForName(MediaSizeName.ISO_A3);
		 float[] size = isoA5Size.getSize(Size2DSyntax.INCH);
		 
		 
		 double margin = 18; // quarter inch
		 double m2 = margin * 2;
		 Paper paper = format.getPaper();
		 paper.setSize(size[0] * 72.0, size[1] * 72.0);
		 paper.setImageableArea(margin, margin,  paper.getWidth()-m2, paper.getHeight()-m2);
		 format.setPaper(paper);
		 format.setOrientation(PageFormat.LANDSCAPE);
		 
		 
		 Book book = new Book();
	     book.append(new PDFPrintable(document, Scaling.SCALE_TO_FIT, false, 0, false), format);
		 
		 
		 printerJob.setPrintService(printService);
		 
		 PrintRequestAttributeSet attributes = new HashPrintRequestAttributeSet();
	     attributes.add(Chromaticity.MONOCHROME);
	     attributes.add(new Copies(1)); 

	     printerJob.setPageable(book);
	     
	     
	     Media[] supportedMedia = (Media[]) printerJob.getPrintService().getSupportedAttributeValues(Media.class, null, null);
	     System.out.println("2222222222");
	     System.out.println(supportedMedia.length);
	     for (Media m : supportedMedia) {
	    	 System.out.println(m.toString());
	     }
	     
			
			  try { printerJob.print(attributes); } catch(PrinterException pe) {
			 pe.printStackTrace(); }
			
	     
		/*
		 * 1.setCopes(int) : 인쇄매수 설정
		 * 2.setDefaultSelection(JobAttributes.DefaultSelectionType.RANGE) : 인쇄 범위
		 * 모두(ALL),페이지 지정(RANGE),선택영역(SELECTION) 설정
		 * 3.setDestination(JobAttributes.DestinationTpye.FILE) : 프린터에서 파일(FILE) or 종이
		 * 출력(PRINTER) 설정 - setFileName("abc.prt") : setDestination의 type의 FILE일 경우 파일
		 * 이름 설정 4.setDialog(JobAttributes.DialogTpye.COMMON) : COMMON - java 속성 type
		 * 창으로 표시 NATIVE - default type 창으로 표시 NONE-다이얼로그 설정없이 바로 출력 5.sestMaxPage(5) :
		 * 페이지 지정의 최대 출력 페이지 수 setMinPage(1) : 페이지 지정의 최소 출력 페이지 수 (1보다 작은값 에러 ) -
		 * setPageRanges(int[][]) : 배열 페이지 만큼 페이지 지정 출력(육안확인 불가)
		 * 6.setMultipleDocumentHandling(JobAttributtes.MultipleDocumentHandling.
		 * SEPARATE_DOCUMENTS_COLLATED_COPIES) : SEPARATE_DOCUMENTS_COLLATED_COPIES :
		 * 한부씩 인쇄 SEAPRATE_DOCUMENTS_UNCOLLATED_COPIES : 동시 인쇄 7. setPrinter() : 프린터 지정
		 * setSides(JobAttributes.SidesType.TWO_SIDED_SHORT_EDGE) : ONE_SIDED 단면
		 * TWO_SIDED_LONG_EDGE :양면 TWO_SIDED_SHORT_EDGE : 양면 현재 복사한것 뒤에 복사(많이사용)
		 */
	}
	
	public static void printSuppotMedia () {
	      // get default printer 
	        PrintService defaultPrintService = PrintServiceLookup.lookupDefaultPrintService(); 
	 
	        // suggest the use of the default printer 
	        System.out.println("Write the printer name or press enter for [" + defaultPrintService.getName() + "]"); 
	 
	        Console console = System.console(); 
	 
	        // read from the console the name of the printer 
	        String printerName = "SINDOH N600 Series PCL (1 복사)"; 
	 
	        // if there is no input, use the default printer 
	        if (printerName == null || printerName.equals("")) { 
	            printerName = defaultPrintService.getName(); 
	        } 
	 
	        // the printer is selected 
	        AttributeSet aset = new HashAttributeSet(); 
	        aset.add(new PrinterName(printerName, null)); 
	 
	        // selection of all print services 
	        PrintService[] services = PrintServiceLookup.lookupPrintServices(null, aset); 
	        // we store all the tray in a hashmap 
	        Map<Integer, Media> trayMap = new HashMap<Integer, Media>(10); 
	 
	        // we chose something compatible with the printable interface 
	        DocFlavor flavor = DocFlavor.SERVICE_FORMATTED.PRINTABLE; 
	 
	        for (PrintService service : services) { 
	            System.out.println(service); 
	 
	            // we retrieve all the supported attributes of type Media 
	            // we can receive MediaTray, MediaSizeName, ... 
	            Object o = service.getSupportedAttributeValues(Media.class, flavor, null); 
	            if (o != null && o.getClass().isArray()) { 
	                for (Media media : (Media[]) o) { 
	                    // we collect the MediaTray available 
	                    if (media instanceof MediaTray) { 
	                        System.out.println(media.getValue() + " : " + media + " - " + media.getClass().getName()); 
	                        trayMap.put(media.getValue(), media); 
	                    } 
	                } 
	            } 
	        } 
	 
	        System.out.println("Select tray target id : "); 
	        String mediaId = "6"; 
	 
	        MediaTray selectedTray = (MediaTray) trayMap.get(Integer.valueOf(mediaId)); 
	        System.out.println("Selected tray : " + selectedTray.toString()); 
	 
	        System.out.println("Do you want to print a test page? [y/n]"); 
	        String printPage = "Y"; 
	        if (printPage.equalsIgnoreCase("Y")) { 
	 
	            // we have to add the MediaTray selected as attribute 
	            PrintRequestAttributeSet attributes = new HashPrintRequestAttributeSet(); 
	            attributes.add(selectedTray); 
	 
	            // we create the printer job, it print a specified document with a set of job attributes 
	            DocPrintJob job = services[0].createPrintJob(); 
	 
	            try { 
	                System.out.println("Trying to print an empty page on : " + selectedTray.toString()); 
	                // we create a document that implements the printable interface 
	                Doc doc = new SimpleDoc(new PrintableDemo(), DocFlavor.SERVICE_FORMATTED.PRINTABLE, null); 
	 
	                // we print using the selected attributes (paper tray) 
	                job.print(doc, attributes); 
	 
	            } catch (Exception e) { 
	                e.printStackTrace(); 
	            } 
	        } 
	    } 
	   
	   static class PrintableDemo implements Printable { 
	      
	      @Override 
	      public int print(Graphics pg, PageFormat pf, int pageNum) { 
	         // we print an empty page 
	         if (pageNum >= 1) 
	            return Printable.NO_SUCH_PAGE; 
	         pg.drawString("", 10, 10); 
	         return Printable.PAGE_EXISTS; 
	      } 
	   } 
	
	public static void printPDF3(String filePath) throws Exception{
		 System.out.println("파일 경로：filePath==================="+filePath);
		 
		 PDDocument document = PDDocument.load(new File(filePath));

		 PrintService printService = getPrintService("SINDOH N600 Series PCL (흑백)");
		 
		 
		 PrinterJob printerJob = PrinterJob.getPrinterJob();
		 PageFormat format = printerJob.defaultPage();
		 Paper paper = format.getPaper();
		 
		 double width = 16.54 * 72;
         double height = 11.69 * 72;
         double margin = 1 * 72;
         paper.setSize(width, height);
         paper.setImageableArea(
                 margin,
                 0,
                 width - (margin * 2),
                 height
         );
         format.setOrientation(PageFormat.LANDSCAPE);
         format.setPaper(paper);
         printerJob.setPrintable(new Printable() {
			
			@Override
			public int print(Graphics g, PageFormat pageFormat, int pageIndex) throws PrinterException {
				 if (pageIndex > 0) {
				      return(NO_SUCH_PAGE);
				    } else {
				      Graphics2D g2d = (Graphics2D)g;
				      g2d.translate(pageFormat.getImageableX(), pageFormat.getImageableY());
				      
				      return(PAGE_EXISTS);
				    }
			}
		}, format);
         
         Book book = new Book();
	     book.append(new PDFPrintable(document, Scaling.SCALE_TO_FIT, false, 0, false), format);
	     
	     printerJob.setPrintService(printService);
	     
	     PrintRequestAttributeSet attributes = new HashPrintRequestAttributeSet();
	     attributes.add(new Copies(1));
	     attributes.add(MediaSizeName.ISO_A3);
	     
	     printerJob.setPageable(book);
	     printerJob.print(attributes);
	}
	
	   public static void printSuppotAttr(DocFlavor flavor, String printerName) throws Exception{
	       PrintService service = getPrintService(printerName);
	       
	       Class[] cats = service.getSupportedAttributeCategories();
	       for (int j = 0; j < cats.length; j++) {
	          Attribute attr = (Attribute) service.getDefaultAttributeValue(cats[j]);
	          
	          if (attr != null) {
	             String attrName = attr.getName();
	             String attrValue = attr.toString();
	             
	             System.out.println((j+1) + ": " + attrName + " = " + attrValue);
	             
	             Object o = service.getSupportedAttributeValues(attr.getCategory(), null, null);
	             if(o != null) {
	                if (o.getClass().isArray()) {
	                   for (int k = 0; k < Array.getLength(o); k++) {
	                      Object o2 = Array.get(o, k);
	                      System.out.println(" ㆍ " + o2);
	                   }
	                }
	             }
	          }
	       }
	   }
		
}
